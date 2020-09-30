import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentModule } from '../comment/comment.module';
import { CommentsAreaModule } from '../comments-area/comments-area.module';
import { UserModule } from '../user/user.module';

import { CypressController } from './cypress.controller';
import { CypressService } from './cypress.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forRoot({
      name: 'postgres',
      host: 'zc-postgres',
      type: 'postgres',
      username: 'root',
      password: 'root',
      database: 'postgres',
      logging: true,
    }),
    UserModule,
    CommentsAreaModule,
    CommentModule,
  ],
  controllers: [CypressController],
  providers: [CypressService],
})
export class CypressModule {}
