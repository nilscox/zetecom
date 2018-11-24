import {
  Controller,
  Get, Post,
  HttpCode,
  Session, Body,
  UseInterceptors, UseGuards,
  ClassSerializerInterceptor,
  NotFoundException,
} from '@nestjs/common';

import { User as ReqUser } from 'Common/user.decorator';
import { IsAuthenticated, IsNotAuthenticated } from 'Common/auth.guard';

import { CreateUserDto } from '../dtos/CreateUserDto';
import { LoginUserDto } from '../dtos/LoginUserDto';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {

  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('/signup')
  @UseGuards(IsNotAuthenticated)
  async signup(
    @Body() createUserDto: CreateUserDto,
    @Session() session,
  ) {
    const user = await this.userService.create(createUserDto);

    session.userId = user.id;

    return user;
  }

  @Post('/login')
  @UseGuards(IsNotAuthenticated)
  @HttpCode(200)
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Session() session,
  ): Promise<User> {
    const user = await this.userService.login(loginUserDto);

    session.userId = user.id;

    return user;
  }

  @Post('/logout')
  @UseGuards(IsAuthenticated)
  @HttpCode(204)
  logout(@Session() session) {
    delete session.userId;
  }

  @Get('/me')
  @UseGuards(IsAuthenticated)
  me(@ReqUser() user): User {
    return user;
  }

}
