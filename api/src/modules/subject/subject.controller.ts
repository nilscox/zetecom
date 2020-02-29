import {
  Body,
  Controller,
  Get,   Inject,
  NotFoundException,
  Param,   ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors } from '@nestjs/common';

import { AuthUser } from 'Common/auth-user.decorator';
import { IsAuthenticated } from 'Common/auth.guard';
import { OptionalQuery } from 'Common/optional-query.decorator';
import { Output, PaginatedOutput } from 'Common/output.interceptor';
import { PageQuery } from 'Common/page-query.decorator';
import { Paginated } from 'Common/paginated';
import { SearchQuery } from 'Common/search-query.decorator';
import { SortType } from 'Common/sort-type';
import { SortTypePipe } from 'Common/sort-type.pipe';

import { InformationService } from '../information/information.service';
import { ReactionOutDto } from '../reaction/dtos/reaction-out.dto';
import { PopulateReaction } from '../reaction/populate-reaction.interceptor';
import { Reaction } from '../reaction/reaction.entity';
import { ReactionRepository } from '../reaction/reaction.repository';
import { User } from '../user/user.entity';

import { CreateSubjectInDto } from './dtos/create-subject-in.dto';
import { SubjectOutDto } from './dtos/subject-out.dto';
import { PopulateSubject } from './populate-subject.interceptor';
import { Subject } from './subject.entity';
import { SubjectService } from './subject.service';

@Controller('/subject')
export class SubjectController {

  @Inject('REACTION_PAGE_SIZE')
  private readonly reactionPageSize: number;

  constructor(
    private readonly informationService: InformationService,
    private readonly subjectService: SubjectService,
    private readonly reactionRepository: ReactionRepository,
  ) {}

  @Get(':id')
  @UseInterceptors(PopulateSubject)
  @Output(SubjectOutDto)
  async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Subject> {
    return this.subjectService.findById(id);
  }

  @Get(':id/reactions')
  @UseInterceptors(PopulateReaction)
  @PaginatedOutput(ReactionOutDto)
  async findReactions(
    @Param('id', new ParseIntPipe()) id: number,
    @OptionalQuery({ key: 'sort', defaultValue: 'date-desc' }, new SortTypePipe()) sort: SortType,
    @SearchQuery() search: string,
    @PageQuery() page: number,
  ): Promise<Paginated<Reaction>> {
    const subject = await this.subjectService.findById(id);

    if (!subject)
      throw new NotFoundException(`subject with id ${id} not found`);

    return search
      ? this.reactionRepository.searchInSubject(subject.id, search, sort, page, this.reactionPageSize)
      : this.reactionRepository.findRootReactionsForSubject(subject.id, sort, page, this.reactionPageSize);
  }

  @Post()
  @UseGuards(IsAuthenticated)
  @UseInterceptors(PopulateSubject)
  @Output(SubjectOutDto)
  async create(
    @Body() dto: CreateSubjectInDto,
    @AuthUser() user: User,
  ): Promise<Subject> {
    const information = await this.informationService.findById(dto.informationId);

    if (!information)
      throw new NotFoundException(`information with id ${dto.informationId} not found`);

    return this.subjectService.create(dto, user, information);
  }

}
