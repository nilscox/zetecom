import { Controller, Get, UseGuards, ParseIntPipe, Post, Param, Delete, ConflictException, NotFoundException } from '@nestjs/common';

import { IsAuthenticated } from 'Common/auth.guard';
import { PaginatedOutput, Output } from 'Common/output.interceptor';
import { User as ReqUser } from 'Common/user.decorator';

import { ReactionOutDto } from '../reaction/dtos/reaction-out.dto';
import { User } from '../user/user.entity';
import { Reaction } from '../reaction/reaction.entity';
import { Paginated } from 'Common/paginated';
import { OptionalQuery } from 'Common/optional-query.decorator';
import { BookmarkService } from './bookmark.service';
import { BookmarkRepository } from './bookmark.repository';

@Controller('bookmark')
export class BookmarkController {

  constructor(
    private readonly bookmarkService: BookmarkService,
    private readonly bookmarkRepository: BookmarkRepository,
  ) {}

  @Get('me')
  @PaginatedOutput(ReactionOutDto)
  @UseGuards(IsAuthenticated)
  async findForUser(
    @ReqUser() user: User,
    @OptionalQuery({ key: 'page', defaultValue: 1 }, new ParseIntPipe()) page: number,
  ): Promise<Paginated<Reaction>> {
    return this.bookmarkService.find(user, page);
  }

  @Post(':id')
  @UseGuards(IsAuthenticated)
  async addBookmark(
    @ReqUser() user: User,
    @Param('id', new ParseIntPipe()) reactionId: number,
  ): Promise<void> {
    const existing = await this.bookmarkRepository.findBookmark(user.id, reactionId);

    if (existing)
      throw new ConflictException(`bookmark for reaction ${reactionId} already exists`);

    return this.bookmarkService.add(user, reactionId);
  }

  @Delete(':id')
  @Output(ReactionOutDto)
  @UseGuards(IsAuthenticated)
  async removeBookmark(
    @ReqUser() user: User,
    @Param('id', new ParseIntPipe()) reactionId: number,
  ): Promise<void> {
    const existing = await this.bookmarkRepository.findBookmark(user.id, reactionId);

    if (!existing)
      throw new NotFoundException(`bookmark for reaction ${reactionId} does not exists`);

    return this.bookmarkService.remove(existing);
  }

}
