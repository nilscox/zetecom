import { Module, forwardRef, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubjectModule } from '../subject/subject.module';
import { ReactionModule } from '../reaction/reaction.module';

import { InformationController } from './information.controller';
import { InformationService } from './information.service';

import { YoutubeService } from './youtube.service';
import { InformationRepository } from './information.repository';

const INFORMATION_PAGE_SIZE = 'INFORMATION_PAGE_SIZE';
const InformationPageSize: Provider = {
  provide: INFORMATION_PAGE_SIZE,
  useValue: 10,
};

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
    InformationPageSize,
    InformationService,
  ],
  exports: [
    TypeOrmModule,
    InformationService,
  ],
})
export class InformationModule {}
