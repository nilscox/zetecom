import {
  Controller,
  Get, Post,
  HttpCode,
  Session, Body,
  UseInterceptors, UseGuards,
  ClassSerializerInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';

import { User as ReqUser } from 'Common/user.decorator';
import { IsAuthenticated, IsNotAuthenticated } from 'Common/auth.guard';

import { CreateUserDto } from '../dtos/CreateUserDto';
import { LoginUserDto } from '../dtos/LoginUserDto';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';

class UserTokenDto {
  token: string;

  @Type(() => User)
  user: User;
}

class TokenLoginDto {
  @IsString()
  token: string;
}

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {

  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('/signup')
  @UseGuards(IsNotAuthenticated)
  async signup(@Body() createUserDto: CreateUserDto, @Session() session): Promise<UserTokenDto> {
    const { email, password, nick } = createUserDto;
    const user = await this.userService.create(email, password, nick);

    session.userId = user.id;

    const token = await this.userService.createUserToken(user);

    return { user, token };
  }

  @Post('/login')
  @UseGuards(IsNotAuthenticated)
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto, @Session() session): Promise<UserTokenDto> {
    const { email, password } = loginUserDto;
    const user = await this.userService.login(email, password);

    session.userId = user.id;

    const token = await this.userService.createUserToken(user);

    return { user, token };
  }

  @Post('/tokenLogin')
  @UseGuards(IsNotAuthenticated)
  @HttpCode(200)
  async tokenLogin(@Body() tokenLoginDto: TokenLoginDto, @Session() session): Promise<UserTokenDto> {
    const { token } = tokenLoginDto;
    const user = await this.userService.loginFromToken(token);

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
  @UseGuards(IsAuthenticated)
  me(@ReqUser() user): User {
    return user;
  }

}
