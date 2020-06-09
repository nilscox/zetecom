import {
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
import { ClassToPlainInterceptor } from 'Common/ClassToPlain.interceptor';

import { AvatarService } from '../avatar/avatar.service';

import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
@UseInterceptors(ClassToPlainInterceptor)
export class UserController {

  constructor(
    private readonly userService: UserService,
    private readonly avatarService: AvatarService,
  ) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseIntPipe()) id: number,
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
  async updateUserAvatar(@UploadedFile() file: any, @AuthUser() user: User): Promise<User> {
    await this.avatarService.setUserAvatar(user, file);

    return user;
  }

}
