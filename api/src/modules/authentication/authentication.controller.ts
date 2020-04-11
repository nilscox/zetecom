import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Res,
  Session, UseGuards,
  UseInterceptors } from '@nestjs/common';

import { AuthUser } from 'Common/auth-user.decorator';
import { IsAuthenticated, IsNotAuthenticated } from 'Common/auth.guard';
import { Output } from 'Common/output.interceptor';

import { UserOutDto } from '../user/dtos/user-out.dto';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

import { AuthenticationService } from './authentication.service';
import { LoginUserInDto } from './dtos/login-user-in.dto';
import { SignupUserInDto } from './dtos/signup-user-in.dto';

const {
  WEBSITE_URL,
} = process.env;

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {

  constructor(
    private readonly authService: AuthenticationService,
    private readonly userService: UserService,
  ) {}

  @Post('/signup')
  @UseGuards(IsNotAuthenticated)
  @Output(UserOutDto)
  async signup(@Body() signupUserDto: SignupUserInDto, @Session() session): Promise<User> {
    const user = await this.authService.signup(signupUserDto);

    if (user.emailValidated)
      session.userId = user.id;

    return user;
  }

  @Get('/email-validation')
  @UseGuards(IsNotAuthenticated)
  async emailValidation(@Res() res, @Query('token') token: string, @Session() session): Promise<void> {
    const user = await this.userService.validateFromToken(token);

    session.userId = user.id;
    res.redirect(`${WEBSITE_URL}?email-validated=true`);
  }

  @Post('/login')
  @UseGuards(IsNotAuthenticated)
  @HttpCode(200)
  @Output(UserOutDto)
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
  @UseGuards(IsAuthenticated)
  @Output(UserOutDto)
  me(@AuthUser() user): User {
    return user;
  }

}
