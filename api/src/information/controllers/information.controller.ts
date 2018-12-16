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

import { InformationService, ReactionsCountByLabel } from '../services/information.service';
import { Information } from '../entities/information.entity';
import { Reaction } from '../entities/reaction.entity';
import { CreateInformationDto } from '../dtos/CreateInformationDto';

@Controller('information')
@UseInterceptors(ClassSerializerInterceptor)
export class InformationController {

  constructor(
    private readonly informationService: InformationService,
  ) {}

  @Get()
  async findAll(): Promise<Information[]> {
    return await this.informationService.findAll();
  }

  // TODO: handle 404
  @Get(':id')
  async findOneById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Information> {
    return await this.informationService.findOne({ id });
  }

  @Get('by-slug/:slug')
  async findOneBySlug(
    @Param('slug') slug: string,
  ): Promise<Information> {
    return await this.informationService.findOne({ slug });
  }

  @Get('by-youtubeId/:youtubeId')
  async findOneByYoutubeId(
    @Param('youtubeId') youtubeId: string,
  ): Promise<Information> {
    return await this.informationService.findOne({ youtubeId });
  }

  @Get(':id/reactions')
  async findRootReactions(
    @Param('id', new ParseIntPipe()) id: number,
    @OptionalQuery({ key: 'page', defaultValue: '1' }, new ParseIntPipe()) page: number,
  ): Promise<Reaction[]> {
    const information = await this.informationService.findOne({ id });

    if (!information)
      return null;

    return await this.informationService.findRootReactions(information, page);
  }

  @Get(':id/totalReactionsByLabel')
  async totalReactionsByLabel(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<ReactionsCountByLabel[]> {
    const information = await this.informationService.findOne({ id });

    if (!information)
      return null;

    return await this.informationService.getTotalReactionsByLabel(information);
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
