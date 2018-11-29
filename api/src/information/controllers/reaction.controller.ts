import {
  Injectable,
  Controller,
  Get, Post, Put,
  Param, Body,
  UseInterceptors, UseGuards,
  ClassSerializerInterceptor,
  NotFoundException,
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

@Injectable()
class InfoParamPipe implements PipeTransform<string, Promise<Information>> {

  constructor(
    private readonly informationService: InformationService,
  ) {}

  async transform(slug: string, metadata: ArgumentMetadata): Promise<Information> {
    const information = await this.informationService.findBySlug(slug);

    if (!information)
      throw new NotFoundException();

    return information;
  }

}

@Controller('/information/:infoSlug')
@UseInterceptors(ClassSerializerInterceptor)
export class ReactionController {

  constructor(
    private readonly reactionService: ReactionService,
  ) {}

  @Get(':slug')
  async findOne(
    @Param('infoSlug', InfoParamPipe) information,
    @Param('slug') slug,
  ): Promise<Reaction> {
    const reaction = await this.reactionService.findOne({
      informationId: information.id,
      slug,
    });

    if (!reaction)
      throw new NotFoundException();

    return reaction;
  }

  @Post()
  @UseGuards(IsAuthenticated)
  async createRoot(
    @Param('infoSlug', InfoParamPipe) information,
    @Body() createReactionDto: CreateReactionDto,
    @ReqUser() user: User,
  ): Promise<Reaction> {
    return await this.reactionService.create(information, createReactionDto, user);
  }

  @Post(':slug')
  @UseGuards(IsAuthenticated)
  async createAnswer(
    @Param('infoSlug', InfoParamPipe) information,
    @Param('slug') parentSlug,
    @Body() createReactionDto: CreateReactionDto,
    @ReqUser() user: User,
  ): Promise<Reaction> {
    const parent = await this.reactionService.findOne({
      informationId: information.id,
      slug: parentSlug,
    });

    if (!parent)
      throw new NotFoundException();

    return await this.reactionService.create(information, createReactionDto, user, parent);
  }

  @Put(':slug')
  @UseGuards(IsAuthenticated)
  async update(
    @Param('infoSlug', InfoParamPipe) information,
    @Param('slug') slug,
    @Body() updateReactionDto: UpdateReactionDto,
  ): Promise<Reaction> {
    const reaction = await this.reactionService.findOne({
      informationId: information.id,
      slug,
    });

    if (!reaction)
      throw new NotFoundException();

    return await this.reactionService.update(reaction, updateReactionDto);
  }

}
