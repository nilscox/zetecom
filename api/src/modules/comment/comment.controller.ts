import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { IsAuthenticated } from 'src/common/auth.guard';
import { AuthUser } from 'src/common/auth-user.decorator';
import { CastToDto } from 'src/common/cast-to-dto.interceptor';
import { ClassToPlainInterceptor } from 'src/common/ClassToPlain.interceptor';
import { IsAuthor, IsNotAuthor } from 'src/common/is-author.guard';
import { OptionalQuery } from 'src/common/optional-query.decorator';
import { PageQuery } from 'src/common/page-query.decorator';
import { PageSizeQuery } from 'src/common/page-size-query.decorator';
import { Paginated } from 'src/common/paginated';
import { SearchQuery } from 'src/common/search-query.decorator';
import { SortType } from 'src/common/sort-type';
import { SortTypePipe } from 'src/common/sort-type.pipe';
import { CommentsArea } from 'src/modules/comments-area/comments-area.entity';
import { CommentsAreaService } from 'src/modules/comments-area/comments-area.service';
import { User } from 'src/modules/user/user.entity';

import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';
import { CommentDto } from './dtos/comment.dto';
import { CommentsForCommentsAreaDto } from './dtos/comments-for-comments-area.dto';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { CreateReactionDto } from './dtos/create-reaction.dto';
import { MessageDto } from './dtos/message.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { Message } from './message.entity';
import { PopulateComment } from './populate-comment.interceptor';
import { PopulateCommentsForCommentsArea } from './populate-comments-for-comments-area.interceptor';
import { CreateReportDto } from './report/dtos/create-report.dto';
import { ReportService } from './report/report.service';
import { SubscriptionService } from './subscription/subscription.service';

@Controller('/comment')
@UseInterceptors(ClassToPlainInterceptor)
export class CommentController {
  constructor(
    private readonly commentsAreaService: CommentsAreaService,
    private readonly commentService: CommentService,
    private readonly subscriptionService: SubscriptionService,
    private readonly reportService: ReportService,
    private readonly commentRepository: CommentRepository,
  ) {}

  @Get('me')
  @UseGuards(IsAuthenticated)
  @CastToDto(CommentsForCommentsAreaDto)
  @UseInterceptors(PopulateCommentsForCommentsArea)
  async findForUser(
    @AuthUser() user: User,
    @SearchQuery() search: string,
    @PageQuery() page: number,
  ): Promise<Paginated<{ commentsArea: CommentsArea; comments: Comment[] }>> {
    return this.commentService.findForUser(user.id, search, page, 0);
  }

  @Get()
  @CastToDto(CommentDto)
  @UseInterceptors(PopulateComment)
  async findRoot(
    @Query('commentsAreaId', new ParseIntPipe()) commentsAreaId: number,
    @OptionalQuery({ key: 'sort', defaultValue: SortType.DATE_DESC }, new SortTypePipe()) sort: SortType,
    @SearchQuery() search: string,
    @PageQuery() page: number,
    @PageSizeQuery() pageSize: number,
  ) {
    const commentsArea = await this.commentsAreaService.findById(commentsAreaId);

    if (!commentsArea) {
      throw new NotFoundException();
    }

    return search
      ? this.commentService.search(commentsArea.id, search, sort, page, pageSize)
      : this.commentService.findRoot(commentsArea.id, sort, page, pageSize);
  }

  @Get('pending')
  @UseGuards(IsAuthenticated)
  @CastToDto(CommentDto)
  @UseInterceptors(PopulateComment)
  async findPending(@Query('commentsAreaId', new ParseIntPipe()) commentsAreaId: number, @AuthUser() user: User) {
    const commentsArea = await this.commentsAreaService.findById(commentsAreaId);

    if (!commentsArea) {
      throw new NotFoundException();
    }

    return this.commentService.findPendingForUser(commentsArea.id, user);
  }

  @Get(':id')
  @CastToDto(CommentDto)
  @UseInterceptors(PopulateComment)
  async findOneById(@Param('id', new ParseIntPipe()) id: number): Promise<Comment> {
    const comment = await this.commentService.findById(id);

    if (!comment) {
      throw new NotFoundException();
    }

    return comment;
  }

  @Get(':id/history')
  @CastToDto(MessageDto)
  async findHistory(@Param('id', new ParseIntPipe()) id: number): Promise<Message[]> {
    const comment = await this.commentService.findById(id, { messages: true });

    if (!comment) {
      throw new NotFoundException();
    }

    return comment.messages;
  }

