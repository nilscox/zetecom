import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentModule } from '../comment.module';

import { Report } from './report.entity';
import { ReportFactory } from './report.factory';
import { ReportService } from './report.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report]),
    forwardRef(() => CommentModule),
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
