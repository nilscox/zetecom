import {
  Controller,
  Get, Post,
  ParseIntPipe,
  Param, Body, Query,
  UseInterceptors, UseGuards,
  ClassSerializerInterceptor,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { SortTypePipe } from 'Common/sort-type.pipe';
import { SortType } from 'Common/sort-type';
import { IsAuthenticated } from 'Common/auth.guard';
import { User as ReqUser } from 'Common/user.decorator';
import { OptionalQuery } from 'Common/optional-query.decorator';
import { Output } from 'Common/output.interceptor';
import { PopulateReaction } from 'Common/populate-reaction.interceptor';

import { User } from '../user/user.entity';
import { Subject } from '../subject/subject.entity';
import { SubjectOutDto } from '../subject/dtos/subject-out.dto';

import { InformationService } from './information.service';
import { Information } from './information.entity';
import { CreateInformationInDto } from './dtos/create-information-in.dto';
import { InformationOutDto } from './dtos/information-out.dto';

@Controller('information')
@UseInterceptors(ClassSerializerInterceptor)
export class InformationController {

  constructor(
    private readonly informationService: InformationService,
  ) {}

  @Get()
  @Output(InformationOutDto)
  async findAll(): Promise<Information[]> {
    return this.informationService.findAll();
  }

  // TODO: handle 404
  @Get(':id')
  @Output(InformationOutDto)
  async findOneById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Information> {
    return this.informationService.findOne({ id });
  }

  @Get('by-youtubeId/:youtubeId')
  @Output(InformationOutDto)
  async findOneByYoutubeId(
    @Param('youtubeId') youtubeId: string,
  ): Promise<Information> {
    const info = await this.informationService.findOne({ youtubeId });

    if (!info)
      throw new NotFoundException();

    return info;
  }

  @Get(':id/subjects')
  @Output(SubjectOutDto)
  async findSubjects(
    @Param('id', new ParseIntPipe()) id: number,
    @Query('sort', new SortTypePipe()) sort: SortType,
    @OptionalQuery({ key: 'page', defaultValue: '1' }, new ParseIntPipe()) page: number,
    @ReqUser() user: User,
  ): Promise<Subject[]> {
    const information = await this.informationService.findOne({ id });

    if (!information)
      return null;

    return this.informationService.findSubjects(information, sort, page);
  }

  @Post()
  @Output(InformationOutDto)
  @UseGuards(IsAuthenticated)
  async create(
    @Body() dto: CreateInformationInDto,
    @ReqUser() user: User,
  ): Promise<Information> {
    return this.informationService.create(dto, user);
  }

}
