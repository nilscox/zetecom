import {
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthUser } from 'Common/auth-user.decorator';
import { IsAuthenticated } from 'Common/auth.guard';
import { OptionalParseIntPipe } from 'Common/optional-parse-int.pipe';
import { OptionalQuery } from 'Common/optional-query.decorator';
import { PaginatedOutput } from 'Common/output.interceptor';
import { PageQuery } from 'Common/page-query.decorator';
import { Paginated } from 'Common/paginated';
import { SearchQuery } from 'Common/search-query.decorator';

import { ReactionWithInformationOutDto } from '../reaction/dtos/reaction-out.dto';
import { PopulateReaction } from '../reaction/populate-reaction.interceptor';
import { Reaction } from '../reaction/reaction.entity';
import { ReactionRepository } from '../reaction/reaction.repository';
import { User } from '../user/user.entity';

import { BookmarkRepository } from './bookmark.repository';
import { BookmarkService } from './bookmark.service';

@Controller('bookmark')
export class BookmarkController {

  constructor(
    private readonly bookmarkService: BookmarkService,
    private readonly bookmarkRepository: BookmarkRepository,
    private readonly reactionRepository: ReactionRepository,
  ) {}

  @Get('me')
  @UseGuards(IsAuthenticated)
  @UseInterceptors(PopulateReaction)
  @PaginatedOutput(ReactionWithInformationOutDto)
  async findForUser(
    @AuthUser() user: User,
    @OptionalQuery({ key: 'informationId' }, new OptionalParseIntPipe()) informationId: number | undefined,
    @SearchQuery() search: string,
    @PageQuery() page: number,
  ): Promise<Paginated<Reaction>> {
    return this.bookmarkService.find(user, informationId, search, page);
  }

  @Post(':id')
  @UseGuards(IsAuthenticated)
  async addBookmark(
    @AuthUser() user: User,
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
  @UseGuards(IsAuthenticated)
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeBookmark(
    @AuthUser() user: User,
    @Param('id', new ParseIntPipe()) reactionId: number,
  ): Promise<void> {
    const existing = await this.bookmarkRepository.findBookmark(user.id, reactionId);

    if (!existing)
      throw new NotFoundException(`bookmark for reaction ${reactionId} does not exists`);

    return this.bookmarkService.remove(existing);
  }

}
