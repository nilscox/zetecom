import { existsSync, promises as fs } from 'fs';

import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { User } from '../user/user.entity';

import { AvatarService } from './avatar.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
  ],
  providers: [AvatarService],
  exports: [AvatarService],
})
export class AvatarModule implements OnApplicationBootstrap {

  constructor(
    private readonly configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    const USER_AVATAR_DESTINATION = this.configService.get('USER_AVATAR_DESTINATION');

    if (!USER_AVATAR_DESTINATION) {
      return;
    }

    if (!existsSync(USER_AVATAR_DESTINATION)) {
      await fs.mkdir(USER_AVATAR_DESTINATION);
    }
  }

}
