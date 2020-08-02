import { forwardRef, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InformationModule } from '../information/information.module';
import { UserModule } from '../user/user.module';

import { CommentController } from './comment.controller';
import { CommentFactory } from './comment.factory';
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
    TypeOrmModule.forFeature([CommentRepository, Message, Reaction]),
    UserModule,
    forwardRef(() => InformationModule),
    ReportModule,
    forwardRef(() => SubscriptionModule),
  ],
  controllers: [
    CommentController,
  ],
  providers: [
    CommentPageSize,
    CommentService,
    PopulateComment,
    CommentFactory,
  ],
  exports: [
    TypeOrmModule,
    CommentPageSize,
    CommentService,
    PopulateComment,
    CommentFactory,
  ],
})
export class CommentModule {}
