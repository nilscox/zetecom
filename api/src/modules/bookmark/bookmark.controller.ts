import { Controller, Get, UseGuards, ParseIntPipe, Post, Param, Delete, ConflictException, NotFoundException, HttpStatus, HttpCode } from '@nestjs/common';

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
import { ReactionRepository } from '../reaction/reaction.repository';

@Controller('bookmark')
export class BookmarkController {

  constructor(
    private readonly bookmarkService: BookmarkService,
    private readonly bookmarkRepository: BookmarkRepository,
    private readonly reactionRepository: ReactionRepository,
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

    const reaction = await this.reactionRepository.findOne(reactionId);

    if (!reaction)
      throw new NotFoundException(`reaction with id ${reactionId} does not exist`);

    return this.bookmarkService.add(user, reaction);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
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
