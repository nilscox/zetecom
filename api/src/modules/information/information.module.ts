import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';

import { InformationController } from './information.controller';
import { InformationFactory } from './information.factory';
import { InformationRepository } from './information.repository';
import { InformationService } from './information.service';

const INFORMATION_PAGE_SIZE = 'INFORMATION_PAGE_SIZE';
const InformationPageSize: Provider = {
  provide: INFORMATION_PAGE_SIZE,
  useValue: 10,
};

@Module({
  imports: [
    TypeOrmModule.forFeature([InformationRepository]),
    UserModule,
  ],
  controllers: [
    InformationController,
  ],
  providers: [
    InformationPageSize,
    InformationService,
    InformationFactory,
  ],
  exports: [
    TypeOrmModule,
    InformationService,
    InformationFactory,
  ],
})
export class InformationModule {}
