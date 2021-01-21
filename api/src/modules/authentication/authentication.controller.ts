import { Body, Controller, Get, HttpCode, Param, Post, Put, Session, UseGuards, UseInterceptors } from '@nestjs/common';

import { IsAuthenticated, IsNotAuthenticated } from 'Common/auth.guard';
import { AuthUser } from 'Common/auth-user.decorator';
import { ClassToPlainInterceptor } from 'Common/ClassToPlain.interceptor';

import { CastToDto } from '../../common/cast-to-dto.interceptor';
import { UserDto } from '../user/dtos/user.dto';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

import { AuthenticationService } from './authentication.service';
import { AskEmailLoginInDto } from './dtos/ask-email-login-in.dto';
import { ChangePasswordInDto } from './dtos/change-password-in-dto';
import { EmailLoginInDto } from './dtos/email-login-in.dto';
import { LoginUserInDto } from './dtos/login-user-in.dto';
import { SignupUserInDto } from './dtos/signup-user-in.dto';
import { SignupUserDto } from './dtos/signup-user-out.dto';

type SessionType = {
  userId?: number;
};

@Controller('auth')
@UseInterceptors(ClassToPlainInterceptor)
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService, private readonly userService: UserService) {}

  @Post('/signup')
  @UseGuards(IsNotAuthenticated)
  @CastToDto(SignupUserDto)
  async signup(@Body() signupUserDto: SignupUserInDto, @Session() session: SessionType): Promise<User> {
    const user = await this.authService.signup(signupUserDto);

    if (user.emailValidated) {
      session.userId = user.id;
    }

    return user;
  }

  @Post('/email-validation/:token')
  @UseGuards(IsNotAuthenticated)
  @CastToDto(UserDto)
  async emailValidation(@Param('token') token: string, @Session() session: SessionType): Promise<User> {
    const user = await this.userService.validateFromToken(token);

    session.userId = user.id;

    return user;
  }

  @Post('/login')
  @HttpCode(200)
  @UseGuards(IsNotAuthenticated)
  @CastToDto(UserDto)
  async login(@Body() loginUserDto: LoginUserInDto, @Session() session: SessionType): Promise<User> {
    const { email, password } = loginUserDto;
    const user = await this.authService.login(email, password);

    session.userId = user.id;

    return user;
  }

  @Post('/email-login')
  @HttpCode(200)
  @UseGuards(IsNotAuthenticated)
  @CastToDto(UserDto)
  async emailLogin(@Body() emailLoginDto: EmailLoginInDto, @Session() session: SessionType): Promise<User> {
    const user = await this.authService.emailLogin(emailLoginDto.token);

    session.userId = user.id;

    return user;
  }

  @Post('/ask-email-login')
  @HttpCode(204)
  @UseGuards(IsNotAuthenticated)
  async askEmailLogin(@Body() aksEmailLoginDto: AskEmailLoginInDto): Promise<void> {
    await this.authService.askEmailLogin(aksEmailLoginDto.email);
  }

  @Put('change-password')
  @UseGuards(IsAuthenticated)
  @CastToDto(UserDto)
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
  @CastToDto(UserDto)
  me(@AuthUser() user: User): User {
    return user;
  }
}
