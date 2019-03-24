import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  NotFoundException,
} from '@nestjs/common';

import { Output } from 'Common/output.interceptor';

import { UserService } from './user.service';
import { User } from './user.entity';
import { UserOutDto } from './dtos/user-out.dto';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  @Output(UserOutDto)
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @Output(UserOutDto)
  async findOne(
    @Param('id', new ParseIntPipe()) id,
  ): Promise<User> {
    const user = await this.userService.findById(id);

    if (!user)
      throw new NotFoundException();

    return user;
  }

}
