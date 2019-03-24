import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import * as uuidv4 from 'uuid/v4';

import { User } from './user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async create(email: string, password: string, nick: string): Promise<User> {
    const existing = await this.userRepository.findOne({ where: { email } });

    if (existing !== undefined)
      throw new BadRequestException('EMAIL_ALREADY_EXISTS');

    const user = new User();

    user.email = email;
    user.password = await bcrypt.hash(password, 10);
    user.nick = nick;

    return this.userRepository.save(user);
  }

}
