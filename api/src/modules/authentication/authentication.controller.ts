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
import { Output } from 'Common/output.interceptor';

import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { CreateUserInDto } from '../user/dtos/create-user-in.dto';
import { UserOutDto } from '../user/dtos/user-out.dto';

import { AuthenticationService } from './authentication.service';
import { LoginUserInDto } from './dtos/login-user-in.dto';
import { TokenLoginInDto } from './dtos/token-login-in.dto';
import { UserTokenOutDto } from './dtos/user-token-out.dto';

interface UserToken {
  user: User;
  token: string;
}

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {

  constructor(
    private readonly authService: AuthenticationService,
    private readonly userService: UserService,
  ) {}

  @Post('/signup')
  @Output(UserTokenOutDto)
  @UseGuards(IsNotAuthenticated)
  async signup(@Body() createUserDto: CreateUserInDto, @Session() session): Promise<UserToken> {
    const { email, password, nick, avatar } = createUserDto;
    const user = await this.userService.create(email, password, nick, avatar);

    session.userId = user.id;

    const token = await this.authService.createUserToken(user);

    return { user, token };
  }

  @Post('/login')
  @Output(UserTokenOutDto)
  @UseGuards(IsNotAuthenticated)
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserInDto, @Session() session): Promise<UserToken> {
    const { email, password } = loginUserDto;
    const user = await this.authService.login(email, password);

    session.userId = user.id;

    const token = await this.authService.createUserToken(user);

    return { user, token };
  }

  @Post('/tokenLogin')
  @Output(UserTokenOutDto)
  @UseGuards(IsNotAuthenticated)
  @HttpCode(200)
  async tokenLogin(@Body() tokenLoginDto: TokenLoginInDto, @Session() session): Promise<UserToken> {
    const { token } = tokenLoginDto;
    const user = await this.authService.loginFromToken(token);

    session.userId = user.id;

    return { user, token };
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
