import { Injectable } from '@nestjs/common';

import { Factory } from '../../../testing/factory';
import { User } from '../../user/user.entity';
import { Comment } from '../comment.entity';

import { Report } from './report.entity';
import { ReportService } from './report.service';

type ReportFactoryData = {
  reporter: User;
  comment: Comment;
  message?: string;
  waitingForReiew?: boolean;
};

@Injectable()
export class ReportFactory implements Factory<ReportFactoryData, Report> {
  constructor(
    private readonly reportService: ReportService,
  ) {}

  async create(data: ReportFactoryData): Promise<Report> {
    return await this.reportService.report(
      data.comment,
      data.reporter,
      data.message || null,
    );
  }
}
