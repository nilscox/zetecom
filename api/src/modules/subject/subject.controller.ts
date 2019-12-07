import {
  Injectable,
  Controller,
  Get, Post, Put,
  Query, Param, Body,
  ParseIntPipe,
  UseInterceptors, UseGuards,
  ClassSerializerInterceptor,
  NotFoundException,
  UnauthorizedException,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  SetMetadata,
} from '@nestjs/common';

import { SortType } from 'Common/sort-type';
import { IsAuthenticated } from 'Common/auth.guard';
import { IsAuthor } from 'Common/is-author.guard';
import { User as ReqUser } from 'Common/user.decorator';
import { OptionalQuery } from 'Common/optional-query.decorator';
import { SortTypePipe } from 'Common/sort-type.pipe';
import { Output } from 'Common/output.interceptor';
import { PopulateReaction } from 'Common/populate-reaction.interceptor';

import { User } from '../user/user.entity';
import { Information } from '../information/information.entity';
import { InformationService } from '../information/information.service';
import { Reaction } from '../reaction/reaction.entity';
import { ReactionService } from '../reaction/reaction.service';
import { ReactionOutDto } from '../reaction/dtos/reaction-out.dto';

import { Subject } from './subject.entity';
import { SubjectService } from './subject.service';
import { CreateSubjectInDto } from './dtos/create-subject-in.dto';
import { SubjectOutDto } from './dtos/subject-out.dto';

@Controller('/subject')
export class SubjectController {

  constructor(
    private readonly informationService: InformationService,
    private readonly subjectService: SubjectService,
    private readonly reactionService: ReactionService,
  ) {}

  @Get(':id')
  @Output(SubjectOutDto)
  async findOneById(@Param('id', new ParseIntPipe()) id: number): Promise<Subject> {
    return this.subjectService.findById(id);
  }

  @Get(':id/reactions')
  @Output(ReactionOutDto)
  @UseInterceptors(PopulateReaction)
  async findReactions(
    @Param('id', new ParseIntPipe()) id: number,
    @Query('sort', new SortTypePipe()) sort: SortType,
    @OptionalQuery({ key: 'page', defaultValue: '1' }, new ParseIntPipe()) page: number,
  ): Promise<Reaction[]> {
    const subject = await this.subjectService.findById(id);

    if (!subject)
      throw new NotFoundException(`subject with id ${id} not found`);

    const reactions = await this.reactionService.findRootReactions(subject, sort, page);

    if (!reactions)
      throw new NotFoundException();

    return reactions;
  }

  @Post()
  @Output(SubjectOutDto)
  @UseGuards(IsAuthenticated)
  async create(
    @Body() dto: CreateSubjectInDto,
    @ReqUser() user: User,
  ): Promise<Subject> {
    const information = await this.informationService.findById(dto.informationId);

    if (!information)
      throw new NotFoundException(`information with id ${dto.informationId} not found`);

    return this.subjectService.create(dto, user, information);
  }

}
