import { Injectable, Inject } from '@nestjs/common';

import { BookmarkRepository } from './bookmark.repository';
import { Paginated } from 'Common/paginated';
import { Reaction } from '../reaction/reaction.entity';
import { User } from '../user/user.entity';
import { Bookmark } from './bookmark.entity';

@Injectable()
export class BookmarkService {

  @Inject('REACTION_PAGE_SIZE')
  private readonly reactionPageSize: number;

  constructor(
    private readonly bookmarkRepository: BookmarkRepository,
  ) {}

  async find(user: User, informationId: number | undefined, search, page: number): Promise<Paginated<Reaction>> {
    return this.bookmarkRepository.findBookmarks(user.id, informationId, search, page, this.reactionPageSize);
  }

  async add(user: User, reaction: Reaction): Promise<void> {
    return this.bookmarkRepository.addBookmark(user, reaction);
  }

  async remove(bookmark: Bookmark): Promise<void> {
    return this.bookmarkRepository.removeBookmark(bookmark);
  }

}
