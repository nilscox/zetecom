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

import { IsAuthenticated } from 'Common/auth.guard';
import { User as ReqUser } from 'Common/user.decorator';
import { OptionalQuery } from 'Common/optional-query.decorator';

import { User } from 'User/entities/user.entity';

import { InformationService, FindInformationOpts } from '../services/information.service';
import { Information } from '../entities/information.entity';
import { CreateInformationDto } from '../dtos/CreateInformationDto';

@Controller('information')
@UseInterceptors(ClassSerializerInterceptor)
export class InformationController {

  constructor(
    private readonly informationService: InformationService,
  ) {}

  @Get()
  async findAll(
    @OptionalQuery({ key: 'page', defaultValue: '1' }, new ParseIntPipe()) page: number,
  ): Promise<Information[]> {
    return await this.informationService.findAll({ page });
  }

  async findOne(where, opts?: FindInformationOpts): Promise<Information> {
    const information = await this.informationService.findOne(where, {
      creator: true,
      ...opts,
    });

    if (!information)
      throw new NotFoundException();

    return information;
  }

  @Get(':id')
  async findOneById(
    @Param('id', new ParseIntPipe()) id: number,
    @OptionalQuery({ key: 'page', defaultValue: '1' }, new ParseIntPipe()) page: number,
  ): Promise<Information> {
    return await this.findOne({ id }, { rootReactions: true, reactionsPage: page });
  }

  @Get('by-slug/:slug')
  async findOneBySlug(
    @Param('slug') slug: string,
  ): Promise<Information> {
    return await this.findOne({ slug });
  }

  @Get('by-youtubeId/:youtubeId')
  async findOneByYoutubeId(
    @Param('youtubeId') youtubeId: string,
  ): Promise<Information> {
    return await this.findOne({ youtubeId });
  }

  @Post()
  @UseGuards(IsAuthenticated)
  async create(
    @Body() createInformationDto: CreateInformationDto,
    @ReqUser() user: User,
  ): Promise<Information> {
    return await this.informationService.create(createInformationDto, user);
  }

}
