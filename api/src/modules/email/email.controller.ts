import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';

import { IsAuthenticated } from 'Common/auth.guard';
import { ClassToPlainInterceptor } from 'Common/ClassToPlain.interceptor';
import { Roles } from 'Common/roles.decorator';

import { Role } from '../authorization/roles.enum';

import { SendTestEmailInDto } from './dtos/send-test-email-in.dto';
import { EmailService } from './email.service';

@Controller('email')
@UseInterceptors(ClassToPlainInterceptor)
export class UserController {
  constructor(private readonly emailService: EmailService) {}

  @Post('test')
  @Roles(Role.ADMIN)
  @UseGuards(IsAuthenticated)
  async test(@Body() dto: SendTestEmailInDto): Promise<void> {
    await this.emailService.sendTestEmail(dto.to, dto.subject, dto.value);
  }
}
