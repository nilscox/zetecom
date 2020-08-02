import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post, Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthUser } from 'Common/auth-user.decorator';
import { IsAuthenticated } from 'Common/auth.guard';
import { ClassToPlainInterceptor } from 'Common/ClassToPlain.interceptor';
import { IsAuthor, IsNotAuthor } from 'Common/is-author.guard';
import { OptionalParseIntPipe } from 'Common/optional-parse-int.pipe';
import { OptionalQuery } from 'Common/optional-query.decorator';
import { PageQuery } from 'Common/page-query.decorator';
import { Paginated } from 'Common/paginated';
import { SearchQuery } from 'Common/search-query.decorator';

import { Information } from '../information/information.entity';
import { InformationService } from '../information/information.service';
import { PopulateInformation } from '../information/populate-information.interceptor';
import { ReportInDto } from '../report/dtos/report-in.dto';
import { ReportService } from '../report/report.service';
import { CommentSubscriptionService } from '../subscription/subscription.service';
import { User } from '../user/user.entity';

import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { ReactionInDto } from './dtos/reaction-in.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { PopulateComment } from './populate-comment.interceptor';

@Controller('/comment')
@UseInterceptors(ClassToPlainInterceptor)
export class CommentController {

  @Inject('COMMENT_PAGE_SIZE')
  private readonly commentPageSize: number;

  constructor(
    private readonly informationService: InformationService,
    private readonly commentService: CommentService,
    private readonly subscriptionService: CommentSubscriptionService,
    private readonly reportService: ReportService,
    private readonly commentRepository: CommentRepository,
  ) {}

  @Get('me')
  @UseGuards(IsAuthenticated)
  @UseInterceptors(PopulateInformation)
  async findForUser(
    @AuthUser() user: User,
    @OptionalQuery({ key: 'informationId' }, OptionalParseIntPipe) informationId: number | undefined,
    @SearchQuery() search: string,
    @PageQuery() page: number,
  ): Promise<Paginated<Information>> {
    const results = await this.commentRepository.findForUser(user.id, search, page, this.commentPageSize);

    if (results.total === 0)
      return { items: [], total: 0 };

    const informations = await this.informationService.findByIds([...new Set(results.items.map(({ informationId }) => informationId))]);
    const comments = await this.commentRepository.findAll(results.items.map(({ commentId }) => commentId), { author: false });

    informations.forEach(info => {
      info.comments = results.items
        .filter(({ informationId }) => informationId === info.id)
        .map(({ commentId }) => comments.find(({ id }) => id === commentId));
    });

    return { items: informations, total: results.total };
  }

  @Get(':id')
  @UseInterceptors(PopulateComment)
  async findOneById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Comment> {
    const comment = await this.commentService.findById(id);

    if (!comment)
      throw new NotFoundException();

    return comment;
  }

  @Get(':id/replies')
  @UseInterceptors(PopulateComment)
  async findReplies(
    @Param('id', new ParseIntPipe()) id: number,
    @PageQuery() page: number,
  ): Promise<Paginated<Comment>> {
    if (!(await this.commentRepository.exists(id)))
      throw new NotFoundException();

    return this.commentRepository.findReplies(id, page, this.commentPageSize);
  }

  @Post(':id/subscribe')
  @UseGuards(IsAuthenticated)
  async subscribe(
    @AuthUser() user: User,
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<void> {
    const comment = await this.commentService.findById(id);

    if (!comment)
      throw new NotFoundException();

    const subscription = await this.subscriptionService.getSubscription(user, comment);

    // TODO: error format
    if (subscription)
      throw new ConflictException('already subscribed to comment ' + comment.id);

    await this.subscriptionService.subscribe(user, comment);
  }

  @Post(':id/unsubscribe')
  @UseGuards(IsAuthenticated)
  @HttpCode(HttpStatus.NO_CONTENT)
  async unsubscribe(
    @AuthUser() user: User,
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<void> {
    const comment = await this.commentService.findById(id);

    if (!comment)
      throw new NotFoundException();

    const subscription = await this.subscriptionService.getSubscription(user, comment);

    if (!subscription)
      throw new NotFoundException();

    await this.subscriptionService.unsubscribe(subscription);
  }

  @Post()
  @UseGuards(IsAuthenticated)
  @UseInterceptors(PopulateComment)
  async create(
    @AuthUser() user: User,
    @Body() dto: CreateCommentDto,
  ): Promise<Comment> {
    const information = await this.informationService.findById(dto.informationId);

    if (!information)
      throw new BadRequestException(`information with id ${dto.informationId} does not exists`);

    return this.commentService.create(dto, user, information);
  }

  @Put(':id')
  @UseGuards(IsAuthenticated, IsAuthor)
  @UseInterceptors(PopulateComment)
  async update(
    @Body() dto: UpdateCommentDto,
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Comment> {
    const comment = await this.commentService.findById(id);

    if (!comment)
      throw new NotFoundException();

    return this.commentService.update(comment, dto);
  }

  @Post(':id/reaction')
  @UseGuards(IsAuthenticated, IsNotAuthor)
  @UseInterceptors(PopulateComment)
  async reaction(
    @AuthUser() user: User,
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: ReactionInDto,
  ): Promise<Comment> {
    const comment = await this.commentService.findById(id);

    if (!comment)
      throw new NotFoundException();

    await this.commentService.setReaction(comment, user, dto.type);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return (await this.commentService.findById(comment.id))!;
  }

  @Post(':id/report')
  @UseGuards(IsAuthenticated, IsNotAuthor)
  @UseInterceptors(PopulateComment)
  async report(
    @AuthUser() user: User,
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: ReportInDto,
  ): Promise<Comment> {
    const comment = await this.commentService.findById(id);

    if (!comment)
      throw new NotFoundException();

    const report = await this.reportService.didUserReportComment(comment, user);

    // TODO: error format
    if (report)
      throw new BadRequestException('COMMENT_ALREADY_REPORTED');

    await this.reportService.report(comment, user, dto.message);

    return comment;
  }

}
