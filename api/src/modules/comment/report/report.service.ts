import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../user/user.entity';
import { Comment } from '../comment.entity';
import { CommentService } from '../comment.service';

import { Report } from './report.entity';

@Injectable()
export class ReportService {

  constructor(
    private readonly commentService: CommentService,
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}

  async findById(id: number) {
    return this.reportRepository.findOne(id);
  }

  async findReportedCommentsPaginated(page: number, pageSize: number): Promise<[Array<Comment & { reports: Report[] }>, number]> {
    const reports = await this.reportRepository.find({
      where: { waitingForReview: true },
    });

    const commentsIds = [...new Set(reports.map(({ comment }) => comment.id))];
    const comments = await this.commentService.findByIds(commentsIds.slice((page - 1 * pageSize), page * pageSize));

    const findReports = (commentId: number) => {
      return reports.filter(({ comment: { id } }) => id === commentId);
    };

    return [
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      comments.map(comment => ({ ...comment, reports: findReports(comment.id) })),
      commentsIds.length,
    ];
  }

  async report(comment: Comment, user: User, message: string) {
    const report = new Report();

    report.comment = comment;
    report.user = user;
    report.message = message;
    report.waitingForReview = true;

    await this.reportRepository.save(report);

    return this.findById(report.id);
  }

  async didUserReportComment(comment: Comment, user: User): Promise<boolean> {
    return (await this.reportRepository.count({ comment: comment, user })) > 0;
  }

  async findReport(comment: Comment, user: User): Promise<Report | undefined> {
    return this.reportRepository.findOne({ comment: comment, user });
  }

}
