import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { User } from './entities/user.entity';
import { UserToken } from './entities/user-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserToken]),
  ],
  controllers: [
    UserController,
    AuthController,
  ],
  providers: [
    UserService,
  ],
})
export class UserModule {}
