import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentModule } from 'src/modules/comment/comment.module';
import { CommentsAreaModule } from 'src/modules/comments-area/comments-area.module';
import { CommentsAreaIntegrationModule } from 'src/modules/comments-area/comments-area-integration/comments-area-integration.module';
import { ConfigModule } from 'src/modules/config/config.module';
import { LoggerModule } from 'src/modules/logger/logger.module';
import { UserModule } from 'src/modules/user/user.module';

import { E2eController } from './e2e.controller';
import { E2eService } from './e2e.service';

const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_NAME_ROOT } = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forRoot({
      name: 'postgres',
      type: 'postgres',
      host: DB_HOST,
      username: DB_USER,
      password: DB_PASS,
      database: DB_NAME_ROOT || DB_NAME,
      logging: false,
    }),
    ConfigModule,
    LoggerModule,
    UserModule,
    CommentsAreaModule,
    CommentsAreaIntegrationModule,
    CommentModule,
  ],
  controllers: [E2eController],
  providers: [E2eService],
})
export class E2eModule {}
