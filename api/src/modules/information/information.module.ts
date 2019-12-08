import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubjectModule } from '../subject/subject.module';
import { ReactionModule } from '../reaction/reaction.module';

import { InformationController } from './information.controller';
import { InformationService } from './information.service';

import { YoutubeService } from './youtube.service';
import { InformationRepository } from './information.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([InformationRepository]),
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
    TypeOrmModule,
    InformationService,
  ],
})
export class InformationModule {}
