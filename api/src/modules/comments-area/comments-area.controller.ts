import {
  Body,
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

import { IsAuthenticated } from 'src/common/auth.guard';
import { AuthUser } from 'src/common/auth-user.decorator';
import { CastToDto } from 'src/common/cast-to-dto.interceptor';
import { ClassToPlainInterceptor } from 'src/common/ClassToPlain.interceptor';
import { OptionalQuery } from 'src/common/optional-query.decorator';
import { PageQuery } from 'src/common/page-query.decorator';
import { Paginated } from 'src/common/paginated';
import { Roles } from 'src/common/roles.decorator';
import { SearchQuery } from 'src/common/search-query.decorator';
import { SortType } from 'src/common/sort-type';
import { SortTypePipe } from 'src/common/sort-type.pipe';
import { Role } from 'src/modules/authorization/roles.enum';
import { Comment } from 'src/modules/comment/comment.entity';
import { CommentService } from 'src/modules/comment/comment.service';
import { CommentDto } from 'src/modules/comment/dtos/comment.dto';
import { PopulateComment } from 'src/modules/comment/populate-comment.interceptor';
import { User } from 'src/modules/user/user.entity';

import { CommentsArea } from './comments-area.entity';
import { CommentsAreaRepository } from './comments-area.repository';
import { CommentsAreaService } from './comments-area.service';
import { CommentsAreaIntegrationService } from './comments-area-integration/comments-area-integration.service';
import { CommentsAreaDto } from './dtos/comments-area.dto';
import { CreateCommentsAreaInDto } from './dtos/create-comments-area-in.dto';
import { UpdateCommentsAreaInDto } from './dtos/update-comments-area-in.dto';
import { PopulateCommentsArea } from './populate-comments-area.interceptor';

@Controller('comments-area')
@UseInterceptors(ClassToPlainInterceptor)
export class CommentsAreaController {
  @Inject('COMMENTS_AREA_PAGE_SIZE')
  private readonly commentsAreaPageSize: number;

  @Inject('COMMENT_PAGE_SIZE')
  private readonly commentPageSize: number;

  constructor(
    private readonly commentsAreaService: CommentsAreaService,
    private readonly commentsAreaIntegrationService: CommentsAreaIntegrationService,
    private readonly commentsAreaRepository: CommentsAreaRepository,
    private readonly commentService: CommentService,
  ) {}

  @Get()
  @CastToDto(CommentsAreaDto)
  @UseInterceptors(PopulateCommentsArea)
  async findAll(
    @OptionalQuery({ key: 'search', defaultValue: null }) search: string | null,
    @PageQuery() page: number,
  ): Promise<Paginated<CommentsArea>> {
    return this.commentsAreaRepository.findAllPaginated(search, page, this.commentsAreaPageSize);
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

  @Get(':id/comments')
  @CastToDto(CommentDto)
  @UseInterceptors(PopulateComment)
  async findComments(
    @Param('id', new ParseIntPipe()) id: number,
    @OptionalQuery({ key: 'sort', defaultValue: SortType.DATE_DESC }, new SortTypePipe()) sort: SortType,
    @SearchQuery() search: string,
    @PageQuery() page: number,
  ): Promise<Paginated<Comment>> {
    if (!(await this.commentsAreaService.exists(id))) {
      throw new NotFoundException();
    }

    return search
      ? this.commentService.search(id, search, sort, page, this.commentPageSize)
      : this.commentService.findRoot(id, sort, page, this.commentPageSize);
  }

  @Post()
  @UseGuards(IsAuthenticated)
  @CastToDto(CommentsAreaDto)
  @UseInterceptors(PopulateCommentsArea)
  @Roles(Role.MODERATOR, Role.ADMIN)
  async create(@Body() dto: CreateCommentsAreaInDto, @AuthUser() user: User): Promise<CommentsArea> {
    // if (await this.commentsAreaIntegrationService.findByIdentifier(dto.identifier)) {
    //   throw new ConflictException(`A comments area with identifier ${dto.identifier} already exists`);
    // }

    return this.commentsAreaService.create(dto, user);
  }

  @Put(':id')
  @UseGuards(IsAuthenticated)
  @CastToDto(CommentsAreaDto)
  @UseInterceptors(PopulateCommentsArea)
  @Roles(Role.MODERATOR, Role.ADMIN)
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: UpdateCommentsAreaInDto,
  ): Promise<CommentsArea> {
    const commentsArea = await this.commentsAreaService.findById(id);

    if (!commentsArea) {
      throw new NotFoundException();
    }

    return this.commentsAreaService.update(commentsArea, dto);
  }
}
