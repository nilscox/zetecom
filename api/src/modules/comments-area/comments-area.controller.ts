import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
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

import { CastToDto } from '../../common/cast-to-dto.interceptor';
import { Role } from '../authorization/roles.enum';
import { Comment } from '../comment/comment.entity';
import { CommentService } from '../comment/comment.service';
import { CommentDto } from '../comment/dtos/comment.dto';
import { PopulateComment } from '../comment/populate-comment.interceptor';
import { User } from '../user/user.entity';

import { CommentsArea } from './comments-area.entity';
import { CommentsAreaRepository } from './comments-area.repository';
import { CommentsAreaService } from './comments-area.service';
import { CommentsAreaDto } from './dtos/comments-area.dto';
import { CreateCommentsAreaInDto } from './dtos/create-comments-area-in.dto';
import { OpenCommentsAreaRequestInDto } from './dtos/open-comments-area-request-in.dto';
import { OpenCommentsAreaRequestDto } from './dtos/open-comments-area.dto';
import { UpdateCommentsAreaInDto } from './dtos/update-comments-area-in.dto';
import { OpenCommentsAreaRequest, OpenCommentsAreaRequestStatus } from './open-comments-area-request.entity';
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
    private readonly commentsAreaRepository: CommentsAreaRepository,
    private readonly commentService: CommentService,
  ) {}

  @Get('requests')
  @UseGuards(IsAuthenticated)
  @CastToDto(OpenCommentsAreaRequestDto)
  async requests(
    @PageQuery() page: number,
  ): Promise<Paginated<OpenCommentsAreaRequest>> {
    const [items, total] = await this.commentsAreaService.findRequestsPaginated(page, this.commentsAreaPageSize);

    return { items, total };
  }

  @Post('request')
  @UseGuards(IsAuthenticated)
  @CastToDto(OpenCommentsAreaRequestDto)
  async request(
    @Body() dto: OpenCommentsAreaRequestInDto,
    @AuthUser() user: User,
  ): Promise<OpenCommentsAreaRequest> {
    return this.commentsAreaService.request(dto, user);
  }

  @Post('requests/:id/reject')
  @UseGuards(IsAuthenticated)
  @CastToDto(OpenCommentsAreaRequestDto)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  async reject(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<OpenCommentsAreaRequest> {
    const request = await this.commentsAreaService.findRequest(id);

    if (!request)
      throw new NotFoundException();

    if (request.status !== OpenCommentsAreaRequestStatus.PENDING)
      throw new BadRequestException('REQUEST_IS_NOT_PENDING');

    return this.commentsAreaService.reject(request);
  }

  @Get()
  @CastToDto(CommentsAreaDto)
  @UseInterceptors(PopulateCommentsArea)
  async findAll(
    @OptionalQuery({ key: 'search', defaultValue: null }) search: string | null,
    @PageQuery() page: number,
  ): Promise<Paginated<CommentsArea>> {
    return this.commentsAreaRepository.findAllPaginated(search, page, this.commentsAreaPageSize);
  }

  @Get(':id')
  @CastToDto(CommentsAreaDto)
  @UseInterceptors(PopulateCommentsArea)
  async findOneById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<CommentsArea> {
    const commentsArea = await this.commentsAreaService.findById(id);

    if (!commentsArea)
      throw new NotFoundException();

    return commentsArea;
  }

  @Get('by-identifier/:identifier')
  @CastToDto(CommentsAreaDto)
  @UseInterceptors(PopulateCommentsArea)
  async findOneByIdentifier(
    @Param('identifier') identifier: string,
  ): Promise<CommentsArea> {
    const commentsArea = await this.commentsAreaService.findByIdentifier(decodeURIComponent(identifier));

    if (!commentsArea)
      throw new NotFoundException();

    return commentsArea;
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
    if (!(await this.commentsAreaService.exists(id)))
      throw new NotFoundException();

    return search
      ? this.commentService.search(id, search, sort, page, this.commentPageSize)
      : this.commentService.findRoot(id, sort, page, this.commentPageSize);
  }

  @Post()
  @UseGuards(IsAuthenticated)
  @CastToDto(CommentsAreaDto)
  @UseInterceptors(PopulateCommentsArea)
  @Roles(Role.ADMIN)
  async create(
    @Body() dto: CreateCommentsAreaInDto,
    @AuthUser() user: User,
  ): Promise<CommentsArea> {
    if (await this.commentsAreaService.findByIdentifier(dto.identifier))
      throw new ConflictException(`A comments area with identifier ${dto.identifier} already exists`);

    return this.commentsAreaService.create(dto, user);
  }

  @Put(':id')
  @UseGuards(IsAuthenticated)
  @CastToDto(CommentsAreaDto)
  @UseInterceptors(PopulateCommentsArea)
  @Roles(Role.ADMIN)
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: UpdateCommentsAreaInDto,
  ): Promise<CommentsArea> {
    const commentsArea = await this.commentsAreaService.findById(id);

    if (!commentsArea)
      throw new NotFoundException();

    return this.commentsAreaService.update(commentsArea, dto);
  }

}
