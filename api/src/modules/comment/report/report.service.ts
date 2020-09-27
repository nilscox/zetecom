import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';

import { User } from '../../user/user.entity';
import { Comment } from '../comment.entity';

import { Report, ReportModerationAction } from './report.entity';

@Injectable()
export class ReportService {

  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}

  async findById(id: number) {
    return this.reportRepository.findOne(id);
  }

  async findReports(moderated: boolean) {
    return this.reportRepository.find({
      where: {
        moderationAction: moderated ? Not(null) : null,
      },
      order: {
        created: 'DESC',
      },
    });
  }

  async findReportsForComment(comment: Comment, moderated: boolean) {
    return this.reportRepository.find({
      where: {
        comment,
        moderationAction: moderated ? Not(null) : null,
      },
    });
  }

  async markAsModerated(reports: Report[], moderator: User, action: ReportModerationAction) {
    await this.reportRepository.update(
      { id: In(reports.map(({ id }) => id)) },
      { moderatedBy: moderator, moderationAction: action },
    );
  }

  async report(comment: Comment, reporter: User, message: string) {
    const report = new Report();

    report.reportedBy = reporter;
    report.comment = comment;
    report.message = message;

    await this.reportRepository.save(report);

    return this.findById(report.id);
  }

  async didUserReportComment(comment: Comment, user: User): Promise<boolean> {
    return (await this.reportRepository.count({ comment: comment, reportedBy: user })) > 0;
  }

  async findReport(comment: Comment, reporter: User): Promise<Report | undefined> {
    return this.reportRepository.findOne({ comment: comment, reportedBy: reporter });
  }

}
