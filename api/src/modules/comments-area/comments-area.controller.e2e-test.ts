import request from 'supertest';
import { getCustomRepository } from 'typeorm';

import {
  createAuthenticatedAdmin,
  createAuthenticatedModerator,
  createAuthenticatedUser,
  setupE2eTest,
} from '../../testing/setup-e2e-test';
import { AuthenticationModule } from '../authentication/authentication.module';
import { Comment } from '../comment/comment.entity';
import { CommentFactory } from '../comment/comment.factory';

import { CommentsArea } from './comments-area.entity';
import { CommentsAreaFactory } from './comments-area.factory';
import { CommentsAreaModule } from './comments-area.module';
import { CommentsAreaRepository } from './comments-area.repository';

describe('comments area controller', () => {
  const { server } = setupE2eTest(
    {
      imports: [CommentsAreaModule, AuthenticationModule],
    },
    (moduleBuilder) => {
      moduleBuilder
        .overrideProvider('COMMENTS_AREA_PAGE_SIZE')
        .useValue(2)
        .overrideProvider('COMMENT_PAGE_SIZE')
        .useValue(2);
    },
  );

  const commentsAreaFactory = new CommentsAreaFactory();
  const commentFactory = new CommentFactory();

  let commentsArea1: CommentsArea;
  let commentsArea2: CommentsArea;
  let commentsArea3: CommentsArea;

  let comment1: Comment;
  let comment2: Comment;
  let comment3: Comment;
  let comment4: Comment;
  let comment5: Comment;

  let commentsAreaRepository: CommentsAreaRepository;

  /*
    - commentsArea1
      - comment1 (message1 search wow)
      - comment2
        - comment3 (searching message3)
      - comment4

    - commentsArea2
      - comment5 (message5 search)

    - commentsArea3
  */

  beforeAll(async () => {
    commentsAreaRepository = getCustomRepository(CommentsAreaRepository);

    commentsArea1 = await commentsAreaFactory.create({
      identifier: 'test:1',
      informationTitle: 'title',
      informationUrl: 'url',
      informationAuthor: 'author',
      imageUrl: 'imageUrl',
      published: new Date(2020, 1, 10),
    });
    commentsArea2 = await commentsAreaFactory.create({ informationTitle: 'search me' });
    commentsArea3 = await commentsAreaFactory.create();

    comment1 = await commentFactory.create({ commentsArea: commentsArea1 }, 'message1 search wow');
    comment2 = await commentFactory.create({ commentsArea: commentsArea1 });
    comment3 = await commentFactory.create(
      {
        commentsArea: commentsArea1,
        parent: comment2,
      },
      'searching message3',
    );
    comment4 = await commentFactory.create({ commentsArea: commentsArea1 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    comment5 = await commentFactory.create({ commentsArea: commentsArea2 }, 'message5 search');
  });

  describe('list comment areas', () => {
    it('should list all comment areas', async () => {
      const { body } = await request(server).get('/api/comments-area').expect(200);

      expect(body).toMatchObject({
        items: [
          { id: commentsArea3.id, commentsCount: 0 },
          { id: commentsArea2.id, commentsCount: 1 },
        ],
        total: 3,
      });
    });

    it('should list all comment areas on page 2', async () => {
      const { body } = await request(server).get('/api/comments-area').query({ page: 2 }).expect(200);

      expect(body).toMatchObject({
        items: [{ id: commentsArea1.id, commentsCount: 4 }],
        total: 3,
      });
    });

    it('should search comment areas', async () => {
      const { body } = await request(server).get('/api/comments-area').query({ search: 'search' }).expect(200);

      expect(body).toMatchObject({
        items: [{ id: commentsArea2.id }],
        total: 1,
      });
    });
  });

  describe('get comment area', () => {
    it('should not find a comment area with unexisting id', async () => {
      await request(server).get('/api/comments-area/4').expect(404);
    });

    it('should fetch a comment area by id', async () => {
      const { body } = await request(server).get(`/api/comments-area/${commentsArea1.id}`).expect(200);

      expect(body).toMatchObject({
        id: commentsArea1.id,
        identifier: 'test:1',
        informationTitle: 'title',
        informationUrl: 'url',
        informationAuthor: 'author',
        imageUrl: 'imageUrl',
        published: '2020-02-10',
        commentsCount: 4,
      });
    });

    it('should not find a comment area with unexisting identifier', async () => {
      await request(server)
        .get(`/api/comments-area/by-identifier/${encodeURIComponent('id:unexisting')}`)
        .expect(404);
    });

    it('should fetch a comment area by identifier', async () => {
      const { body } = await request(server)
        .get(`/api/comments-area/by-identifier/${encodeURIComponent(commentsArea1.identifier)}`)
        .expect(200);

      expect(body).toMatchObject({
        id: commentsArea1.id,
      });
    });
  });

  describe('get root comments', () => {
    it('should not find comments for a comment area that does not exist', async () => {
      await request(server).get('/api/comments-area/4/comments').expect(404);
    });

    it('should fetch the root comments', async () => {
      const { body } = await request(server).get(`/api/comments-area/${commentsArea1.id}/comments`).expect(200);

      expect(body).toMatchObject({
        items: [{ id: comment4.id }, { id: comment2.id }],
        total: 3,
      });
    });

    it('should fetch the root comments on page 2', async () => {
      const { body } = await request(server)
        .get(`/api/comments-area/${commentsArea1.id}/comments`)
        .query({ page: 2 })
        .expect(200);

      expect(body).toMatchObject({
        items: [{ id: comment1.id }],
        total: 3,
      });
    });

    it('should fetch the root comments sorted by date asc', async () => {
      const { body } = await request(server)
        .get(`/api/comments-area/${commentsArea1.id}/comments?sort=date-asc`)
        .expect(200);

      expect(body).toMatchObject({
        items: [{ id: comment1.id }, { id: comment2.id }],
        total: 3,
      });
    });

    it('should search from the comments', async () => {
      const { body } = await request(server)
        .get(`/api/comments-area/${commentsArea1.id}/comments?search=search`)
        .expect(200);

      expect(body).toMatchObject({
        items: [{ id: comment3.id }, { id: comment1.id }],
        total: 2,
      });
    });
  });

  describe('create comment area', () => {
    const [userRequest] = createAuthenticatedUser(server);
    const [asModerator] = createAuthenticatedModerator(server);

    const commentsArea = {
      identifier: 'id:someIdentifier',
      informationUrl: 'https://info.url',
      informationTitle: 'title',
      informationAuthor: 'me',
      published: new Date(2020, 0, 1).toJSON(),
      imageUrl: 'https://image.url',
    };

    it('should not create a comment area when unauthenticated', async () => {
      await request(server).post('/api/comments-area').send(commentsArea).expect(403);
    });

    it('should not create a comment area when not an admin', async () => {
      await userRequest.post('/api/comments-area').send(commentsArea).expect(403);
    });

    it('should not create a comment area with missing information title', async () => {
      const data = { ...commentsArea };
      delete data.informationTitle;

      await asModerator.post('/api/comments-area').send(data).expect(400);
    });

    it('should not create a comment area with missing identifier', async () => {
      const data = { ...commentsArea };
      delete data.identifier;

      await asModerator.post('/api/comments-area').send(data).expect(400);
    });

    it('should create a comment area', async () => {
      const { body } = await asModerator.post('/api/comments-area').send(commentsArea).expect(201);

      expect(body).toMatchObject(commentsArea);

      const commentsAreaDb = await commentsAreaRepository.findOne(body.id);

      expect(commentsAreaDb).toMatchObject({
        identifier: 'id:someIdentifier',
        informationUrl: 'https://info.url',
        informationTitle: 'title',
        published: '2020-01-01',
        imageUrl: 'https://image.url',
      });
    });
  });

  describe('update comment area', () => {
    const [userRequest] = createAuthenticatedUser(server);
    const [adminRequest] = createAuthenticatedAdmin(server);

    let commentsArea: CommentsArea;

    beforeAll(async () => {
      commentsArea = await commentsAreaFactory.create();
    });

    it('should not update a comment area when unauthenticated', async () => {
      await request(server).put(`/api/comments-area/${commentsArea.id}`).send(commentsArea).expect(403);
    });

    it('should not update a comment area when not an admin', async () => {
      await userRequest.put(`/api/comments-area/${commentsArea.id}`).send(commentsArea).expect(403);
    });

    it('should not update a comment area that does not exist', async () => {
      await adminRequest.put('/api/comments-area/404').send({}).expect(404);
    });

    it('should update a comment area', async () => {
      const data = {
        identifier: 'id:someOtherIdentifier',
        informationUrl: 'https://other.url',
        published: new Date(2020, 0, 1).toJSON(),
        imageUrl: 'https://image.url',
      };

      const { body } = await adminRequest.put(`/api/comments-area/${commentsArea.id}`).send(data).expect(200);

      expect(body).toMatchObject(data);

      const infoDb = await commentsAreaRepository.findOne(body.id);

      expect(infoDb).toMatchObject({
        ...data,
        published: '2020-01-01',
      });
    });
  });
});
