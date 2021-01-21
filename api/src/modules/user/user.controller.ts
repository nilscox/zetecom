import {
  Body,
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

import { IsAuthenticated } from 'Common/auth.guard';
import { AuthUser } from 'Common/auth-user.decorator';
import { CastToDto } from 'Common/cast-to-dto.interceptor';
import { ClassToPlainInterceptor } from 'Common/ClassToPlain.interceptor';

import { Roles } from '../../common/roles.decorator';
import { Role } from '../authorization/roles.enum';
import { AvatarService } from '../avatar/avatar.service';

import { UpdateUserRoleInDto } from './dtos/update-user-role-in.dto';
import { UserDto } from './dtos/user.dto';
import { UserLightDto } from './dtos/user-ligth.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
@UseInterceptors(ClassToPlainInterceptor)
export class UserController {
  constructor(private readonly userService: UserService, private readonly avatarService: AvatarService) {}

  @Get()
  @Roles(Role.ADMIN)
  @CastToDto(UserLightDto)
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @CastToDto(UserLightDto)
  async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @Put('avatar')
  @UseGuards(IsAuthenticated)
  @UseInterceptors(FileInterceptor('image'))
  @CastToDto(UserDto)
  async updateUserAvatar(@UploadedFile() file: Express.Multer.File, @AuthUser() user: User): Promise<User> {
    await this.avatarService.changeAvatar(user, file);

    return user;
  }

  @Put(':id/roles')
  @Roles(Role.ADMIN)
  @CastToDto(UserDto)
  async updateRoles(@Param('id', new ParseIntPipe()) id: number, @Body() dto: UpdateUserRoleInDto) {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new NotFoundException();
    }

    await this.userService.updateRoles(user, dto.roles);

    return this.userService.findById(user.id);
  }
}
