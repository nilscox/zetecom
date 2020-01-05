import {
  Controller,
  Get, Post,
  Param, Body,
  ParseIntPipe,
  UseInterceptors, UseGuards,
  NotFoundException,
  Inject,
} from '@nestjs/common';

import { SortType } from 'Common/sort-type';
import { IsAuthenticated } from 'Common/auth.guard';
import { User as ReqUser } from 'Common/user.decorator';
import { OptionalQuery } from 'Common/optional-query.decorator';
import { SortTypePipe } from 'Common/sort-type.pipe';
import { Output, PaginatedOutput } from 'Common/output.interceptor';
import { PopulateReaction } from 'Common/populate-reaction.interceptor';

import { User } from '../user/user.entity';
import { InformationService } from '../information/information.service';
import { Reaction } from '../reaction/reaction.entity';
import { ReactionOutDto } from '../reaction/dtos/reaction-out.dto';

import { Subject } from './subject.entity';
import { SubjectService } from './subject.service';
import { CreateSubjectInDto } from './dtos/create-subject-in.dto';
import { SubjectOutDto } from './dtos/subject-out.dto';
import { ReactionRepository } from '../reaction/reaction.repository';
import { PopulateSubject } from 'Common/populate-subject.interceptor';
import { Paginated } from 'Common/paginated';
import { PageQuery } from 'Common/page-query.decorator';
import { SearchQuery } from 'Common/search-query.decorator';

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
    @ReqUser() user: User,
  ): Promise<Subject> {
    const information = await this.informationService.findById(dto.informationId);

    if (!information)
      throw new NotFoundException(`information with id ${dto.informationId} not found`);

    return this.subjectService.create(dto, user, information);
  }

}
