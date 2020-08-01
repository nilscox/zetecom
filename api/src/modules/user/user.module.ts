import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AvatarModule } from '../avatar/avatar.module';
import { AvatarMulterModule } from '../avatar/avatar.multer-module';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { EmailModule } from '../email/email.module';

import { UserController } from './user.controller';
import { User } from './user.entity';
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
  ],
  exports: [
    UserService,
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

    const [email, nick, password] = admin.split(':');

    if (!email || !nick || !password)
      return;

    const existing = await this.userService.findByEmail(email);

    if (existing)
      return;

    await this.userService.createAdmin(email, nick, password);
  }

}
