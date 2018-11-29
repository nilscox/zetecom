import {
  Controller,
  Get, Post,
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

  @Get(':slug')
  async findOneBySlug(@Param('slug') slug: string): Promise<Information> {
    const information = await this.informationService.findBySlug(slug);

    if (!information)
      throw new NotFoundException();

    return information;
  }

  @Get('/by-youtubeId/:youtubeId')
  async findOneByYoutubeId(@Param('youtubeId') youtubeId: string): Promise<Information> {
    const information = this.informationService.findByYoutubeId(youtubeId);

    if (!information)
      throw new NotFoundException();

    return information;
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
