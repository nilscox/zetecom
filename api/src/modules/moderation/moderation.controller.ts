import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';

import { IsAuthenticated } from '../../common/auth.guard';
import { CastToDto } from '../../common/cast-to-dto.interceptor';
import { ClassToPlainInterceptor } from '../../common/ClassToPlain.interceptor';
import { PageQuery } from '../../common/page-query.decorator';
import { Paginated } from '../../common/paginated';
import { Roles } from '../../common/roles.decorator';
import { Role } from '../authorization/roles.enum';
import { Comment } from '../comment/comment.entity';
import { PopulateComment } from '../comment/populate-comment.interceptor';
import { ReportedCommentDto } from '../comment/report/dtos/reported-comment-dto';
import { Report } from '../comment/report/report.entity';
import { ReportService } from '../comment/report/report.service';

@Controller('moderation')
@UseInterceptors(ClassToPlainInterceptor)
export class ModerationController {

  constructor(
    private readonly reportService: ReportService,
  ) {}

  @Get('reports')
  @UseGuards(IsAuthenticated)
  @Roles(Role.MODERATOR)
  @UseInterceptors(PopulateComment)
  @CastToDto(ReportedCommentDto)
  async findCommentsWaitingForReview(
    @PageQuery() page: number,
  ): Promise<Paginated<Comment & { reports: Report[] }>> {
    const [items, total] = await this.reportService.findReportedCommentsPaginated(page, 10);

    return { total, items };
  }

}
