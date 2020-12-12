import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { EmailService } from '../email/email.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

import { SignupUserInDto } from './dtos/signup-user-in.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
  ) {}

  private ensurePasswordSecurity(email: string, nick: string, password: string) {
    if (password.includes(email) || email.includes(password) || password.includes(nick) || nick.includes(password)) {
      throw new BadRequestException('PASSWORD_UNSECURE');
    }
  }

  async signup(dto: SignupUserInDto): Promise<User> {
    if (await this.userService.findByNick(dto.nick)) {
      throw new BadRequestException('NICK_ALREADY_EXISTS');
    }

    if (await this.userService.findByEmail(dto.email)) {
      throw new BadRequestException('EMAIL_ALREADY_EXISTS');
    }

    const { email, nick, password } = dto;

    this.ensurePasswordSecurity(email, nick, password);

    return this.userService.create(dto);
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('INVALID_CREDENTIALS');
    }

    if (!user.emailValidated) {
      throw new UnauthorizedException('EMAIL_NOT_VALIDATED');
    }

    return user;
  }

  async emailLogin(emailLoginToken: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { emailLoginToken },
    });

    if (!user) {
      throw new UnauthorizedException('INVALID_EMAIL_LOGIN_TOKEN');
    }

    if (!user.emailValidated) {
      await this.userRepository.update(user.id, { emailValidated: true });
    }

    await this.userRepository.update(user.id, { emailLoginToken: undefined });

    return user;
  }

  async askEmailLogin(email: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      return;
    }

    user.emailLoginToken = uuidv4();

    await this.userRepository.save(user);

    // don't await the promise to avoid leaking information about the email being used
    this.emailService.sendEmailLoginEmail(user);
  }

  async changeUserPassword(user: User, password: string): Promise<void> {
    const { email, nick } = user;

    this.ensurePasswordSecurity(email, nick, password);

    await this.userService.setUserPassword(user, password);
  }
}
