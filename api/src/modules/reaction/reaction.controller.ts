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
import { ReactionSubscriptionService } from '../subscription/subscription.service';
import { User } from '../user/user.entity';

import { CreateReactionInDto } from './dtos/create-reaction-in.dto';
import { QuickReactionInDto } from './dtos/quick-reaction-in.dto';
import { UpdateReactionInDto } from './dtos/update-reaction-in.dto';
import { PopulateReaction } from './populate-reaction.interceptor';
import { Reaction } from './reaction.entity';
import { ReactionRepository } from './reaction.repository';
import { ReactionService } from './reaction.service';

@Controller('/reaction')
@UseInterceptors(ClassToPlainInterceptor)
export class ReactionController {

  @Inject('REACTION_PAGE_SIZE')
  private readonly reactionPageSize: number;

  constructor(
    private readonly informationService: InformationService,
    private readonly reactionService: ReactionService,
    private readonly subscriptionService: ReactionSubscriptionService,
    private readonly reportService: ReportService,
    private readonly reactionRepository: ReactionRepository,
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
    const results = await this.reactionRepository.findForUser(user.id, search, page, this.reactionPageSize);
    const informations = await this.informationService.findByIds([...new Set(results.items.map(({ informationId }) => informationId))]);
    const reactions = await this.reactionRepository.findAll(results.items.map(({ reactionId }) => reactionId), { author: false });

    informations.forEach(info => {
      info.reactions = results.items
        .filter(({ informationId }) => informationId === info.id)
        .map(({ reactionId }) => reactions.find(({ id }) => id === reactionId));
    });

    return { items: informations, total: results.total };
  }

  @Get(':id')
  @UseInterceptors(PopulateReaction)
  async findOneById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Reaction> {
    const reaction = await this.reactionService.findById(id);

    if (!reaction)
      throw new NotFoundException();

    return reaction;
  }

  @Get(':id/replies')
  @UseInterceptors(PopulateReaction)
  async findReplies(
    @Param('id', new ParseIntPipe()) id: number,
    @PageQuery() page: number,
  ): Promise<Paginated<Reaction>> {
    if (!(await this.reactionRepository.exists(id)))
      throw new NotFoundException();

    return this.reactionRepository.findReplies(id, page, this.reactionPageSize);
  }

  @Post(':id/subscribe')
  @UseGuards(IsAuthenticated)
  async subscribe(
    @AuthUser() user: User,
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<void> {
    const reaction = await this.reactionService.findById(id);

    if (!reaction)
      throw new NotFoundException();

    const subscription = await this.subscriptionService.getSubscription(user, reaction);

    if (subscription)
      throw new ConflictException('already subscribed to reaction ' + reaction.id);

    await this.subscriptionService.subscribe(user, reaction);
  }

  @Post(':id/unsubscribe')
  @UseGuards(IsAuthenticated)
  @HttpCode(HttpStatus.NO_CONTENT)
  async unsubscribe(
    @AuthUser() user: User,
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<void> {
    const reaction = await this.reactionService.findById(id);

    if (!reaction)
      throw new NotFoundException();

    const subscription = await this.subscriptionService.getSubscription(user, reaction);

    if (!subscription)
      throw new NotFoundException();

    await this.subscriptionService.unsubscribe(subscription);
  }

  @Post()
  @UseGuards(IsAuthenticated)
  @UseInterceptors(PopulateReaction)
  async create(
    @AuthUser() user: User,
    @Body() dto: CreateReactionInDto,
  ): Promise<Reaction> {
    const information = await this.informationService.findById(dto.informationId);

    if (!information)
      throw new BadRequestException(`information with id ${dto.informationId} does not exists`);

    return this.reactionService.create(dto, user, information);
  }

  @Put(':id')
  @UseGuards(IsAuthenticated, IsAuthor)
  @UseInterceptors(PopulateReaction)
  async update(
    @Body() dto: UpdateReactionInDto,
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Reaction> {
    const reaction = await this.reactionService.findById(id);

    if (!reaction)
      throw new NotFoundException();

    return this.reactionService.update(reaction, dto);
  }

  @Post(':id/quick-reaction')
  @UseGuards(IsAuthenticated, IsNotAuthor)
  @UseInterceptors(PopulateReaction)
  async quickReaction(
    @AuthUser() user: User,
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: QuickReactionInDto,
  ): Promise<Reaction> {
    const reaction = await this.reactionService.findById(id);

    if (!reaction)
      throw new NotFoundException();

    await this.reactionService.setQuickReaction(reaction, user, dto.type);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return (await this.reactionService.findById(reaction.id))!;
  }

  @Post(':id/report')
  @UseGuards(IsAuthenticated, IsNotAuthor)
  @UseInterceptors(PopulateReaction)
  async report(
    @AuthUser() user: User,
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: ReportInDto,
  ): Promise<Reaction> {
    const reaction = await this.reactionService.findById(id);

    if (!reaction)
      throw new NotFoundException();

    const report = await this.reportService.didUserReportReaction(reaction, user);

    if (report)
      throw new BadRequestException('REACTION_ALREADY_REPORTED');

    await this.reportService.report(reaction, user, dto.message);

    return reaction;
  }

}
