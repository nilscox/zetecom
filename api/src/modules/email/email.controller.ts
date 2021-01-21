import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';

import { IsAuthenticated } from 'src/common/auth.guard';
import { ClassToPlainInterceptor } from 'src/common/ClassToPlain.interceptor';
import { Roles } from 'src/common/roles.decorator';
import { Role } from 'src/modules/authorization/roles.enum';

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
