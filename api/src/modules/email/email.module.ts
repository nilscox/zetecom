import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '../config/config.module';

import { AuthorizedEmail } from './authorized-email.entity';
import EmailRendererService from './email-renderer.service';
import { UserController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorizedEmail]),
    ConfigModule,
  ],
  controllers: [UserController],
  providers: [EmailService, EmailRendererService],
  exports: [EmailService],
})
export class EmailModule {}
