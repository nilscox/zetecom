import { Module, OnModuleInit } from '@nestjs/common';

import { ConfigModule } from 'src/modules/config/config.module';

import { UserController } from './email.controller';
import { EmailService } from './email.service';
import EmailRendererService from './email-renderer.service';

@Module({
  imports: [ConfigModule],
  controllers: [UserController],
  providers: [EmailService, EmailRendererService],
  exports: [EmailService],
})
export class EmailModule implements OnModuleInit {
  constructor(private readonly emailRendererService: EmailRendererService) {}

  async onModuleInit() {
    await this.emailRendererService.onInit();
  }
}
