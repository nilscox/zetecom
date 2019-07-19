import {
  Injectable,
  Controller,
  Get, Post, Put,
  Query, Param, Body,
  ParseIntPipe,
  UseInterceptors, UseGuards,
  ClassSerializerInterceptor,
  NotFoundException,
  UnauthorizedException,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  SetMetadata,
} from '@nestjs/common';

import { ReactionSortType } from 'Utils/reaction-sort-type';
import { IsAuthenticated } from 'Common/auth.guard';
import { IsAuthor } from 'Common/is-author.guard';
import { User as ReqUser } from 'Common/user.decorator';
import { OptionalQuery } from 'Common/optional-query.decorator';
import { ReactionSortTypePipe } from 'Common/reaction-sort-type.pipe';
import { Output } from 'Common/output.interceptor';
import { PopulateReaction } from 'Common/populate-reaction.interceptor';

import { User } from '../user/user.entity';
import { Information } from '../information/information.entity';
import { InformationService } from '../information/information.service';

import { Reaction } from './reaction.entity';
import { ReactionService } from './reaction.service';
import { QuickReactionType } from './quick-reaction.entity';
import { CreateReactionInDto, CreateMainReactionInDto } from './dtos/create-reaction-in.dto';
import { UpdateReactionInDto } from './dtos/update-reaction-in.dto';
import { ReactionOutDto } from './dtos/reaction-out.dto';
import { ReactionWithHistoryOutDto } from './dtos/reaction-with-history-out.dto';
import { QuickReactionInDto } from './dtos/quick-reaction-in.dto';
import { ReportInDto } from './dtos/report-in.dto';

@Controller('/reaction')
export class ReactionController {

  constructor(
    private readonly informationService: InformationService,
    private readonly reactionService: ReactionService,
  ) {}

  @Get(':id')
  @Output(ReactionWithHistoryOutDto)
  @UseInterceptors(PopulateReaction)
  async findOneById(
    @Param('id', new ParseIntPipe()) id: number,
    @ReqUser() user?: User,
  ): Promise<Reaction> {
    return this.reactionService.findOne({ id });
  }

  @Get('by-slug/:slug')
  @Output(ReactionOutDto)
  @UseInterceptors(PopulateReaction)
  async findOneBySlug(
    @Param('slug') slug: string,
  ): Promise<Reaction> {
    return this.reactionService.findOne({ slug });
  }

  @Get(':id/replies')
  @Output(ReactionOutDto)
  @UseInterceptors(PopulateReaction)
  async findReplies(
    @Param('id', new ParseIntPipe()) id: number,
    @Query('sort', new ReactionSortTypePipe()) sort: ReactionSortType,
    @OptionalQuery({ key: 'page', defaultValue: '1' }, new ParseIntPipe()) page: number,
  ): Promise<Reaction[]> {
    const replies = await this.reactionService.findReplies(id);

    if (!replies)
      throw new NotFoundException();

    return replies;
  }

  @Post()
  @Output(ReactionOutDto)
  @UseInterceptors(PopulateReaction)
  @UseGuards(IsAuthenticated)
  async create(
    @Body() dto: CreateMainReactionInDto,
    @ReqUser() user: User,
  ): Promise<Reaction> {
    return this.reactionService.create(dto, user);
  }

  @Post(':parentId')
  @Output(ReactionOutDto)
  @UseInterceptors(PopulateReaction)
  @UseGuards(IsAuthenticated)
  async createChildren(
    @Body() dto: CreateReactionInDto,
    @ReqUser() user: User,
    @Param('parentId', new ParseIntPipe()) parentId: number,
  ): Promise<Reaction> {
    return this.reactionService.create(dto, user, parentId);
  }

  @Put(':id')
  @Output(ReactionWithHistoryOutDto)
  @UseInterceptors(PopulateReaction)
  @UseGuards(IsAuthenticated)
  @UseGuards(IsAuthor)
  @SetMetadata('reactionIdParam', 'id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: UpdateReactionInDto,
    @ReqUser() user: User,
  ): Promise<Reaction> {
    const reaction = await this.reactionService.findOne(id);

    if (!reaction)
      throw new NotFoundException();

    return this.reactionService.update(reaction, dto);
  }

  @Post(':id/quick-reaction')
  @Output(ReactionOutDto)
  @UseInterceptors(PopulateReaction)
  @UseGuards(IsAuthenticated)
  async quickReaction(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: QuickReactionInDto,
    @ReqUser() user: User,
  ): Promise<Reaction> {
    const reaction = await this.reactionService.findOne(id);

    if (!reaction)
      throw new NotFoundException();

    await this.reactionService.setQuickReaction(reaction, user, dto.type);

    // TODO: wtf?!
    return this.reactionService.findOne({ reactionId: reaction.id });
  }

  @Post(':id/report')
  @Output(ReactionOutDto)
  @UseInterceptors(PopulateReaction)
  @UseGuards(IsAuthenticated)
  async report(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: ReportInDto,
    @ReqUser() user: User,
  ): Promise<Reaction> {
    const reaction = await this.reactionService.findOne(id);

    if (!reaction)
      throw new NotFoundException();

    const report = await this.reactionService.findReport(reaction, user);

    if (report)
      throw new BadRequestException('REACTION_ALREADY_REPORTED');

    await this.reactionService.report(reaction, user, dto.type, dto.message);

    return reaction;
  }

}
