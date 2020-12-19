import { forwardRef, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsAreaModule } from '../comments-area/comments-area.module';
import { UserModule } from '../user/user.module';

import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';
import { Message } from './message.entity';
import { PopulateComment } from './populate-comment.interceptor';
import { Reaction } from './reaction.entity';
import { ReportModule } from './report/report.module';
import { SubscriptionModule } from './subscription/subscription.module';

const COMMENT_PAGE_SIZE = 'COMMENT_PAGE_SIZE';
const CommentPageSize: Provider = {
  provide: COMMENT_PAGE_SIZE,
  useValue: 10,
};

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([CommentRepository, Message, Reaction]),
    UserModule,
    ReportModule,
    forwardRef(() => CommentsAreaModule),
    forwardRef(() => SubscriptionModule),
  ],
  controllers: [CommentController],
  providers: [CommentPageSize, CommentService, PopulateComment],
  exports: [TypeOrmModule, CommentPageSize, CommentService, PopulateComment],
})
export class CommentModule {}
