import { BadRequestException, Injectable,  UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

import { SignupUserInDto } from './dtos/signup-user-in.dto';

@Injectable()
export class AuthenticationService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
  ) {}

  async signup(dto: SignupUserInDto): Promise<User> {
    if (await this.userService.findByNick(dto.nick))
      throw new BadRequestException('NICK_ALREADY_EXISTS');

    if (await this.userService.findByEmail(dto.email))
      throw new BadRequestException('EMAIL_ALREADY_EXISTS');

    const { email, nick, password } = dto;

    // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
    if (password.match(email) || email.match(password) || password.match(nick) || nick.match(password))
      throw new BadRequestException('PASSWORD_UNSECURE');

    return this.userService.create(dto);
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user || !await bcrypt.compare(password, user.password))
      throw new UnauthorizedException('INVALID_CREDENTIALS');

    if (!user.emailValidated)
      throw new UnauthorizedException('EMAIL_NOT_VALIDATED');

    return user;
  }

}
