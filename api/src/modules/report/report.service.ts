import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Reaction } from '../reaction/reaction.entity';
import { User } from '../user/user.entity';

import { Report } from './report.entity';

@Injectable()
export class ReportService {

  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}

  async report(reaction: Reaction, user: User, message: string) {
    const report = new Report();

    report.reaction = reaction;
    report.user = user;
    report.message = message;

    await this.reportRepository.save(report);
  }

  async didUserReportReaction(reaction: Reaction, user: User): Promise<boolean> {
    return (await this.reportRepository.count({ reaction, user })) > 0;
  }

  async findReport(reaction: Reaction, user: User): Promise<Report> {
    return this.reportRepository.findOne({ reaction, user });
  }

}
