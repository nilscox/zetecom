import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { SignupUserInDto } from 'src/modules/authentication/dtos/signup-user-in.dto';
import { Role } from 'src/modules/authorization/roles.enum';
import { ConfigService } from 'src/modules/config/config.service';
import { EmailService } from 'src/modules/email/email.service';

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

  async findById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findByNick(nick: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { nick } });
  }

  async create(dto: SignupUserInDto, requireEmailVerification = true): Promise<User> {
    const EMAIL_ACCOUNT_VERIFICATION = this.configService.get('EMAIL_ACCOUNT_VERIFICATION');

    const { email, password, nick, avatar } = dto;

    const existing = await this.userRepository.findOne({ where: { email } });

    if (existing !== undefined) {
      throw new BadRequestException('EMAIL_ALREADY_EXISTS');
    }

    const user = new User();

    user.email = email;
    user.password = await bcrypt.hash(password, 10);
    user.nick = nick;
    user.avatar = avatar;
    user.emailValidationToken = uuidv4();
    user.roles = [Role.USER];

    if (requireEmailVerification && EMAIL_ACCOUNT_VERIFICATION === 'true') {
      await this.emailService.sendEmailValidationEmail(user);
    } else {
      user.emailValidated = true;
    }

    return this.userRepository.save(user);
  }

  async validateFromToken(token: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { emailValidationToken: token },
    });

    if (!user) {
      throw new BadRequestException('USER_EMAIL_TOKEN_NOT_FOUND');
    }

    await this.userRepository.update(user.id, { emailValidated: true });

    return user;
  }

  async setUserPassword(user: User, password: string): Promise<User> {
    user.password = await bcrypt.hash(password, 10);

    return this.userRepository.save(user);
  }

  async updateRoles(user: User, roles: Role[]) {
    await this.userRepository.update(user.id, { roles });
  }
}
