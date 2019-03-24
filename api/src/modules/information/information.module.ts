import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReactionModule } from '../reaction/reaction.module';

import { InformationController } from './information.controller';
import { InformationService } from './information.service';
import { Information } from './information.entity';

import { YoutubeService } from './services/youtube.service';
import { PaginationService } from './services/pagination.service';
import { SlugService } from './services/slug.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Information]),
    forwardRef(() => ReactionModule),
  ],
  controllers: [
    InformationController,
  ],
  providers: [
    SlugService,
    YoutubeService,
    PaginationService,
    InformationService,
  ],
  exports: [
    SlugService,
    YoutubeService,
    PaginationService,
    InformationService,
  ],
})
export class InformationModule {}
