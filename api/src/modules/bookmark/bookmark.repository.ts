import { EntityRepository, Repository, Raw, QueryBuilder } from 'typeorm';

import { Paginated } from 'Common/paginated';

import { Reaction } from '../reaction/reaction.entity';
import { Bookmark } from './bookmark.entity';
import { User } from '../user/user.entity';

@EntityRepository(Bookmark)
export class BookmarkRepository extends Repository<Bookmark> {

  async findBookmarks(userId: number, search: string, page: number, pageSize: number): Promise<Paginated<Reaction>> {
    const qb = this.createQueryBuilder('bookmark')
      .where('user.id = :userId', { userId })
      .leftJoinAndSelect('bookmark.user', 'user')
      .leftJoinAndSelect('bookmark.reaction', 'reaction')
      .leftJoinAndSelect('reaction.messages', 'messages')
      .leftJoinAndSelect('reaction.author', 'author')
      .skip((page - 1) * pageSize)
      .take(pageSize);

    if (search)
      qb.andWhere('messages.text ILIKE :search', { search: `%${search}%`});

    const [bookmarks, total] = await qb.getManyAndCount();

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

  async getBookmarks(reactionIds: number[], userId: number) {
    const bookmarks = await this.createQueryBuilder()
      .select('reaction_id', 'reactionId')
      .where('user_id = :userId', { userId })
      .andWhere('reaction_id IN (' + reactionIds + ')')
      .getRawMany();

    return reactionIds.reduce((obj, id) => ({
      ...obj,
      [id]: !!bookmarks.find(b => b.reactionId === id),
    }), {});
  }

}
