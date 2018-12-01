import {
  Controller,
  Get, Post,
  ParseIntPipe,
  Param, Body,
  UseInterceptors, UseGuards,
  ClassSerializerInterceptor,
  NotFoundException,
} from '@nestjs/common';

import { IsAuthenticated } from 'Common/auth.guard';
import { User as ReqUser } from 'Common/user.decorator';

import { User } from 'User/entities/user.entity';

import { InformationService } from '../services/information.service';
import { Information } from '../entities/information.entity';
import { CreateInformationDto } from '../dtos/CreateInformationDto';

@Controller('information')
@UseInterceptors(ClassSerializerInterceptor)
export class InformationController {

  constructor(
    private readonly informationService: InformationService,
  ) {}

  @Get()
  async findAll(): Promise<Information[]> {
    return this.informationService.findAll();
  }

  async findOne(where): Promise<Information> {
    const information = this.informationService.findOne(where, {
      creator: true,
      rootReactions: true,
    });

    if (!information)
      throw new NotFoundException();

    return information;
  }

  @Get(':id')
  async findOneById(@Param('id', new ParseIntPipe()) id: number): Promise<Information> {
    return this.findOne({ id });
  }

  @Get('by-slug/:slug')
  async findOneBySlug(@Param('slug') slug: string): Promise<Information> {
    return this.findOne({ slug });
  }

  @Get('by-youtubeId/:youtubeId')
  async findOneByYoutubeId(@Param('youtubeId') youtubeId: string): Promise<Information> {
    return this.findOne({ youtubeId });
  }

  @Post()
  @UseGuards(IsAuthenticated)
  async create(
    @Body() createInformationDto: CreateInformationDto,
    @ReqUser() user: User,
  ): Promise<Information> {
    return this.informationService.create(createInformationDto, user);
  }

}
