import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthUser } from 'Common/auth-user.decorator';
import { IsAuthenticated } from 'Common/auth.guard';
import { ClassToPlainInterceptor } from 'Common/ClassToPlain.interceptor';
import { PageQuery } from 'Common/page-query.decorator';
import { Paginated } from 'Common/paginated';
import { Roles } from 'Common/roles.decorator';

import { CastToDto } from '../../../common/cast-to-dto.interceptor';
import { Role } from '../../authorization/roles.enum';
import { User } from '../../user/user.entity';

import { CommentsAreaRequest, CommentsAreaRequestStatus } from './comments-area-request.entity';
import { CommentsAreaRequestService } from './comments-area-request.service';
import { CommentsAreaRequestInDto } from './dtos/comments-area-request-in.dto';
import { CommentsAreaRequestRejectedInDto } from './dtos/comments-area-request-rejected-in.dto';
import { CommentsAreaRequestDto } from './dtos/comments-area-request.dto';

@Controller('comments-area/request')
@UseInterceptors(ClassToPlainInterceptor)
export class CommentsAreaRequestController {
  @Inject('COMMENTS_AREA_PAGE_SIZE')
  private readonly commentsAreaPageSize: number;

  constructor(private readonly commentsAreaRequestService: CommentsAreaRequestService) {}

  @Get()
  @UseGuards(IsAuthenticated)
  @Roles(Role.MODERATOR, Role.ADMIN)
  @CastToDto(CommentsAreaRequestDto)
  async requests(@PageQuery() page: number): Promise<Paginated<CommentsAreaRequest>> {
    const [items, total] = await this.commentsAreaRequestService.findRequestsPaginated(page, this.commentsAreaPageSize);

    return { items, total };
  }

  @Post()
  @UseGuards(IsAuthenticated)
  @CastToDto(CommentsAreaRequestDto)
  async request(@Body() dto: CommentsAreaRequestInDto, @AuthUser() user: User): Promise<CommentsAreaRequest> {
    return this.commentsAreaRequestService.request(dto, user);
  }

  @Post(':id/reject')
  @UseGuards(IsAuthenticated)
  @Roles(Role.MODERATOR, Role.ADMIN)
  @CastToDto(CommentsAreaRequestDto)
  @HttpCode(200)
  async reject(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() { reason }: CommentsAreaRequestRejectedInDto,
    @AuthUser() user,
  ): Promise<CommentsAreaRequest> {
    const request = await this.commentsAreaRequestService.findRequest(id);

    if (!request) {
      throw new NotFoundException();
    }

    if (request.status !== CommentsAreaRequestStatus.PENDING) {
      throw new BadRequestException('REQUEST_IS_NOT_PENDING');
    }

    await this.commentsAreaRequestService.reject(request, user, reason);

    return this.commentsAreaRequestService.findRequest(request.id);
  }
}
