import { EntityRepository, Repository } from 'typeorm';

import { Paginated } from 'Common/paginated';

import { Reaction } from '../reaction/reaction.entity';
import { Bookmark } from './bookmark.entity';
import { User } from '../user/user.entity';

@EntityRepository(Bookmark)
export class BookmarkRepository extends Repository<Bookmark> {

  async findBookmarks(userId: number, page: number, pageSize: number): Promise<Paginated<Reaction>> {
    const [bookmarks, total] = await this.findAndCount({
      where: { user: { id: userId } },
      relations: ['reaction', 'reaction.messages'],
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      items: bookmarks.map(b => b.reaction),
      total,
    };
  }

  async findBookmark(userId: number, reactionId: number): Promise<Bookmark> {
    return this.findOne({
      where: { user: { id: userId }, reaction: { id: reactionId } },
      relations: ['reaction'],
    });
  }

  async addBookmark(user: User, reaction: Reaction): Promise<void> {
    const bookmark = this.create({
      user,
      reaction,
    });

    await this.save(bookmark);
  }

  async removeBookmark(bookmark: Bookmark): Promise<void> {
    await this.remove(bookmark);
  }

}
