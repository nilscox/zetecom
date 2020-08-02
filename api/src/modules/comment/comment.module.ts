import { forwardRef, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InformationModule } from '../information/information.module';
import { ReportModule } from '../report/report.module';
import { CommentSubscriptionModule } from '../subscription/subscription.module';

import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';
import { Message } from './message.entity';
import { PopulateComment } from './populate-comment.interceptor';
import { Reaction } from './reaction.entity';

const COMMENT_PAGE_SIZE = 'COMMENT_PAGE_SIZE';
const CommentPageSize: Provider = {
  provide: COMMENT_PAGE_SIZE,
  useValue: 10,
};

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentRepository, Message, Reaction]),
    forwardRef(() => InformationModule),
    ReportModule,
    CommentSubscriptionModule,
  ],
  controllers: [
    CommentController,
  ],
  providers: [
    CommentPageSize,
    CommentService,
    PopulateComment,
  ],
  exports: [
    TypeOrmModule,
    CommentPageSize,
    CommentService,
    PopulateComment,
  ],
})
export class CommentModule {}
