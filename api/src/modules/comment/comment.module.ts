import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InformationModule } from '../information/information.module';
import { UserModule } from '../user/user.module';

import { CommentFactory } from './comment.factory';
import { CommentRepository } from './comment.repository';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { MessageModule } from './message/message.module';
import { ReactionModule } from './reaction/reaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentRepository]),
    InformationModule,
    UserModule,
    MessageModule,
    ReactionModule,
  ],
  providers: [
    CommentResolver,
    CommentService,
    CommentFactory,
  ],
  exports: [
    CommentFactory,
  ],
})
export class CommentModule {}
