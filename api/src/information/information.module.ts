import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InformationController } from './controllers/information.controller';
import { ReactionController } from './controllers/reaction.controller';
import { YoutubeService } from './services/youtube.service';
import { PaginationService } from './services/pagination.service';
import { InformationService } from './services/information.service';
import { ReactionService } from './services/reaction.service';
import { SlugService } from './services/slug.service';
import { Information } from './entities/information.entity';
import { Reaction } from './entities/reaction.entity';
import { Message } from './entities/message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Information, Reaction, Message]),
  ],
  controllers: [
    InformationController,
    ReactionController,
  ],
  providers: [
    SlugService,
    YoutubeService,
    PaginationService,
    InformationService,
    ReactionService,
  ],
})
export class InformationModule {}
