import { Injectable } from '@nestjs/common';

import { Comment } from 'src/modules/comment/comment.entity';
import { CommentService } from 'src/modules/comment/comment.service';
import { Report, ReportModerationAction } from 'src/modules/comment/report/report.entity';
import { ReportService } from 'src/modules/comment/report/report.service';
import { User } from 'src/modules/user/user.entity';

export type CommentWithReports = Comment & { reports: Report[] };

@Injectable()
export class ModerationService {

  constructor(
    private readonly commentService: CommentService,
    private readonly reportService: ReportService,
  ) {}

  async findReportsPaginated(page: number, pageSize: number): Promise<[Array<CommentWithReports>, number]> {
    const reports = await this.reportService.findReports(false);

    const commentsIds = [...new Set(reports.map(({ comment }) => comment.id))];
    const comments = await this.commentService.findByIds(commentsIds.slice((page - 1 * pageSize), page * pageSize));

    const findReports = (commentId: number) => {
      return reports.filter(({ comment: { id } }) => id === commentId);
    };

    return [
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      comments.map(comment => ({ ...comment, reports: findReports(comment.id) })),
      commentsIds.length,
    ];
  }

  async ignoreReports(comment: Comment, moderator: User) {
    const reports = await this.reportService.findReportsForComment(comment, false);

    if (!reports.length)
      return;

    await this.reportService.markAsModerated(reports, moderator, ReportModerationAction.IGNORED);
  }

  async deleteComment(comment: Comment, moderator: User) {
    const reports = await this.reportService.findReportsForComment(comment, false);

    await this.commentService.delete(comment);

    if (reports.length > 0)
      await this.reportService.markAsModerated(reports, moderator, ReportModerationAction.DELETED);
  }

}
