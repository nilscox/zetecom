import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AvatarModule } from 'src/modules/avatar/avatar.module';
import { AvatarMulterModule } from 'src/modules/avatar/avatar.multer-module';
import { ConfigModule } from 'src/modules/config/config.module';
import { EmailModule } from 'src/modules/email/email.module';

import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule, AvatarMulterModule, EmailModule, AvatarModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
