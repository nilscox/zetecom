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
import { ShortReplyType } from './short-reply.entity';
import { CreateReactionInDto } from './dtos/create-reaction-in.dto';
import { UpdateReactionInDto } from './dtos/update-reaction-in.dto';
import { ReactionOutDto } from './dtos/reaction-out.dto';
import { ReactionWithHistoryOutDto } from './dtos/reaction-with-history-out.dto';
import { ShortReplyInDto } from './dtos/short-reply-in.dto';

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
    @ReqUser() user?: User,
  ): Promise<Reaction> {
    const reaction = await this.reactionService.findOne({ id });

    await this.reactionService.addRepliesCounts([reaction]);
    await this.reactionService.addShortRepliesCounts([reaction]);

    if (user)
      await this.reactionService.addUserShortReply(reaction, user);

    return reaction;
  }

  @Get('by-slug/:slug')
  @Output(ReactionOutDto)
  async findOneBySlug(
    @Param('slug') slug: string,
  ): Promise<Reaction> {
    const reaction = await this.reactionService.findOne({ slug });

    await this.reactionService.addRepliesCounts([reaction]);
    await this.reactionService.addShortRepliesCounts([reaction]);

    return reaction;
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

    const replies = await this.reactionService.findReplies(reaction, page);

    await this.reactionService.addRepliesCounts(replies);
    await this.reactionService.addShortRepliesCounts(replies);

    return replies;
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

    const reaction = await this.reactionService.create(information, dto, user, parent);

    reaction.repliesCount = 0;
    reaction.shortRepliesCount = {
      APPROVE: 0,
      REFUTE: 0,
      SKEPTIC: 0,
    };

    return reaction;
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

    const updated = await this.reactionService.update(reaction, dto);

    await this.reactionService.addRepliesCounts([updated]);
    await this.reactionService.addShortRepliesCounts([updated]);

    return updated;
  }

  @Post(':id/short-reply')
  @Output(ReactionOutDto)
  @UseGuards(IsAuthenticated)
  async shortReply(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: ShortReplyInDto,
    @ReqUser() user: User,
  ): Promise<Reaction> {
    const reaction = await this.reactionService.findOne(id);

    if (!reaction)
      throw new NotFoundException();

    await this.reactionService.setShortReply(reaction, user, dto.type);
    await this.reactionService.addRepliesCounts([reaction]);
    await this.reactionService.addShortRepliesCounts([reaction]);

    return reaction;
  }

}
