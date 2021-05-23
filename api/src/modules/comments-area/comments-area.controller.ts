import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { IsAuthenticated } from 'src/common/auth.guard';
import { CastToDto } from 'src/common/cast-to-dto.interceptor';
import { ClassToPlainInterceptor } from 'src/common/ClassToPlain.interceptor';
import { OptionalQuery } from 'src/common/optional-query.decorator';
import { PageQuery } from 'src/common/page-query.decorator';
import { PageSizeQuery } from 'src/common/page-size-query.decorator';
import { Paginated } from 'src/common/paginated';
import { Roles } from 'src/common/roles.decorator';
import { Role } from 'src/modules/authorization/roles.enum';

import { CommentsArea } from './comments-area.entity';
import { CommentsAreaRepository } from './comments-area.repository';
import { CommentsAreaService } from './comments-area.service';
import { CommentsAreaIntegrationService } from './comments-area-integration/comments-area-integration.service';
import { CommentsAreaDto } from './dtos/comments-area.dto';
import { CreateCommentsAreaInDto } from './dtos/create-comments-area-in.dto';
import { UpdateCommentsAreaInformationInDto } from './dtos/update-comments-area-information-in.dto';
import { PopulateCommentsArea } from './populate-comments-area.interceptor';

@Controller('comments-area')
@UseInterceptors(ClassToPlainInterceptor)
export class CommentsAreaController {
  constructor(
    private readonly commentsAreaService: CommentsAreaService,
    private readonly commentsAreaIntegrationService: CommentsAreaIntegrationService,
    private readonly commentsAreaRepository: CommentsAreaRepository,
  ) {}

  @Get()
  @CastToDto(CommentsAreaDto)
  @UseInterceptors(PopulateCommentsArea)
  async findAll(
    @OptionalQuery({ key: 'search', defaultValue: null }) search: string | null,
    @PageQuery() page: number,
    @PageSizeQuery() pageSize: number,
  ): Promise<Paginated<CommentsArea>> {
    return this.commentsAreaRepository.findAllPaginated(search, page, pageSize);
  }

  @Get(':id(\\d+)')
  @CastToDto(CommentsAreaDto)
  @UseInterceptors(PopulateCommentsArea)
  async findOneById(@Param('id', new ParseIntPipe()) id: number): Promise<CommentsArea> {
    const commentsArea = await this.commentsAreaService.findById(id);

    if (!commentsArea) {
      throw new NotFoundException();
    }

    return commentsArea;
  }

  @Get('by-identifier/:identifier')
  @CastToDto(CommentsAreaDto)
  @UseInterceptors(PopulateCommentsArea)
  async findOneByIdentifier(@Param('identifier') identifier: string): Promise<CommentsArea> {
    const integration = await this.commentsAreaIntegrationService.findByIdentifier(decodeURIComponent(identifier));

    if (!integration) {
      throw new NotFoundException();
    }

    return integration.commentsArea;
  }

  @Post()
  @UseGuards(IsAuthenticated)
  @CastToDto(CommentsAreaDto)
  @UseInterceptors(PopulateCommentsArea)
  async create(@Body() dto: CreateCommentsAreaInDto): Promise<CommentsArea> {
    const commentsArea = await this.commentsAreaService.create();

    if (dto.integrationIdentifier) {
      await this.commentsAreaIntegrationService.create(commentsArea, dto.integrationIdentifier);
    }

    return commentsArea;
  }

  @Put(':id/information')
  @UseGuards(IsAuthenticated)
  @Roles(Role.MODERATOR, Role.ADMIN)
  @CastToDto(CommentsAreaDto)
  @UseInterceptors(PopulateCommentsArea)
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: UpdateCommentsAreaInformationInDto,
  ): Promise<CommentsArea> {
    const commentsArea = await this.commentsAreaService.findById(id);

    if (!commentsArea) {
      throw new NotFoundException();
    }

    return this.commentsAreaService.updateInformation(commentsArea, dto);
  }
}
