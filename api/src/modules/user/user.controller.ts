import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AuthUser } from 'Common/auth-user.decorator';
import { IsAuthenticated } from 'Common/auth.guard';
import { Output } from 'Common/output.interceptor';

import { AvatarService } from '../avatar/avatar.service';

import { UserOutDto } from './dtos/user-out.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {

  constructor(
    private readonly userService: UserService,
    private readonly avatarService: AvatarService,
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

  // FIXME: any
  @Put('avatar')
  @UseGuards(IsAuthenticated)
  @UseInterceptors(FileInterceptor('image'))
  @Output(UserOutDto)
  async updateUserAvatar(@UploadedFile() file: any, @AuthUser() user: User): Promise<User> {
    await this.avatarService.setUserAvatar(user, file);

    return user;
  }

}
