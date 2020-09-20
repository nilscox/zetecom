import { Module, OnModuleInit } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';

import EmailRendererService from './email-renderer.service';
import { UserController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  imports: [ConfigModule],
  controllers: [UserController],
  providers: [EmailService, EmailRendererService],
  exports: [EmailService],
})
export class EmailModule implements OnModuleInit {

  constructor(
    private readonly emailRendererService: EmailRendererService,
  ) {}

  async onModuleInit() {
    await this.emailRendererService.onInit();
  }

}
