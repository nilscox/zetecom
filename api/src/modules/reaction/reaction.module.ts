import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InformationModule } from '../information/information.module';
import { SubjectModule } from '../subject/subject.module';

import { ReactionController } from './reaction.controller';
import { ReactionService } from './reaction.service';
import { Message } from './message.entity';
import { QuickReaction } from './quick-reaction.entity';
import { Report } from './report.entity';
import { ReactionRepository } from './reaction.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReactionRepository, Message, QuickReaction, Report]),
    forwardRef(() => InformationModule),
    forwardRef(() => SubjectModule),
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
