import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { Output } from 'Common/output.interceptor';

import { AuthorizedEmail } from './authorized-email.entity';
import { EmailService } from './email.service';
import { AuthorizedEmailOutDto } from './dtos/authorized-email-out.dto';
import { CreateAuthorizedEmailInDto } from './dtos/create-authorized-email-in.dto';

@Controller('email')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {

  constructor(
    private readonly emailService: EmailService,
  ) {}

  @Get('authorized')
  @Output(AuthorizedEmailOutDto)
  async findAll(): Promise<AuthorizedEmail[]> {
    return this.emailService.findAllAuthorized();
  }

  @Post('authorize')
  @Output(AuthorizedEmailOutDto)
  async create(@Body() dto: CreateAuthorizedEmailInDto): Promise<AuthorizedEmail> {
    return this.emailService.authorize(dto.email);
  }

}
