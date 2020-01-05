import {
  Controller,
  Get,
  UseGuards,
  ParseIntPipe,
  Post,
  Param,
  Delete,
  ConflictException,
  NotFoundException,
  HttpStatus,
  HttpCode,
  UseInterceptors,
} from '@nestjs/common';

import { IsAuthenticated } from 'Common/auth.guard';
import { PaginatedOutput } from 'Common/output.interceptor';
import { User as ReqUser } from 'Common/user.decorator';

import { ReactionWithInformationOutDto } from '../reaction/dtos/reaction-out.dto';
import { User } from '../user/user.entity';
import { Reaction } from '../reaction/reaction.entity';
import { Paginated } from 'Common/paginated';
import { OptionalQuery } from 'Common/optional-query.decorator';
import { BookmarkService } from './bookmark.service';
import { BookmarkRepository } from './bookmark.repository';
import { ReactionRepository } from '../reaction/reaction.repository';
import { PopulateReaction } from 'Common/populate-reaction.interceptor';
import { OptionalParseIntPipe } from 'Common/optional-parse-int.pipe';
import { PageQuery } from 'Common/page-query.decorator';

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
    @ReqUser() user: User,
    @OptionalQuery({ key: 'search', defaultValue: '' }) search: string,
    @OptionalQuery({ key: 'informationId' }, new OptionalParseIntPipe()) informationId: number | undefined,
    @PageQuery() page: number,
  ): Promise<Paginated<Reaction>> {
    return this.bookmarkService.find(user, informationId, search, page);
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
  @UseGuards(IsAuthenticated)
  @HttpCode(HttpStatus.NO_CONTENT)
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
