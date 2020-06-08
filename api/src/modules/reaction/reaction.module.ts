import { forwardRef, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InformationModule } from '../information/information.module';
import { ReportModule } from '../report/report.module';
import { ReactionSubscriptionModule } from '../subscription/subscription.module';

import { Message } from './message.entity';
import { PopulateReaction } from './populate-reaction.interceptor';
import { QuickReaction } from './quick-reaction.entity';
import { ReactionController } from './reaction.controller';
import { ReactionRepository } from './reaction.repository';
import { ReactionService } from './reaction.service';

const REACTION_PAGE_SIZE = 'REACTION_PAGE_SIZE';
const ReactionPageSize: Provider = {
  provide: REACTION_PAGE_SIZE,
  useValue: 10,
};

@Module({
  imports: [
    TypeOrmModule.forFeature([ReactionRepository, Message, QuickReaction]),
    forwardRef(() => InformationModule),
    ReportModule,
    ReactionSubscriptionModule,
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
