import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsAreaModule } from 'src/modules/comments-area/comments-area.module';
import { UserModule } from 'src/modules/user/user.module';

import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';
import { Message } from './message.entity';
import { PopulateComment } from './populate-comment.interceptor';
import { Reaction } from './reaction.entity';
import { ReportModule } from './report/report.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([CommentRepository, Message, Reaction]),
    UserModule,
    ReportModule,
    CommentsAreaModule,
    forwardRef(() => SubscriptionModule),
  ],
  controllers: [CommentController],
  providers: [CommentService, PopulateComment],
  exports: [TypeOrmModule, CommentService, PopulateComment],
})
export class CommentModule {}
