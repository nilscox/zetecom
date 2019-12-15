import { Module, forwardRef, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InformationModule } from '../information/information.module';
import { ReactionModule } from '../reaction/reaction.module';

import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';
import { SubjectRepository } from './subject.repository';

const SUBJECT_PAGE_SIZE = 'SUBJECT_PAGE_SIZE';
const SubjectPageSize: Provider = {
  provide: SUBJECT_PAGE_SIZE,
  useValue: 10,
};

@Module({
  imports: [
    TypeOrmModule.forFeature([SubjectRepository]),
    forwardRef(() => InformationModule),
    forwardRef(() => ReactionModule),
  ],
  controllers: [
    SubjectController,
  ],
  providers: [
    SubjectPageSize,
    SubjectService,
  ],
  exports: [
    TypeOrmModule,
    SubjectPageSize,
    SubjectService,
  ],
})
export class SubjectModule {}
