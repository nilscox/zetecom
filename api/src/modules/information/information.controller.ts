import {
  Body,
  ConflictException,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthUser } from 'Common/auth-user.decorator';
import { IsAuthenticated } from 'Common/auth.guard';
import { ClassToPlainInterceptor } from 'Common/ClassToPlain.interceptor';
import { OptionalQuery } from 'Common/optional-query.decorator';
import { PageQuery } from 'Common/page-query.decorator';
import { Paginated } from 'Common/paginated';
import { Roles } from 'Common/roles.decorator';
import { SearchQuery } from 'Common/search-query.decorator';
import { SortType } from 'Common/sort-type';
import { SortTypePipe } from 'Common/sort-type.pipe';

import { Role } from '../authorization/roles.enum';
import { User } from '../user/user.entity';

import { CreateInformationInDto } from './dtos/create-information-in.dto';
import { UpdateInformationInDto } from './dtos/update-information-in.dto';
import { Information } from './information.entity';
import { InformationRepository } from './information.repository';
import { InformationService } from './information.service';

@Controller('information')
@UseInterceptors(ClassToPlainInterceptor)
export class InformationController {

  @Inject('INFORMATION_PAGE_SIZE')
  private readonly informationPageSize: number;

  constructor(
    private readonly informationService: InformationService,
    private readonly informationRepository: InformationRepository,
  ) {}

  @Get()
  async findAll(
    @OptionalQuery({ key: 'search', defaultValue: null }) search: string | null,
    @PageQuery() page: number,
  ): Promise<Paginated<Information>> {
    return this.informationRepository.findAllPaginated(search, page, this.informationPageSize);
  }

  @Get(':id')
  async findOneById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Information> {
    const info = await this.informationService.findById(id);

    if (!info)
      throw new NotFoundException();

    return info;
  }

  @Get('by-identifier/:identifier')
  async findOneByIdentifier(
    @Param('identifier') identifier: string,
  ): Promise<Information> {
    const info = await this.informationService.findByIdentifier(decodeURIComponent(identifier));

    if (!info)
      throw new NotFoundException();

    return info;
  }

  // @Get(':id/reactions')
  // async findReactions(
  //   @Param('id', new ParseIntPipe()) id: number,
  //   @OptionalQuery({ key: 'sort', defaultValue: SortType.DATE_DESC }, new SortTypePipe()) sort: SortType,
  //   @SearchQuery() search: string,
  //   @PageQuery() page: number,
  // ): Promise<Paginated<Reaction>> {
  //   if (!(await this.informationService.exists(id)))
  //     throw new NotFoundException();

  //   return search
  //     ? this.reactionRepository.search(id, search, sort, page, this.reactionPageSize)
  //     : this.reactionRepository.findRootReactions(id, sort, page, this.reactionPageSize);
  // }

  @Post()
  @UseGuards(IsAuthenticated)
  @Roles(Role.ADMIN)
  async create(
    @Body() dto: CreateInformationInDto,
    @AuthUser() user: User,
  ): Promise<Information> {
    if (await this.informationService.findByIdentifier(dto.identifier))
      throw new ConflictException(`An information with identifier ${dto.identifier} already exists`);

    return this.informationService.create(dto, user);
  }

  @Put(':id')
  @UseGuards(IsAuthenticated)
  @Roles(Role.ADMIN)
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: UpdateInformationInDto,
  ): Promise<Information> {
    const information = await this.informationService.findById(id);

    if (!information)
      throw new NotFoundException();

    return this.informationService.update(information, dto);
  }

}
