import { Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Put, UseGuards, UseInterceptors } from '@nestjs/common';

import { AuthUser } from '../../common/auth-user.decorator';
import { IsAuthenticated } from '../../common/auth.guard';
import { CastToDto } from '../../common/cast-to-dto.interceptor';
import { ClassToPlainInterceptor } from '../../common/ClassToPlain.interceptor';
import { PageQuery } from '../../common/page-query.decorator';
import { Paginated } from '../../common/paginated';
import { Roles } from '../../common/roles.decorator';
import { Role } from '../authorization/roles.enum';
import { CommentService } from '../comment/comment.service';
import { PopulateComment } from '../comment/populate-comment.interceptor';
import { ReportedCommentDto } from '../comment/report/dtos/reported-comment-dto';
import { User } from '../user/user.entity';

import { DeleteCommentInDto } from './dtos/delete-comment-in.dto';
import { IgnoreReportsInDto } from './dtos/ignore-reports-in.dto';
import { CommentWithReports, ModerationService } from './moderation.service';

@Controller('moderation')
@UseInterceptors(ClassToPlainInterceptor)
export class ModerationController {

  constructor(
    private readonly commentService: CommentService,
    private readonly moderationService: ModerationService,
  ) {}

  @Get('reports')
  @UseGuards(IsAuthenticated)
  @Roles(Role.MODERATOR, Role.ADMIN)
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
  @Roles(Role.MODERATOR, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  async ignoreReports(
    @Body() { commentId }: IgnoreReportsInDto,
    @AuthUser() user: User,
  ): Promise<void> {
    const comment = await this.commentService.findById(commentId);

    if (!comment)
      throw new NotFoundException();

    await this.moderationService.ignoreReports(comment, user);
  }

  @Put('delete-comment')
  @UseGuards(IsAuthenticated)
  @Roles(Role.MODERATOR, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteComment(
    @Body() { commentId }: DeleteCommentInDto,
    @AuthUser() user: User,
  ): Promise<void> {
    const comment = await this.commentService.findById(commentId);

    if (!comment)
      throw new NotFoundException();

    await this.moderationService.deleteComment(comment, user);
  }

}
