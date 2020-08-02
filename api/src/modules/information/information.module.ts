import { forwardRef, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentModule } from '../comment/comment.module';

import { InformationController } from './information.controller';
import { InformationRepository } from './information.repository';
import { InformationService } from './information.service';
import { PopulateInformation } from './populate-information.interceptor';

const INFORMATION_PAGE_SIZE = 'INFORMATION_PAGE_SIZE';
const InformationPageSize: Provider = {
  provide: INFORMATION_PAGE_SIZE,
  useValue: 10,
};

@Module({
  imports: [
    TypeOrmModule.forFeature([InformationRepository]),
    forwardRef(() => CommentModule),
  ],
  controllers: [
    InformationController,
  ],
  providers: [
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
