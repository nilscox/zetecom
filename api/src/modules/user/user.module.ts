import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AvatarModule } from '../avatar/avatar.module';
import { AvatarMulterModule } from '../avatar/avatar.multer-module';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
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
export class UserModule implements OnModuleInit {

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async onModuleInit() {
    const admin = this.configService.get('ADMIN_USER');

    if (!admin)
      return;

    const [nick, email, password] = admin.split(':');

    if (!nick || !email || !password)
      throw new Error('ADMIN_USER does not match the format nick:email:password)');

    const existing = await this.userService.findByEmail(email);

    if (existing)
      return;

    await this.userService.createAdmin(email, nick, password);
  }

}
