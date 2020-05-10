import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import * as uuidv4 from 'uuid/v4';

import { SignupUserInDto } from '../authentication/dtos/signup-user-in.dto';
import { Role } from '../authorization/roles.enum';
import { ConfigService } from '../config/config.service';
import { EmailService } from '../email/email.service';

import { User } from './user.entity';

@Injectable()
export class UserService {

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findByNick(nick: string): Promise<User> {
    return this.userRepository.findOne({ where: { nick } });
  }

  async create(dto: SignupUserInDto): Promise<User> {
    const EMAIL_ACCOUNT_AUTHORIZATION = this.configService.get('EMAIL_ACCOUNT_AUTHORIZATION');
    const EMAIL_ACCOUNT_VERIFICATION = this.configService.get('EMAIL_ACCOUNT_VERIFICATION');

    const { email, password, nick, avatar } = dto;

    if (EMAIL_ACCOUNT_AUTHORIZATION === 'true' && !await this.emailService.isAthorized(email))
      throw new UnauthorizedException('EMAIL_NOT_AUTHORIZED');

    const existing = await this.userRepository.findOne({ where: { email } });

    if (existing !== undefined)
      throw new BadRequestException('EMAIL_ALREADY_EXISTS');

    const user = new User();

    user.email = email;
    user.password = await bcrypt.hash(password, 10);
    user.nick = nick;
    user.avatar = avatar;
    user.emailValidationToken = uuidv4();
    user.roles = [Role.USER];

    if (EMAIL_ACCOUNT_VERIFICATION === 'true')
      await this.emailService.sendEmailValidationEmail(user);
    else
      user.emailValidated = true;

    return this.userRepository.save(user);
  }

  async validateFromToken(token: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { emailValidationToken: token },
    });

    if (!user)
      throw new BadRequestException('USER_EMAIL_TOKEN_NOT_FOUND');

    await this.userRepository.update(user.id, { emailValidated: true });

    return user;
  }

  async setUserPassword(user: User, password: string): Promise<User> {
    user.password = await bcrypt.hash(password, 10);

    return this.userRepository.save(user);
  }

}
