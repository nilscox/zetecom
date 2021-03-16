import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { IsAuthenticated } from 'src/common/auth.guard';
import { AuthUser } from 'src/common/auth-user.decorator';
import { CastToDto } from 'src/common/cast-to-dto.interceptor';
import { ClassToPlainInterceptor } from 'src/common/ClassToPlain.interceptor';
import { PageQuery } from 'src/common/page-query.decorator';
import { PageSizeQuery } from 'src/common/page-size-query.decorator';
import { Paginated } from 'src/common/paginated';
import { Roles } from 'src/common/roles.decorator';
import { Role } from 'src/modules/authorization/roles.enum';
import { User } from 'src/modules/user/user.entity';

import { CommentsAreaRequest, CommentsAreaRequestStatus } from './comments-area-request.entity';
import { CommentsAreaRequestService } from './comments-area-request.service';
import { CommentsAreaRequestDto } from './dtos/comments-area-request.dto';
import { CommentsAreaRequestInDto } from './dtos/comments-area-request-in.dto';
import { CommentsAreaRequestRejectedInDto } from './dtos/comments-area-request-rejected-in.dto';

@Controller('comments-area/request')
@UseInterceptors(ClassToPlainInterceptor)
export class CommentsAreaRequestController {
  constructor(private readonly commentsAreaRequestService: CommentsAreaRequestService) {}

  @Get()
  @UseGuards(IsAuthenticated)
  @Roles(Role.MODERATOR, Role.ADMIN)
  @CastToDto(CommentsAreaRequestDto)
  async requests(
    @PageQuery() page: number,
    @PageSizeQuery() pageSize: number,
  ): Promise<Paginated<CommentsAreaRequest>> {
    const [items, total] = await this.commentsAreaRequestService.findRequestsPaginated(page, pageSize);

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
