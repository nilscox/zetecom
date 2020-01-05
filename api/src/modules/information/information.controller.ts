import {
  Controller,
  Get, Post,
  ParseIntPipe,
  Param, Body,
  UseInterceptors, UseGuards,
  ClassSerializerInterceptor,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';

import { SortTypePipe } from 'Common/sort-type.pipe';
import { SortType } from 'Common/sort-type';
import { IsAuthenticated } from 'Common/auth.guard';
import { AuthUser } from 'Common/auth-user.decorator';
import { OptionalQuery } from 'Common/optional-query.decorator';
import { Output, PaginatedOutput } from 'Common/output.interceptor';
import { PopulateReaction } from '../reaction/populate-reaction.interceptor';
import { Paginated } from 'Common/paginated';

import { User } from '../user/user.entity';
import { Information } from './information.entity';
import { Subject } from '../subject/subject.entity';
import { Reaction } from '../reaction/reaction.entity';

import { InformationService } from './information.service';
import { InformationRepository } from './information.repository';
import { SubjectRepository } from '../subject/subject.repository';
import { ReactionRepository } from '../reaction/reaction.repository';

import { SubjectOutDto } from '../subject/dtos/subject-out.dto';
import { CreateInformationInDto } from './dtos/create-information-in.dto';
import { InformationOutDto } from './dtos/information-out.dto';
import { ReactionOutDto } from '../reaction/dtos/reaction-out.dto';
import { PopulateSubject } from 'src/modules/subject/populate-subject.interceptor';
import { PopulateInformation } from 'src/modules/information/populate-information.interceptor';
import { PageQuery } from 'Common/page-query.decorator';
import { SearchQuery } from 'Common/search-query.decorator';

@Controller('information')
@UseInterceptors(ClassSerializerInterceptor)
export class InformationController {

  @Inject('INFORMATION_PAGE_SIZE')
  private readonly informationPageSize: number;

  @Inject('SUBJECT_PAGE_SIZE')
  private readonly subjectPageSize: number;

  @Inject('REACTION_PAGE_SIZE')
  private readonly reactionPageSize: number;

  constructor(
    private readonly informationService: InformationService,
    private readonly informationRepository: InformationRepository,
    private readonly subjectRepository: SubjectRepository,
    private readonly reactionRepository: ReactionRepository,
  ) {}

  @Get()
  @UseInterceptors(PopulateInformation)
  @PaginatedOutput(InformationOutDto)
  async findAll(
    @PageQuery() page: number,
  ): Promise<Paginated<Information>> {
    return this.informationRepository.findAllPaginated(page, this.informationPageSize);
  }

  @Get(':id')
  @UseInterceptors(PopulateInformation)
  @Output(InformationOutDto)
  async findOneById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Information> {
    const info = await this.informationService.findById(id);

    if (!info)
      throw new NotFoundException();

    return info;
  }

  @Get('by-url/:url')
  @UseInterceptors(PopulateInformation)
  @Output(InformationOutDto)
  async findOneByUrl(
    @Param('url') url: string,
  ): Promise<Information> {
    const info = await this.informationService.findByUrl(decodeURIComponent(url));

    if (!info)
      throw new NotFoundException();

    return info;
  }

  @Get('by-youtubeId/:youtubeId')
  @UseInterceptors(PopulateInformation)
  @Output(InformationOutDto)
  async findOneByYoutubeId(
    @Param('youtubeId') youtubeId: string,
  ): Promise<Information> {
    const info = await this.informationService.findByYoutubeId(youtubeId);

    if (!info)
      throw new NotFoundException();

    return info;
  }

  @Get(':id/reactions')
  @UseInterceptors(PopulateReaction)
  @PaginatedOutput(ReactionOutDto)
  async findReactions(
    @Param('id', new ParseIntPipe()) id: number,
    @OptionalQuery({ key: 'sort', defaultValue: SortType.DATE_DESC }, new SortTypePipe()) sort: SortType,
    @SearchQuery() search: string,
    @PageQuery() page: number,
  ): Promise<Paginated<Reaction>> {
    if (!(await this.informationService.exists(id)))
      throw new NotFoundException();

    return search
      ? this.reactionRepository.search(id, search, sort, page, this.reactionPageSize)
      : this.reactionRepository.findRootReactions(id, sort, page, this.reactionPageSize);
  }

  @Get(':id/subjects')
  @UseInterceptors(PopulateSubject)
  @PaginatedOutput(SubjectOutDto)
  async findSubjects(
    @Param('id', new ParseIntPipe()) id: number,
    @SearchQuery() search: string,
    @PageQuery() page: number,
  ): Promise<{ items: Subject[], total: number }> {
    if (!(await this.informationService.exists(id)))
      throw new NotFoundException();

    return search
      ? await this.subjectRepository.search(id, search, page, this.subjectPageSize)
      : await this.subjectRepository.findAllPaginated(id, page, this.subjectPageSize);
  }

  @Post()
  @UseGuards(IsAuthenticated)
  @UseInterceptors(PopulateInformation)
  @Output(InformationOutDto)
  async create(
    @Body() dto: CreateInformationInDto,
    @AuthUser() user: User,
  ): Promise<Information> {
    if (await this.informationService.findByUrl(dto.url))
      throw new ConflictException(`An information with url ${dto.url} already exists`);

    return this.informationService.create(dto, user);
  }

}
