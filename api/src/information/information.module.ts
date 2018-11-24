import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InformationController } from './controllers/information.controller';
import { YoutubeService } from './services/youtube.service';
import { InformationService } from './services/information.service';
import { SlugService } from './services/slug.service';
import { Information } from './entities/information.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Information]),
  ],
  controllers: [
    InformationController,
  ],
  providers: [
    SlugService,
    YoutubeService,
    InformationService,
  ],
})
export class InformationModule {}
