import request from 'supertest';
import { getCustomRepository } from 'typeorm';

import {
  createAuthenticatedAdmin,
  createAuthenticatedModerator,
  createAuthenticatedUser,
  setupE2eTest,
} from '../../testing/setup-e2e-test';
import { AuthenticationModule } from '../authentication/authentication.module';
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

  let commentsAreaRepository: CommentsAreaRepository;

  beforeAll(async () => {
    commentsAreaRepository = getCustomRepository(CommentsAreaRepository);
  });

  describe('list comment areas', () => {
    let commentsArea1: CommentsArea;
    let commentsArea2: CommentsArea;
    let commentsArea3: CommentsArea;

    beforeAll(async () => {
      commentsArea1 = await commentsAreaFactory.create();
      commentsArea2 = await commentsAreaFactory.create({ informationTitle: 'search me' });
      commentsArea3 = await commentsAreaFactory.create();
    });

    it('should list all comment areas', async () => {
      const { body } = await request(server).get('/api/comments-area').expect(200);

      expect(body).toMatchObject({
        items: [{ id: commentsArea3.id }, { id: commentsArea2.id }],
        total: 3,
      });
    });

    it('should list all comment areas on page 2', async () => {
      const { body } = await request(server).get('/api/comments-area').query({ page: 2 }).expect(200);

      expect(body).toMatchObject({
        items: [{ id: commentsArea1.id }],
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
    let commentsArea: CommentsArea;

    beforeAll(async () => {
      commentsArea = await commentsAreaFactory.create({
        identifier: 'test:1',
        informationTitle: 'title',
        informationUrl: 'url',
        informationAuthor: 'author',
        imageUrl: 'imageUrl',
        published: new Date(2020, 1, 10),
      });

      await commentFactory.create({ commentsArea });
    });

    it('should not find a comment area with unexisting id', async () => {
      await request(server).get('/api/comments-area/42').expect(404);
    });

    it('should fetch a comment area by id', async () => {
      const { body } = await request(server).get(`/api/comments-area/${commentsArea.id}`).expect(200);

      expect(body).toMatchObject({
        id: commentsArea.id,
        identifier: 'test:1',
        informationTitle: 'title',
        informationUrl: 'url',
        informationAuthor: 'author',
        imageUrl: 'imageUrl',
        published: '2020-02-10',
        commentsCount: 1,
      });
    });

    it('should not find a comment area with unexisting identifier', async () => {
      await request(server)
        .get(`/api/comments-area/by-identifier/${encodeURIComponent('id:unexisting')}`)
        .expect(404);
    });

    it('should fetch a comment area by identifier', async () => {
      const { body } = await request(server)
        .get(`/api/comments-area/by-identifier/${encodeURIComponent(commentsArea.identifier)}`)
        .expect(200);

      expect(body).toMatchObject({
        id: commentsArea.id,
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
      const data: Partial<typeof commentsArea> = { ...commentsArea };
      delete data.informationTitle;

      await asModerator.post('/api/comments-area').send(data).expect(400);
    });

    it('should not create a comment area with missing identifier', async () => {
      const data: Partial<typeof commentsArea> = { ...commentsArea };
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
