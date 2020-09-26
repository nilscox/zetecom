import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Report } from './report.entity';
import { ReportFactory } from './report.factory';
import { ReportService } from './report.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report]),
  ],
  providers: [
    ReportService,
    ReportFactory,
  ],
  exports: [
    ReportService,
    ReportFactory,
  ],
})
export class ReportModule {}
