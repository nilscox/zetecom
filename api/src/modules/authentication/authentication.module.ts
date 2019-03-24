import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserToken } from './user-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserToken]),
    UserModule,
  ],
  controllers: [
    AuthenticationController,
  ],
  providers: [
    AuthenticationService,
  ],
  exports: [
    AuthenticationService,
  ],
})
export class AuthenticationModule {}
