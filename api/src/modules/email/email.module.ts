import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailService } from './email.service';
import { AuthorizedEmail } from './authorized-email.entity';
import { UserController } from './email.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorizedEmail]),
  ],
  controllers: [UserController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
