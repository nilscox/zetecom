import { Get, Post, Param, Body, Controller, UseInterceptors, UseGuards, ClassSerializerInterceptor, NotFoundException } from '@nestjs/common';
import { IsAuthenticated } from '../../common/auth.guard';
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
    return this.informationService.findBySlug(slug);
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
  ): Promise<Information> {
    return this.informationService.create(createInformationDto);
  }

}
