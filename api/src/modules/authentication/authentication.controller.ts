import {
  Controller,
  Get, Post, Query,
  HttpCode,
  Session, Body,
  UseInterceptors, UseGuards,
  ClassSerializerInterceptor,
  NotFoundException,
} from '@nestjs/common';

import { User as ReqUser } from 'Common/user.decorator';
import { IsAuthenticated, IsNotAuthenticated } from 'Common/auth.guard';
import { Output } from 'Common/output.interceptor';

import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { CreateUserInDto } from '../user/dtos/create-user-in.dto';
import { UserOutDto } from '../user/dtos/user-out.dto';

import { AuthenticationService } from './authentication.service';
import { LoginUserInDto } from './dtos/login-user-in.dto';
import { TokenLoginInDto } from './dtos/token-login-in.dto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {

  constructor(
    private readonly authService: AuthenticationService,
    private readonly userService: UserService,
  ) {}

  @Post('/signup')
  @Output(UserOutDto)
  @UseGuards(IsNotAuthenticated)
  async signup(@Body() createUserDto: CreateUserInDto): Promise<User> {
    const { email, password, nick, avatar } = createUserDto;
    const user = await this.userService.create(email, password, nick, avatar);

    return user;
  }

  @Post('/email-validation')
  @Output(UserOutDto)
  @UseGuards(IsNotAuthenticated)
  async emailValidation(@Query('token') token: string, @Session() session): Promise<User> {
    const user = await this.userService.validateFromToken(token);

    session.userId = user.id;

    return user;
  }

  @Post('/login')
  @Output(UserOutDto)
  @UseGuards(IsNotAuthenticated)
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserInDto, @Session() session): Promise<User> {
    const { email, password } = loginUserDto;
    const user = await this.authService.login(email, password);

    session.userId = user.id;

    return user;
  }

  @Post('/logout')
  @UseGuards(IsAuthenticated)
  @HttpCode(204)
  logout(@Session() session): void {
    delete session.userId;
  }

  @Get('/me')
  @Output(UserOutDto)
  @UseGuards(IsAuthenticated)
  me(@ReqUser() user): User {
    return user;
  }

}
