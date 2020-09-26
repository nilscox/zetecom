import { Body, Controller, Get, HttpCode, HttpStatus, Put, UseGuards, UseInterceptors } from '@nestjs/common';

import { AuthUser } from '../../common/auth-user.decorator';
import { IsAuthenticated } from '../../common/auth.guard';
import { CastToDto } from '../../common/cast-to-dto.interceptor';
import { ClassToPlainInterceptor } from '../../common/ClassToPlain.interceptor';
import { PageQuery } from '../../common/page-query.decorator';
import { Paginated } from '../../common/paginated';
import { Roles } from '../../common/roles.decorator';
import { Role } from '../authorization/roles.enum';
import { PopulateComment } from '../comment/populate-comment.interceptor';
import { ReportedCommentDto } from '../comment/report/dtos/reported-comment-dto';
import { User } from '../user/user.entity';

import { IgnoreReportsInDto } from './dtos/ignore-reports-in.dto';
import { CommentWithReports, ModerationService } from './moderation.service';

@Controller('moderation')
@UseInterceptors(ClassToPlainInterceptor)
export class ModerationController {

  constructor(
    private readonly moderationService: ModerationService,
  ) {}

  @Get('reports')
  @UseGuards(IsAuthenticated)
  @Roles(Role.MODERATOR)
  @UseInterceptors(PopulateComment)
  @CastToDto(ReportedCommentDto)
  async findCommentsWaitingForReview(
    @PageQuery() page: number,
  ): Promise<Paginated<CommentWithReports>> {
    const [items, total] = await this.moderationService.findReportsPaginated(page, 10);

    return { total, items };
  }

  @Put('ignore-reports')
  @UseGuards(IsAuthenticated)
  @Roles(Role.MODERATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  async ignoreReports(
    @Body() { commentId }: IgnoreReportsInDto,
    @AuthUser() user: User,
  ): Promise<void> {
    await this.moderationService.ignoreReports(commentId, user);
  }

}
