import * as request from 'supertest';
import { getCustomRepository } from 'typeorm';

import { createBookmark } from '../../testing/factories/bookmark.factory';
import { createInformation } from '../../testing/factories/information.factory';
import { createReaction } from '../../testing/factories/reaction.factory';
import { createAuthenticatedUser, setupE2eTest } from '../../testing/setup-e2e-test';
import { AuthenticationModule } from '../authentication/authentication.module';
import { Information } from '../information/information.entity';
import { Reaction } from '../reaction/reaction.entity';

import { BookmarkModule } from './bookmark.module';
import { BookmarkRepository } from './bookmark.repository';

describe('information controller', () => {

  const server = setupE2eTest({
    imports: [BookmarkModule, AuthenticationModule],
  }, moduleBuilder => {
    moduleBuilder
      .overrideProvider('REACTION_PAGE_SIZE')
      .useValue(2);
  });

  let bookmarkRepository: BookmarkRepository;

  beforeAll(() => {
    bookmarkRepository = getCustomRepository(BookmarkRepository);
  });

  describe('get bookmarks', () => {
    const { user, authRequest } = createAuthenticatedUser(server);

    let information: Information;
    let reaction1: Reaction;
    let reaction2: Reaction;
    let reaction3: Reaction;
    let reaction4: Reaction;

    beforeAll(async () => {
      information = await createInformation();
      reaction1 = await createReaction();
      reaction2 = await createReaction({ information });
      reaction3 = await createReaction({ information });
      reaction4 = await createReaction({ information });

      await createBookmark({ user, reaction: reaction1 });
      await createBookmark({ user, reaction: reaction2 });
      await createBookmark({ user, reaction: reaction3 });
      await createBookmark({ user, reaction: reaction4 });
    });

    it('should not fetch bookmarks when not authenticated', () => {
      return request(server)
        .get('/api/bookmark/me')
        .expect(403);
    });

    it('should fetch the bookmarks for a user on the first page', async () => {
      const { body } = await authRequest
        .get('/api/bookmark/me')
        .expect(200);

      expect(body).toMatchObject({
        items: [
          { id: reaction4.id, information: { id: information.id } },
          { id: reaction3.id, information: { id: information.id } },
        ],
        total: 4,
      });
    });

    it('should fetch the bookmarks for a user on page 2', async () => {
      const { body } = await authRequest
        .get('/api/bookmark/me')
        .query({ page: 2 })
        .expect(200);

      expect(body).toMatchObject({
        items: [
          { id: reaction2.id, information: { id: information.id } },
          { id: reaction1.id, information: { id: expect.anything() } },
        ],
        total: 4,
      });
    });

    it('should fetch the bookmarks for a user for an information on the first page', async () => {
      const { body } = await authRequest
        .get('/api/bookmark/me')
        .query({ informationId: information.id })
        .expect(200);

      expect(body).toMatchObject({
        items: [
          { id: reaction4.id, information: { id: information.id } },
          { id: reaction3.id, information: { id: information.id } },
        ],
        total: 3,
      });
    });

    it('should fetch the bookmarks for a user for an information on page 2', async () => {
      const { body } = await authRequest
        .get('/api/bookmark/me/')
        .query({ informationId: information.id, page: 2 })
        .expect(200);

      expect(body).toMatchObject({
        items: [
          { id: reaction2.id, information: { id: information.id } },
        ],
        total: 3,
      });
    });

  });

  describe('create bookmark', () => {
    const { user, authRequest } = createAuthenticatedUser(server);

    it('should not create a bookmark when not authenticated', async () => {
      const reaction = await createReaction();

      return request(server)
        .post(`/api/bookmark/${reaction.id}`)
        .expect(403);
    });

    it('should not create a bookmark for a reaction that does not exist', async () => {
      return authRequest
        .post('/api/bookmark/404')
        .expect(404);
    });

    it('should not create an already existing bookmark', async () => {
      const reaction = await createReaction();
      await createBookmark({ user, reaction });

      return authRequest
        .post(`/api/bookmark/${reaction.id}`)
        .expect(409);
    });

    it('should create a bookmark', async () => {
      const reaction = await createReaction();

      await authRequest
        .post(`/api/bookmark/${reaction.id}`)
        .expect(201);

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

  describe('remove bookmark', () => {
    const { user, authRequest } = createAuthenticatedUser(server);

    it('should not remove a bookmark when not authenticated', async () => {
      const reaction = await createReaction();
      await createBookmark({ user, reaction });

      return request(server)
        .delete(`/api/bookmark/${reaction.id}`)
        .expect(403);
    });

    it('should not remove a bookmark that does not exist', async () => {
      return authRequest
        .delete('/api/bookmark/404')
        .expect(404);
    });

    it('should remove a bookmark', async () => {
      const reaction = await createReaction();
      await createBookmark({ user, reaction });

      await authRequest
        .delete(`/api/bookmark/${reaction.id}`)
        .expect(204);

      const bookmarkDb = await bookmarkRepository.findOne({ user, reaction });

      expect(bookmarkDb).not.toBeDefined();
    });

  });

});
