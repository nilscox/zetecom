import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InformationModule } from '../information/information.module';
import { ReactionModule } from '../reaction/reaction.module';

import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';
import { SubjectRepository } from './subject.repository';

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
    SubjectService,
  ],
  exports: [
    TypeOrmModule,
    SubjectService,
  ],
})
export class SubjectModule {}
