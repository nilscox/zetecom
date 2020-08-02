import { forwardRef, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentModule } from '../comment/comment.module';
import { UserModule } from '../user/user.module';

import { InformationController } from './information.controller';
import { InformationFactory } from './information.factory';
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
    UserModule,
    forwardRef(() => CommentModule),
  ],
  controllers: [
    InformationController,
  ],
  providers: [
    InformationPageSize,
    InformationService,
    PopulateInformation,
    InformationFactory,
  ],
  exports: [
    TypeOrmModule,
    InformationService,
    PopulateInformation,
    InformationFactory,
  ],
})
export class InformationModule {}
