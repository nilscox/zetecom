import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import * as uuidv4 from 'uuid/v4';

import { SignupUserInDto } from '../authentication/dtos/signup-user-in.dto';

import { User } from './user.entity';
import { EmailService } from '../email/email.service';

const {
  EMAIL_ACCOUNT_VERIFICATION,
} = process.env;

@Injectable()
export class UserService {

  constructor(
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
    const { email, password, nick, avatar } = dto;

    if (!await this.emailService.isAthorized(email))
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

}
