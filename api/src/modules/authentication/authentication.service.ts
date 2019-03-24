import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import * as uuidv4 from 'uuid/v4';

import { User } from '../user/user.entity';
import { UserToken } from './user-token.entity';

@Injectable()
export class AuthenticationService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserToken)
    private readonly userTokenRepository: Repository<UserToken>,
  ) {}

  async login(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user || !await bcrypt.compare(password, user.password))
      throw new UnauthorizedException('INVALID_CREDENTIALS');

    return user;
  }

  async loginFromToken(inputToken: string): Promise<User> {
    const token = await this.userTokenRepository.findOne({
      where: { token: inputToken },
      relations: ['user'],
    });

    if (!token)
      throw new UnauthorizedException('INVALID_TOKEN');

    return token.user;
  }

  async createUserToken(user: User): Promise<string> {
    const token = new UserToken();

    token.user = user;
    token.token = uuidv4();
    await this.userTokenRepository.save(token);

    return token.token;
  }

}
