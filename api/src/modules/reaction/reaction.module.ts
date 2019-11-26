import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InformationModule } from '../information/information.module';
import { Information } from '../information/information.entity';
import { SubjectModule } from '../subject/subject.module';

import { ReactionController } from './reaction.controller';
import { ReactionService } from './reaction.service';
import { Reaction } from './reaction.entity';
import { Message } from './message.entity';
import { QuickReaction } from './quick-reaction.entity';
import { Report } from './report.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Information, Reaction, Message, QuickReaction, Report]),
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
    ReactionService,
  ],
})
export class ReactionModule {}
