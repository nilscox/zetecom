import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorizedEmail } from './authorized-email.entity';
import { UserController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorizedEmail]),
  ],
  controllers: [UserController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
