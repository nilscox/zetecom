import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InformationModule } from '../information/information.module';

import { ReactionController } from './reaction.controller';
import { ReactionService } from './reaction.service';
import { Reaction } from './reaction.entity';
import { Message } from './message.entity';
import { ShortReply } from './short-reply.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reaction, Message, ShortReply]),
    forwardRef(() => InformationModule),
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
