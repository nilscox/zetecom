import { Module } from '@nestjs/common';

import { ReportModule } from '../comment/report/report.module';

import { ModerationController } from './moderation.controller';

@Module({
  imports: [
    ReportModule,
  ],
  controllers: [
    ModerationController,
  ],
  providers: [
    // ModerationService,
  ],
})
export class ModerationModule {}
