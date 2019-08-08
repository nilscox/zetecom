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

import { SortType } from 'Common/sort-type';
import { IsAuthenticated } from 'Common/auth.guard';
import { IsAuthor } from 'Common/is-author.guard';
import { User as ReqUser } from 'Common/user.decorator';
import { OptionalQuery } from 'Common/optional-query.decorator';
import { SortTypePipe } from 'Common/sort-type.pipe';
import { Output } from 'Common/output.interceptor';
import { PopulateReaction } from 'Common/populate-reaction.interceptor';

import { User } from '../user/user.entity';
import { Information } from '../information/information.entity';
import { SubjectService } from '../subject/subject.service';

import { Reaction } from './reaction.entity';
import { ReactionService } from './reaction.service';
import { QuickReactionType } from './quick-reaction.entity';
import { CreateReactionInDto } from './dtos/create-reaction-in.dto';
import { UpdateReactionInDto } from './dtos/update-reaction-in.dto';
import { ReactionOutDto } from './dtos/reaction-out.dto';
import { ReactionWithHistoryOutDto } from './dtos/reaction-with-history-out.dto';
import { QuickReactionInDto } from './dtos/quick-reaction-in.dto';
import { ReportInDto } from './dtos/report-in.dto';

@Controller('/reaction')
export class ReactionController {

  constructor(
    private readonly subjectService: SubjectService,
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

  @Get(':id/replies')
  @Output(ReactionOutDto)
  @UseInterceptors(PopulateReaction)
  async findReplies(
    @Param('id', new ParseIntPipe()) id: number,
    @Query('sort', new SortTypePipe()) sort: SortType,
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
    @Body() dto: CreateReactionInDto,
    @ReqUser() user: User,
  ): Promise<Reaction> {
    const subject = await this.subjectService.findById(dto.subjectId);

    if (!subject)
      throw new NotFoundException(`subject with id ${dto.subjectId} not found`);

    return this.reactionService.create(dto, user, subject);
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

    return this.reactionService.findOne({ id: reaction.id });
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
