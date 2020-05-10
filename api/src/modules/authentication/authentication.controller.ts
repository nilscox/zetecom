import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  Query,
  Res,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';

import { AuthUser } from 'Common/auth-user.decorator';
import { IsAuthenticated, IsNotAuthenticated } from 'Common/auth.guard';
import { Output } from 'Common/output.interceptor';

import { ConfigService } from '../config/config.service';
import { UserOutDto } from '../user/dtos/user-out.dto';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

import { AuthenticationService } from './authentication.service';
import { AskEmailLoginInDto } from './dtos/ask-email-login-in.dto';
import { ChangePasswordInDto } from './dtos/change-password-in-dto';
import { EmailLoginInDto } from './dtos/email-login-in.dto';
import { LoginUserInDto } from './dtos/login-user-in.dto';
import { SignupUserInDto } from './dtos/signup-user-in.dto';

type SessionType = {
  userId?: number;
};

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthenticationService,
    private readonly userService: UserService,
  ) {}

  @Post('/signup')
  @UseGuards(IsNotAuthenticated)
  @Output(UserOutDto)
  async signup(@Body() signupUserDto: SignupUserInDto, @Session() session: SessionType): Promise<User> {
    const user = await this.authService.signup(signupUserDto);

    if (user.emailValidated)
      session.userId = user.id;

    return user;
  }

  @Get('/email-validation')
  @UseGuards(IsNotAuthenticated)
  async emailValidation(@Res() res: Response, @Query('token') token: string, @Session() session: SessionType): Promise<void> {
    const WEBSITE_URL = this.configService.get('WEBSITE_URL');
    const user = await this.userService.validateFromToken(token);

    session.userId = user.id;
    res.redirect(`${WEBSITE_URL}?email-validated=true`);
  }

  @Post('/login')
  @UseGuards(IsNotAuthenticated)
  @HttpCode(200)
  @Output(UserOutDto)
  async login(@Body() loginUserDto: LoginUserInDto, @Session() session: SessionType): Promise<User> {
    const { email, password } = loginUserDto;
    const user = await this.authService.login(email, password);

    session.userId = user.id;

    return user;
  }

  @Post('/email-login')
  @UseGuards(IsNotAuthenticated)
  @HttpCode(200)
  @Output(UserOutDto)
  async emailLogin(@Body() emailLoginDto: EmailLoginInDto, @Session() session: SessionType): Promise<User> {
    const user = await this.authService.emailLogin(emailLoginDto.token);

    session.userId = user.id;

    return user;
  }

  @Post('/ask-email-login')
  @UseGuards(IsNotAuthenticated)
  @HttpCode(204)
  async askEmailLogin(@Body() aksEmailLoginDto: AskEmailLoginInDto): Promise<void> {
    await this.authService.askEmailLogin(aksEmailLoginDto.email);
  }

  @Put('change-password')
  @UseGuards(IsAuthenticated)
  @Output(UserOutDto)
  async changeUserPassword(@Body() dto: ChangePasswordInDto, @AuthUser() user: User): Promise<User> {
    const { password } = dto;
    await this.authService.changeUserPassword(user, password);

    return user;
  }

  @Post('/logout')
  @UseGuards(IsAuthenticated)
  @HttpCode(204)
  logout(@Session() session: SessionType): void {
    delete session.userId;
  }

  @Get('/me')
  @UseGuards(IsAuthenticated)
  @Output(UserOutDto)
  me(@AuthUser() user: User): User {
    return user;
  }

}
