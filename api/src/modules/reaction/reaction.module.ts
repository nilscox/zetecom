import { Module, forwardRef, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InformationModule } from '../information/information.module';
import { SubjectModule } from '../subject/subject.module';

import { ReactionController } from './reaction.controller';
import { ReactionService } from './reaction.service';
import { Message } from './message.entity';
import { QuickReaction } from './quick-reaction.entity';
import { ReactionRepository } from './reaction.repository';
import { ReportModule } from '../report/report.module';
import { SubscriptionModule } from '../subscription/subscription.module';
import { PopulateReaction } from './populate-reaction.interceptor';

const REACTION_PAGE_SIZE = 'REACTION_PAGE_SIZE';
const ReactionPageSize: Provider = {
  provide: REACTION_PAGE_SIZE,
  useValue: 10,
};

@Module({
  imports: [
    TypeOrmModule.forFeature([ReactionRepository, Message, QuickReaction]),
    forwardRef(() => InformationModule),
    forwardRef(() => SubjectModule),
    ReportModule,
    SubscriptionModule,
  ],
  controllers: [
    ReactionController,
  ],
  providers: [
    ReactionPageSize,
    ReactionService,
    PopulateReaction,
  ],
  exports: [
    TypeOrmModule,
    ReactionPageSize,
    ReactionService,
    PopulateReaction,
  ],
})
export class ReactionModule {}
