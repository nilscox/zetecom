import {
  Controller,
  Get,
  Put,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UseGuards,
  ClassSerializerInterceptor,
  NotFoundException,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { User as ReqUser } from 'Common/user.decorator';
import { Output } from 'Common/output.interceptor';
import { IsAuthenticated } from 'Common/auth.guard';

import { multerStorage, AvatarService } from '../avatar/avatar.service';

import { UserService } from './user.service';
import { User } from './user.entity';
import { UserOutDto } from './dtos/user-out.dto';

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
  @Output(UserOutDto)
  @UseGuards(IsAuthenticated)
  @UseInterceptors(FileInterceptor('image', { storage: multerStorage }))
  async updateUserAvatar(@UploadedFile() file: any, @ReqUser() user): Promise<User> {
    await this.avatarService.setUserAvatar(user, file);

    return user;
  }

}
