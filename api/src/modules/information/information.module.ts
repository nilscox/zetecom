import { forwardRef, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InformationController } from './information.controller';
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
  ],
  controllers: [
    InformationController,
  ],
  providers: [
    InformationPageSize,
    InformationService,
  ],
  exports: [
    TypeOrmModule,
    InformationService,
  ],
})
export class InformationModule {}
