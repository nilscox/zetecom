import { Module } from '@nestjs/common';

import { CommentModule } from '../comment/comment.module';
import { ReportModule } from '../comment/report/report.module';

import { ModerationController } from './moderation.controller';
import { ModerationService } from './moderation.service';

@Module({
  imports: [
    CommentModule,
    ReportModule,
  ],
  controllers: [
    ModerationController,
  ],
  providers: [
    ModerationService,
  ],
})
export class ModerationModule {}
