import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubjectModule } from '../subject/subject.module';
import { ReactionModule } from '../reaction/reaction.module';

import { InformationController } from './information.controller';
import { InformationService } from './information.service';
import { Information } from './information.entity';

import { YoutubeService } from './youtube.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Information]),
    forwardRef(() => SubjectModule),
    forwardRef(() => ReactionModule),
  ],
  controllers: [
    InformationController,
  ],
  providers: [
    YoutubeService,
    InformationService,
  ],
  exports: [
    InformationService,
  ],
})
export class InformationModule {}
