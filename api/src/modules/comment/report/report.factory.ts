import { Injectable } from '@nestjs/common';

import { Factory } from '../../../testing/factory';
import { User } from '../../user/user.entity';
import { Comment } from '../comment.entity';

import { Report, ReportModerationAction } from './report.entity';
import { ReportService } from './report.service';

type ReportFactoryData = {
  reporter: User;
  comment: Comment;
  message?: string;
};

@Injectable()
export class ReportFactory implements Factory<ReportFactoryData, Report> {
  constructor(
    private readonly reportService: ReportService,
  ) {}

  async create(data: ReportFactoryData): Promise<Report> {
    return this.reportService.report(
      data.comment,
      data.reporter,
      data.message || null,
    );
  }

  async markAsModerated(report: Report, moderator: User, action: ReportModerationAction): Promise<void> {
    return this.reportService.markAsModerated([report], moderator, action);
  }
}
