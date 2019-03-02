import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import * as uuidv4 from 'uuid/v4';

import { CreateUserDto } from '../dtos/CreateUserDto';
import { LoginUserDto } from '../dtos/LoginUserDto';
import { User } from '../entities/user.entity';
import { UserToken } from '../entities/user-token.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserToken)
    private readonly userTokenRepository: Repository<UserToken>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user)
      throw new NotFoundException();

    return user;
  }

  async create(email: string, password: string, nick: string): Promise<User> {
    const existing = await this.userRepository.findOne({ where: { email } });

    if (existing !== undefined)
      throw new BadRequestException('EMAIL_ALREADY_EXISTS');

    const user = new User();

    Object.assign(user, {
      email,
      password: await bcrypt.hash(password, 10),
      nick,
    });

    return this.userRepository.save(user);
  }

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
