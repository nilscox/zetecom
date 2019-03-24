import {
  Injectable,
  Controller,
  Get, Post, Put,
  Param, Body,
  ParseIntPipe,
  UseInterceptors, UseGuards,
  ClassSerializerInterceptor,
  NotFoundException,
  UnauthorizedException,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

import { IsAuthenticated } from 'Common/auth.guard';
import { User as ReqUser } from 'Common/user.decorator';
import { OptionalQuery } from 'Common/optional-query.decorator';
import { Output } from 'Common/output.interceptor';

import { User } from '../user/user.entity';
import { Information } from '../information/information.entity';
import { InformationService } from '../information/information.service';

import { Reaction } from './reaction.entity';
import { ReactionService } from './reaction.service';
import { CreateReactionInDto } from './dtos/create-reaction-in.dto';
import { UpdateReactionInDto } from './dtos/update-reaction-in.dto';
import { ReactionOutDto } from './dtos/reaction-out.dto';
import { ReactionWithHistoryOutDto } from './dtos/reaction-with-history-out.dto';

@Controller('/reaction')
@UseInterceptors(ClassSerializerInterceptor)
export class ReactionController {

  constructor(
    private readonly informationService: InformationService,
    private readonly reactionService: ReactionService,
  ) {}

  @Get(':id')
  @Output(ReactionWithHistoryOutDto)
  async findOneById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Reaction> {
    return this.reactionService.findOne({ id });
  }

  @Get('by-slug/:slug')
  @Output(ReactionOutDto)
  async findOneBySlug(
    @Param('slug') slug: string,
  ): Promise<Reaction> {
    return this.reactionService.findOne({ slug });
  }

  @Get(':id/replies')
  @Output(ReactionOutDto)
  async findReplies(
    @Param('id', new ParseIntPipe()) id: number,
    @OptionalQuery({ key: 'page', defaultValue: '1' }, new ParseIntPipe()) page: number,
  ): Promise<Reaction[]> {
    const reaction = await this.reactionService.findOne({ id });

    if (!reaction)
      throw new NotFoundException();

    return this.reactionService.findReplies(reaction, page);
  }

  @Post()
  @Output(ReactionOutDto)
  @UseGuards(IsAuthenticated)
  async create(
    @Body() dto: CreateReactionInDto,
    @ReqUser() user: User,
  ): Promise<Reaction> {
    const information = await this.informationService.findOne({ id: dto.informationId });

    if (!information)
      throw new NotFoundException();

    let parent = null;

    if (dto.parentId) {
      parent = await this.reactionService.findOne({
        id: dto.parentId,
        information,
      });

      if (!parent)
        throw new BadRequestException('parent not found for informationId');
    }

    return this.reactionService.create(information, dto, user, parent);
  }

  @Put(':id')
  @Output(ReactionWithHistoryOutDto)
  @UseGuards(IsAuthenticated)
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: UpdateReactionInDto,
    @ReqUser() user: User,
  ): Promise<Reaction> {
    const reaction = await this.reactionService.findOne(id);

    if (!reaction)
      throw new NotFoundException();

    // TODO: use guards
    if (reaction.author.id !== user.id)
      throw new UnauthorizedException();

    return this.reactionService.update(reaction, dto);
  }

}
