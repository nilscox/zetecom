import {
  Controller,
  Get, Post,
  ParseIntPipe,
  Param, Body, Query,
  UseInterceptors, UseGuards,
  ClassSerializerInterceptor,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { SortTypePipe } from 'Common/sort-type.pipe';
import { SortType } from 'Common/sort-type';
import { IsAuthenticated } from 'Common/auth.guard';
import { User as ReqUser } from 'Common/user.decorator';
import { OptionalQuery } from 'Common/optional-query.decorator';
import { Output } from 'Common/output.interceptor';
import { PopulateReaction } from 'Common/populate-reaction.interceptor';

import { User } from '../user/user.entity';
import { Information } from './information.entity';
import { Subject } from '../subject/subject.entity';
import { Reaction } from '../reaction/reaction.entity';

import { InformationService } from './information.service';
import { ReactionRepository } from '../reaction/reaction.repository';

import { SubjectOutDto } from '../subject/dtos/subject-out.dto';
import { CreateInformationInDto } from './dtos/create-information-in.dto';
import { InformationOutDto } from './dtos/information-out.dto';
import { ReactionOutDto } from '../reaction/dtos/reaction-out.dto';

@Controller('information')
@UseInterceptors(ClassSerializerInterceptor)
export class InformationController {

  constructor(
    private readonly informationService: InformationService,
    private readonly reactionRepository: ReactionRepository,
  ) {}

  @Get()
  @Output(InformationOutDto)
  async findAll(
    @OptionalQuery({ key: 'page', defaultValue: '1' }, new ParseIntPipe()) page: number,
  ): Promise<Information[]> {
    return this.informationService.findAll(page);
  }

  @Get(':id')
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
  @Output(ReactionOutDto)
  @UseInterceptors(PopulateReaction)
  async findReactions(
    @Param('id', new ParseIntPipe()) id: number,
    @Query('sort', new SortTypePipe()) sort: SortType,
    @OptionalQuery({ key: 'page', defaultValue: '1' }, new ParseIntPipe()) page: number,
    @OptionalQuery({ key: 'search', defaultValue: '' }) search: string,
  ): Promise<Reaction[]> {
    if (!(await this.informationService.exists(id)))
      throw new NotFoundException();

    return search
      ? this.reactionRepository.searchStandaloneReactions(id, search, sort, page)
      : this.reactionRepository.listStandaloneRootReactions(id, sort, page);
  }

  @Get(':id/subjects')
  @Output(SubjectOutDto)
  async findSubjects(
    @Param('id', new ParseIntPipe()) id: number,
    @OptionalQuery({ key: 'search', defaultValue: '' }) search: string,
    @OptionalQuery({ key: 'page', defaultValue: '1' }, new ParseIntPipe()) page: number,
  ): Promise<Subject[]> {
    if (!(await this.informationService.exists(id)))
      throw new NotFoundException();

    return search
      ? await this.informationService.searchSubjects(id, search, page)
      : await this.informationService.findSubjects(id, page);
  }

  @Post()
  @Output(InformationOutDto)
  @UseGuards(IsAuthenticated)
  async create(
    @Body() dto: CreateInformationInDto,
    @ReqUser() user: User,
  ): Promise<Information> {
    if (await this.informationService.findByUrl(dto.url))
      throw new ConflictException(`An information with url ${dto.url} already exists`);

    return this.informationService.create(dto, user);
  }

}
