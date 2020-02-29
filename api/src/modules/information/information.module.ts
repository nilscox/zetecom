import { forwardRef, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReactionModule } from '../reaction/reaction.module';
import { SubjectModule } from '../subject/subject.module';

import { InformationController } from './information.controller';
import { InformationRepository } from './information.repository';
import { InformationService } from './information.service';
import { PopulateInformation } from './populate-information.interceptor';
import { YoutubeService } from './youtube.service';

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
    PopulateInformation,
  ],
  exports: [
    TypeOrmModule,
    InformationService,
    PopulateInformation,
  ],
})
export class InformationModule {}
