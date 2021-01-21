import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from 'src/modules/config/config.module';
import { EmailModule } from 'src/modules/email/email.module';
import { User } from 'src/modules/user/user.entity';
import { UserModule } from 'src/modules/user/user.module';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    UserModule,
    EmailModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
