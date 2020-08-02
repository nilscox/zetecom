import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../user/user.entity';
import { Comment } from '../comment.entity';

import { Report } from './report.entity';

@Injectable()
export class ReportService {

  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}

  async report(comment: Comment, user: User, message: string) {
    const report = new Report();

    report.comment = comment;
    report.user = user;
    report.message = message;

    await this.reportRepository.save(report);
  }

  async didUserReportComment(comment: Comment, user: User): Promise<boolean> {
    return (await this.reportRepository.count({ comment: comment, user })) > 0;
  }

  async findReport(comment: Comment, user: User): Promise<Report | undefined> {
    return this.reportRepository.findOne({ comment: comment, user });
  }

}
