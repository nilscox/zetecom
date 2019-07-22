import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InformationModule } from '../information/information.module';
import { ReactionModule } from '../reaction/reaction.module';
import { Message } from '../reaction/message.entity';

import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';
import { Subject } from './subject.entity';

@Module({
  imports: [
    // code smell. create a message module maybe?
    TypeOrmModule.forFeature([Subject, Message]),
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
    SubjectService,
  ],
})
export class SubjectModule {}
