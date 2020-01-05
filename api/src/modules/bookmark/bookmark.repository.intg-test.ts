import { getCustomRepository } from 'typeorm';

import { BookmarkRepository } from './bookmark.repository';

import { createUser } from '../../testing/factories/user.factory';
import { setupIntgTest } from '../../testing/setup-intg-test';
import { createBookmark } from '../../testing/factories/bookmark.factory';
import { createReaction } from '../../testing/factories/reaction.factory';

describe('bookmark repository', () => {

  setupIntgTest();

  let bookmarkRepository: BookmarkRepository;

  beforeAll(async () => {
    bookmarkRepository = getCustomRepository(BookmarkRepository);
  });

  describe('findBookmarks', () => {

    it('should find the bookmarks for a user on page 1', async () => {
      const user = await createUser();
      await createBookmark({ user });
      const bookmark2 = await createBookmark({ user });
      const bookmark3 = await createBookmark({ user });

      const result = await bookmarkRepository.findBookmarks(user.id, undefined, '', 1, 2);

      expect(result).toMatchObject({
        items: [
          { id: bookmark3.id },
          { id: bookmark2.id },
        ],
        total: 3,
      });
    });

    it('should find the bookmarks for a user on page 2', async () => {
      const user = await createUser();
      const bookmark1 = await createBookmark({ user });
      await createBookmark({ user });
      await createBookmark({ user });

      const result = await bookmarkRepository.findBookmarks(user.id, undefined, '', 2, 2);

      expect(result).toMatchObject({
        items: [
          { id: bookmark1.id },
        ],
        total: 3,
      });
    });

  });

  describe('findBookmark', () => {

    it('should find a bookmarks for a user', async () => {
      const user = await createUser();
      const bookmark = await createBookmark({ user });

      const result = await bookmarkRepository.findBookmark(user.id, bookmark.id);

      expect(result).toMatchObject({ id: bookmark.id });
    });

  });

  describe('addBookmark', () => {

    it('should add a bookmarks for a user', async () => {
      const user = await createUser();
      const reaction = await createReaction();

      await bookmarkRepository.addBookmark(user, reaction);

      const bookmarkDb = await bookmarkRepository.findOne({
        where: { user, reaction },
        relations: ['user', 'reaction'],
      });

      expect(bookmarkDb).toMatchObject({
        user: { id: user.id },
        reaction: { id: reaction.id },
      });
    });

  });

  describe('removeBookmark', () => {

    it('should remove a bookmarks for a user', async () => {
      const user = await createUser();
      const reaction = await createReaction();
      const bookmark = await createBookmark({ user, reaction });

      await bookmarkRepository.removeBookmark(bookmark);

      const bookmarkDb = await bookmarkRepository.findOne({ user, reaction });

      expect(bookmarkDb).not.toBeDefined();
    });

  });

});