  @Get(':id/ancestors')
  @CastToDto(CommentDto)
  @UseInterceptors(PopulateComment)
  async findAncestors(@Param('id', new ParseIntPipe()) id: number): Promise<Comment[]> {
    if (!(await this.commentService.exists(id))) {
      throw new NotFoundException();
    }

    return this.commentService.findAncestors(id);
  }

  @Get(':id/replies')
  @CastToDto(CommentDto)
  @UseInterceptors(PopulateComment)
  async findReplies(
    @Param('id', new ParseIntPipe()) id: number,
    @PageQuery() page: number,
    @PageSizeQuery() pageSize: number,
  ): Promise<Paginated<Comment>> {
    if (!(await this.commentService.exists(id))) {
      throw new NotFoundException();
    }

    return this.commentService.findReplies(id, page, pageSize);
  }

  // TODO: return 204
  @Post(':id/subscribe')
  @UseGuards(IsAuthenticated)
  async subscribe(@AuthUser() user: User, @Param('id', new ParseIntPipe()) id: number): Promise<void> {
    const comment = await this.commentService.findById(id);

    if (!comment) {
      throw new NotFoundException();
    }

    const subscription = await this.subscriptionService.getSubscription(user, comment);

    // TODO: error format
    if (subscription) {
      throw new ConflictException('already subscribed to comment ' + comment.id);
    }

    await this.subscriptionService.subscribe(user, comment);
  }

  @Post(':id/unsubscribe')
  @UseGuards(IsAuthenticated)
  @HttpCode(HttpStatus.NO_CONTENT)
  async unsubscribe(@AuthUser() user: User, @Param('id', new ParseIntPipe()) id: number): Promise<void> {
    const comment = await this.commentService.findById(id);

    if (!comment) {
      throw new NotFoundException();
    }

    const subscription = await this.subscriptionService.getSubscription(user, comment);

    if (!subscription) {
      throw new NotFoundException();
    }

    await this.subscriptionService.unsubscribe(subscription);
  }

  @Post()
  @UseGuards(IsAuthenticated)
  @CastToDto(CommentDto)
  @UseInterceptors(PopulateComment)
  async create(@AuthUser() user: User, @Body() dto: CreateCommentDto): Promise<Comment> {
    const commentsArea = await this.commentsAreaService.findById(dto.commentsAreaId);
    let parent: Comment | null = null;

    if (!commentsArea) {
      throw new BadRequestException(`commentsArea with id ${dto.commentsAreaId} does not exists`);
    }

    if (dto.parentId) {
      parent = await this.commentRepository.findOne({ id: dto.parentId });

      // TODO: error format
      if (!parent) {
        throw new BadRequestException(`parent comment with id ${dto.parentId} not found`);
      }
    }

    return this.commentService.create(user, commentsArea, parent, dto.text);
  }

  @Put(':id')
  @UseGuards(IsAuthenticated, IsAuthor)
  @CastToDto(CommentDto)
  @UseInterceptors(PopulateComment)
  async update(@Body() dto: UpdateCommentDto, @Param('id', new ParseIntPipe()) id: number): Promise<Comment> {
    const comment = await this.commentService.findById(id);

    if (!comment) {
      throw new NotFoundException();
    }

    if (comment.message.text === dto.text) {
      throw new BadRequestException('text must have changed');
    }

    return this.commentService.update(comment, dto.text);
  }

  @Post(':id/reaction')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(IsAuthenticated, IsNotAuthor)
  async reaction(
    @AuthUser() user: User,
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: CreateReactionDto,
  ): Promise<void> {
    const comment = await this.commentService.findById(id);

    if (!comment) {
      throw new NotFoundException();
    }

    await this.commentService.setReaction(comment, user, dto.type);
  }

  // TODO: return 204
  @Post(':id/report')
  @UseGuards(IsAuthenticated, IsNotAuthor)
  @CastToDto(CommentDto)
  @UseInterceptors(PopulateComment)
  async report(
    @AuthUser() user: User,
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: CreateReportDto,
  ): Promise<Comment> {
    const comment = await this.commentService.findById(id);

    if (!comment) {
      throw new NotFoundException();
    }

    const report = await this.reportService.didUserReportComment(comment, user);

    // TODO: error format
    if (report) {
      throw new BadRequestException('COMMENT_ALREADY_REPORTED');
    }

    await this.reportService.report(comment, user, dto.message);

    return comment;
  }
}
