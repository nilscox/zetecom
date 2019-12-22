import { Injectable, Inject } from '@nestjs/common';

import { BookmarkRepository } from './bookmark.repository';
import { Paginated } from 'Common/paginated';
import { Reaction } from '../reaction/reaction.entity';
import { User } from '../user/user.entity';
import { Bookmark } from './bookmark.entity';

@Injectable()
export class BookmarkService {

  @Inject('BOOKMARK_PAGE_SIZE')
  private readonly pageSize: number;

  constructor(
    private readonly bookmarkRepository: BookmarkRepository,
  ) {}

  async find(user: User, page: number): Promise<Paginated<Reaction>> {
    return this.bookmarkRepository.findBookmarks(user.id, page, this.pageSize);
  }

  async add(user: User, reactionId: number): Promise<void> {
    return this.bookmarkRepository.addBookmark(user, reactionId);
  }

  async remove(bookmark: Bookmark): Promise<void> {
    return this.bookmarkRepository.removeBookmark(bookmark);
  }

}
