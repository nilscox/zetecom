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
} from '@nestjs/common';

import { IsAuthenticated } from 'Common/auth.guard';
import { User as ReqUser } from 'Common/user.decorator';

import { User } from 'User/entities/user.entity';
import { Information } from '../entities/information.entity';
import { Reaction } from '../entities/reaction.entity';

import { InformationService } from '../services/information.service';
import { ReactionService } from '../services/reaction.service';
import { CreateReactionDto } from '../dtos/CreateReactionDto';
import { UpdateReactionDto } from '../dtos/UpdateReactionDto';

@Controller('/reaction')
@UseInterceptors(ClassSerializerInterceptor)
export class ReactionController {

  constructor(
    private readonly informationService: InformationService,
    private readonly reactionService: ReactionService,
  ) {}

  async findOne(where) {
    const reaction = await this.reactionService.findOne(where);

    if (!reaction)
      throw new NotFoundException();

    return reaction;
  }

  @Get(':id')
  async findOneById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Reaction> {
    return await this.findOne({ id });
  }

  @Get('by-slug/:slug')
  async findOneBySlug(
    @Param('slug') slug: string,
  ): Promise<Reaction> {
    return await this.findOne({ slug });
  }

  @Post()
  @UseGuards(IsAuthenticated)
  async create(
    @Body() createReactionDto: CreateReactionDto,
    @ReqUser() user: User,
  ): Promise<Reaction> {
    const information = await this.informationService.findOne({ id: createReactionDto.informationId });

    if (!information)
      throw new NotFoundException();

    let parent = null;

    if (createReactionDto.parentId) {
      parent = await this.reactionService.findOne({
        id: createReactionDto.parentId,
        informationId: information.id,
      });

      if (!parent)
        throw new NotFoundException();
    }

    return await this.reactionService.create(information, createReactionDto, user, parent);
  }

  @Put(':id')
  @UseGuards(IsAuthenticated)
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateReactionDto: UpdateReactionDto,
    @ReqUser() user: User,
  ): Promise<Reaction> {
    const reaction = await this.reactionService.findOne(id);

    if (!reaction)
      throw new NotFoundException();

    if (reaction.author.id !== user.id)
      throw new UnauthorizedException();

    return await this.reactionService.update(reaction, updateReactionDto);
  }

}
