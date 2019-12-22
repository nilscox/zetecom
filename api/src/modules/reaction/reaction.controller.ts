import {
  Controller,
  Get, Post, Put,
  Param, Body,
  ParseIntPipe,
  UseInterceptors, UseGuards,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
  SetMetadata,
  Inject,
} from '@nestjs/common';

import { IsAuthenticated } from 'Common/auth.guard';
import { IsAuthor, IsNotAuthor } from 'Common/is-author.guard';
import { User as ReqUser } from 'Common/user.decorator';
import { OptionalQuery } from 'Common/optional-query.decorator';
import { Output, PaginatedOutput } from 'Common/output.interceptor';
import { PopulateReaction } from 'Common/populate-reaction.interceptor';

import { User } from '../user/user.entity';
import { Reaction } from './reaction.entity';
import { Subject } from '../subject/subject.entity';

import { ReactionService } from './reaction.service';
import { ReactionRepository } from './reaction.repository';
import { SubjectService } from '../subject/subject.service';
import { ReportService } from '../report/report.service';

import { CreateReactionInDto } from './dtos/create-reaction-in.dto';
import { UpdateReactionInDto } from './dtos/update-reaction-in.dto';
import { ReactionOutDto } from './dtos/reaction-out.dto';
import { ReactionWithHistoryOutDto } from './dtos/reaction-with-history-out.dto';
import { QuickReactionInDto } from './dtos/quick-reaction-in.dto';
import { ReportInDto } from '../report/dtos/report-in.dto';
import { Paginated } from 'Common/paginated';
import { SortType } from 'Common/sort-type';
import { InformationService } from '../information/information.service';

@Controller('/reaction')
export class ReactionController {

  @Inject('REACTION_PAGE_SIZE')
  private readonly reactionPageSize: number;

  constructor(
    private readonly informationService: InformationService,
    private readonly subjectService: SubjectService,
    private readonly reactionService: ReactionService,
    private readonly reportService: ReportService,
    private readonly reactionRepository: ReactionRepository,
  ) {}

  @Get('me')
  @PaginatedOutput(ReactionOutDto)
  @UseInterceptors(PopulateReaction)
  @UseGuards(IsAuthenticated)
  async findForUser(
    @OptionalQuery({ key: 'page', defaultValue: '1' }, new ParseIntPipe()) page: number,
    @ReqUser() user: User,
  ): Promise<Paginated<Reaction>> {
    return this.reactionRepository.findForUser(user.id, SortType.DATE_DESC, page, this.reactionPageSize);
  }

  @Get(':id')
  @UseInterceptors(PopulateReaction)
  @Output(ReactionWithHistoryOutDto)
  async findOneById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Reaction> {
    return this.reactionService.findById(id);
  }

  @Get(':id/replies')
  @PaginatedOutput(ReactionOutDto)
  @UseInterceptors(PopulateReaction)
  async findReplies(
    @Param('id', new ParseIntPipe()) id: number,
    @OptionalQuery({ key: 'page', defaultValue: '1' }, new ParseIntPipe()) page: number,
  ): Promise<Paginated<Reaction>> {
    if (!(await this.reactionRepository.exists(id)))
      throw new NotFoundException();

    return this.reactionRepository.findReplies(id, page, this.reactionPageSize);
  }

  @Post()
  @Output(ReactionOutDto)
  @UseInterceptors(PopulateReaction)
  @UseGuards(IsAuthenticated)
  async create(
    @Body() dto: CreateReactionInDto,
    @ReqUser() user: User,
  ): Promise<Reaction> {
    const information = await this.informationService.findById(dto.informationId);

    if (!information)
      throw new BadRequestException(`information with id ${dto.informationId} does not exists`);

    let subject: Subject = null;

    if (dto.subjectId !== undefined) {
      subject = await this.subjectService.findById(dto.subjectId);

      if (!subject)
        throw new BadRequestException(`subject with id ${dto.subjectId} does not exist`);

      if (subject.information.id !== information.id)
        throw new BadRequestException(`subject with id ${dto.subjectId} does not belong to the information with id ${dto.informationId}`);
    }

    return this.reactionService.create(dto, user, information, subject);
  }

  @Put(':id')
  @Output(ReactionWithHistoryOutDto)
  @UseInterceptors(PopulateReaction)
  @UseGuards(IsAuthenticated, IsAuthor)
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: UpdateReactionInDto,
  ): Promise<Reaction> {
    const reaction = await this.reactionService.findById(id);

    if (!reaction)
      throw new NotFoundException();

    return this.reactionService.update(reaction, dto);
  }

  @Post(':id/quick-reaction')
  @Output(ReactionOutDto)
  @UseInterceptors(PopulateReaction)
  @UseGuards(IsAuthenticated, IsNotAuthor)
  async quickReaction(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: QuickReactionInDto,
    @ReqUser() user: User,
  ): Promise<Reaction> {
    const reaction = await this.reactionService.findById(id);

    if (!reaction)
      throw new NotFoundException();

    await this.reactionService.setQuickReaction(reaction, user, dto.type);

    return this.reactionService.findById(reaction.id);
  }

  @Post(':id/report')
  @Output(ReactionOutDto)
  @UseInterceptors(PopulateReaction)
  @UseGuards(IsAuthenticated, IsNotAuthor)
  async report(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: ReportInDto,
    @ReqUser() user: User,
  ): Promise<Reaction> {
    const reaction = await this.reactionService.findById(id);

    if (!reaction)
      throw new NotFoundException();

    const report = await this.reportService.didUserReportReaction(reaction, user);

    if (report)
      throw new BadRequestException('REACTION_ALREADY_REPORTED');

    await this.reportService.report(reaction, user, dto.type, dto.message);

    return reaction;
  }

}
