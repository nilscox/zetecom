import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import * as uuidv4 from 'uuid/v4';

import { User } from './user.entity';
import { EmailService } from '../email/email.service';

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

  async create(email: string, password: string, nick: string, avatar: string): Promise<User> {
    const existing = await this.userRepository.findOne({ where: { email } });

    if (existing !== undefined)
      throw new BadRequestException('EMAIL_ALREADY_EXISTS');

    const user = new User();

    user.email = email;
    user.password = await bcrypt.hash(password, 10);
    user.nick = nick;
    user.avatar = avatar;
    user.emailValidationToken = uuidv4();

    if (process.env.NODE_ENV === 'production')
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
