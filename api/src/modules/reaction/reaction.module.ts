import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InformationModule } from '../information/information.module';
import { SubjectModule } from '../subject/subject.module';

import { ReactionController } from './reaction.controller';
import { ReactionService } from './reaction.service';
import { Message } from './message.entity';
import { QuickReaction } from './quick-reaction.entity';
import { ReactionRepository } from './reaction.repository';
import { ReportModule } from '../report/report.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReactionRepository, Message, QuickReaction]),
    forwardRef(() => InformationModule),
    forwardRef(() => SubjectModule),
    ReportModule,
  ],
  controllers: [
    ReactionController,
  ],
  providers: [
    ReactionService,
  ],
  exports: [
    TypeOrmModule,
    ReactionService,
  ],
})
export class ReactionModule {}
