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
import { Output } from 'Common/output.interceptor';
import { PopulateReaction } from 'Common/populate-reaction.interceptor';

import { User } from '../user/user.entity';
import { Reaction } from '../reaction/reaction.entity';
import { ReactionOutDto } from '../reaction/dtos/reaction-out.dto';
import { ReactionService } from '../reaction/reaction.service';

import { InformationService } from './information.service';
import { Information } from './information.entity';
import { CreateInformationInDto } from './dtos/create-information-in.dto';
import { InformationOutDto } from './dtos/information-out.dto';

@Controller('information')
@UseInterceptors(ClassSerializerInterceptor)
export class InformationController {

  constructor(
    private readonly informationService: InformationService,
    private readonly reactionService: ReactionService,
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

  @Get('by-slug/:slug')
  @Output(InformationOutDto)
  async findOneBySlug(
    @Param('slug') slug: string,
  ): Promise<Information> {
    return this.informationService.findOne({ slug });
  }

  @Get('by-youtubeId/:youtubeId')
  @Output(InformationOutDto)
  async findOneByYoutubeId(
    @Param('youtubeId') youtubeId: string,
  ): Promise<Information> {
    return this.informationService.findOne({ youtubeId });
  }

  @Get(':id/reactions')
  @Output(ReactionOutDto)
  @UseInterceptors(PopulateReaction)
  async findRootReactions(
    @Param('id', new ParseIntPipe()) id: number,
    @OptionalQuery({ key: 'page', defaultValue: '1' }, new ParseIntPipe()) page: number,
    @ReqUser() user: User,
  ): Promise<Reaction[]> {
    const information = await this.informationService.findOne({ id });

    if (!information)
      return null;

    return this.informationService.findRootReactions(information, page);
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
