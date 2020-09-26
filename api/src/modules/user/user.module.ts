import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AvatarModule } from '../avatar/avatar.module';
import { AvatarMulterModule } from '../avatar/avatar.multer-module';
import { ConfigModule } from '../config/config.module';
import { EmailModule } from '../email/email.module';

import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserFactory } from './user.factory';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    AvatarMulterModule,
    EmailModule,
    AvatarModule,
  ],
  controllers: [
    UserController,
  ],
  providers: [
    UserService,
    UserFactory,
  ],
  exports: [
    UserService,
    UserFactory,
  ],
})
export class UserModule {}
