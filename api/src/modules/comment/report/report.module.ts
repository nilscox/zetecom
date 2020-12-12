import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Report } from './report.entity';
import { ReportService } from './report.service';

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
