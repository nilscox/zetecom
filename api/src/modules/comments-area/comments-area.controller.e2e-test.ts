import request from 'supertest';
import { getCustomRepository, getRepository, Repository } from 'typeorm';

import { createAuthenticatedAdmin, createAuthenticatedUser, setupE2eTest } from '../../testing/setup-e2e-test';
import { AuthenticationModule } from '../authentication/authentication.module';
import { Comment } from '../comment/comment.entity';
import { CommentFactory } from '../comment/comment.factory';

import { CommentsArea } from './comments-area.entity';
import { CommentsAreaFactory } from './comments-area.factory';
import { CommentsAreaModule } from './comments-area.module';
import { CommentsAreaRepository } from './comments-area.repository';
import { OpenCommentsAreaRequest } from './open-comments-area-request.entity';
import { OpenCommentsAreaRequestFactory } from './open-comments-area-request.factory';

describe('comments area controller', () => {

  const { server, getTestingModule } = setupE2eTest({
    imports: [CommentsAreaModule, AuthenticationModule],
  }, moduleBuilder => {
    moduleBuilder
      .overrideProvider('COMMENTS_AREA_PAGE_SIZE')
      .useValue(2)
      .overrideProvider('COMMENT_PAGE_SIZE')
      .useValue(2);
  });

  let createCommentsArea: CommentsAreaFactory['create'];
  let createOpenCommentsAreaRequest: OpenCommentsAreaRequestFactory['create'];
  let createComment: CommentFactory['create'];

  let commentsArea1: CommentsArea;
  let commentsArea2: CommentsArea;
  let commentsArea3: CommentsArea;

  let comment1: Comment;
  let comment2: Comment;
  let comment3: Comment;
  let comment4: Comment;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let comment5: Comment;

  let openCommentsAreaRequest: OpenCommentsAreaRequest;

  let commentsAreaRepository: CommentsAreaRepository;
  let openCommentsAreaRequestRepository: Repository<OpenCommentsAreaRequest>;

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
    const module = getTestingModule();
    const commentsAreaFactory = module.get<CommentsAreaFactory>(CommentsAreaFactory);
    const openCommentsAreaRequestFactory = module.get<OpenCommentsAreaRequestFactory>(OpenCommentsAreaRequestFactory);
    const commentFactory = module.get<CommentFactory>(CommentFactory);

    createCommentsArea = commentsAreaFactory.create.bind(commentsAreaFactory);
    createOpenCommentsAreaRequest = openCommentsAreaRequestFactory.create.bind(commentsAreaFactory);
    createComment = commentFactory.create.bind(commentFactory);

    commentsAreaRepository = getCustomRepository(CommentsAreaRepository);
    openCommentsAreaRequestRepository = getRepository(OpenCommentsAreaRequest);

    commentsArea1 = await createCommentsArea({ informationIitle: 'title', informationUrl: 'url', imageUrl: 'imageUrl' });
    commentsArea2 = await createCommentsArea({ informationIitle: 'search me' });
    commentsArea3 = await createCommentsArea();

    comment1 = await createComment({ commentsArea: commentsArea1, text: 'message1 search wow' });
    comment2 = await createComment({ commentsArea: commentsArea1 });
    comment3 = await createComment({ commentsArea: commentsArea1, text: 'searching message3', parent: comment2 });
    comment4 = await createComment({ commentsArea: commentsArea1 });
    comment5 = await createComment({ commentsArea: commentsArea2, text: 'message5 search' });

    openCommentsAreaRequest = await createOpenCommentsAreaRequest();
  });

  describe('request comment area', () => {

    const [authRequest] = createAuthenticatedUser(server);

    describe('list pending requests', () => {

      it('should list pending requests', async () => {
        const { body } = await authRequest
          .get('/api/comments-area/requests')
          .expect(200);

        expect(body).toMatchObject({
          total: 1,
          items: [
            { id: openCommentsAreaRequest.id },
          ],
        });
      });

    });

    describe('request to open a new comments area', () => {

      it('should request to create a new comment area', async () => {
        const { body } = await authRequest
          .post('/api/comments-area/request')
          .send({ identifier: 'id:1'})
          .expect(201);

        expect(body).toMatchObject({
          identifier: 'id:1',
        });
      });

      it('should not be possible to request to create the same comment area twice', async () => {
        await authRequest
          .post('/api/comments-area/request')
          .send({ identifier: 'id:1' })
          .expect(400);
      });

    });

  });

  describe('list comment areas', () => {

    it('should list all comment areas', async () => {
      return request(server)
        .get('/api/comments-area')
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            items: [
              { id: commentsArea3.id, commentsCount: 0 },
              { id: commentsArea2.id, commentsCount: 1 },
            ],
            total: 3,
          });
        });
    });

    it('should list all comment areas on page 2', async () => {
      return request(server)
        .get('/api/comments-area')
        .query({ page: 2 })
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            items: [
              { id: commentsArea1.id, commentsCount: 4 },
            ],
            total: 3,
          });
        });
    });

    it('should search comment areas', async () => {
      return request(server)
        .get('/api/comments-area')
        .query({ search: 'search' })
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            items: [
              { id: commentsArea2.id },
            ],
            total: 1,
          });
        });
    });

  });

  describe('get comment area', () => {

    it('should not find a comment area with unexisting id', () => {
      return request(server)
        .get('/api/comments-area/4')
        .expect(404);
    });

    it('should fetch a comment area by id', () => {
      return request(server)
        .get(`/api/comments-area/${commentsArea1.id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            id: commentsArea1.id,
            informationTitle: 'title',
            informationUrl: 'url',
            imageUrl: 'imageUrl',
            commentsCount: 4,
          });
        });
    });

    it('should not find a comment area with unexisting identifier', () => {
      return request(server)
        .get(`/api/comments-area/by-identifier/${encodeURIComponent('id:unexisting')}`)
        .expect(404);
    });

    it('should fetch a comment area by identifier', () => {
      return request(server)
        .get(`/api/comments-area/by-identifier/${encodeURIComponent(commentsArea1.identifier)}`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            id: commentsArea1.id,
          });
        });
    });

  });

  describe('get root comments', () => {

    it('should not find comments for a comment area that does not exist', () => {
      return request(server)
        .get('/api/comments-area/4/comments')
        .expect(404);
    });

    it('should fetch the root comments', () => {
      return request(server)
        .get(`/api/comments-area/${commentsArea1.id}/comments`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            items: [
              { id: comment4.id },
              { id: comment2.id },
            ],
            total: 3,
          });
        });
    });

    it('should fetch the root comments on page 2', () => {
      return request(server)
        .get(`/api/comments-area/${commentsArea1.id}/comments`)
        .query({ page: 2 })
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            items: [
              { id: comment1.id },
            ],
            total: 3,
          });
        });
    });

    it('should fetch the root comments sorted by date asc', () => {
      return request(server)
        .get(`/api/comments-area/${commentsArea1.id}/comments?sort=date-asc`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            items: [
              { id: comment1.id },
              { id: comment2.id },
            ],
            total: 3,
          });
        });
    });

    it('should search from the comments', () => {
      return request(server)
        .get(`/api/comments-area/${commentsArea1.id}/comments?search=search`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            items: [
              { id: comment3.id },
              { id: comment1.id },
            ],
            total: 2,
          });
        });
    });

  });

  describe('create comment area', () => {
    const [userRequest] = createAuthenticatedUser(server);
    const [adminRequest] = createAuthenticatedAdmin(server);

    const commentsArea = {
      identifier: 'id:someIdentifier',
      informationUrl: 'https://info.url',
      informationTitle: 'title',
      informationAuthor: 'me',
      published: new Date(2020, 0, 1).toJSON(),
      imageUrl: 'https://image.url',
    };

    it('should not create a comment area when unauthenticated', () => {
      return request(server)
        .post('/api/comments-area')
        .send(commentsArea)
        .expect(403);
    });

    it('should not create a comment area when not an admin', () => {
      return userRequest
        .post('/api/comments-area')
        .send(commentsArea)
        .expect(403);
    });

    it('should not create a comment area with missing information title', () => {
      const data = { ...commentsArea };
      delete data.informationTitle;

      return adminRequest
        .post('/api/comments-area')
        .send(data)
        .expect(400);
    });

    it('should not create a comment area with missing identifier', () => {
      const data = { ...commentsArea };
      delete data.identifier;

      return adminRequest
        .post('/api/comments-area')
        .send(data)
        .expect(400);
    });

    it('should create a comment area', async () => {
      const { body } = await adminRequest
        .post('/api/comments-area')
        .send(commentsArea)
        .expect(201);

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
      commentsArea = await createCommentsArea();
    });

    it('should not update a comment area when unauthenticated', () => {
      return request(server)
        .put(`/api/comments-area/${commentsArea.id}`)
        .send(commentsArea)
        .expect(403);
    });

    it('should not update a comment area when not an admin', () => {
      return userRequest
        .put(`/api/comments-area/${commentsArea.id}`)
        .send(commentsArea)
        .expect(403);
    });

    it('should not update a comment area that does not exist', () => {
      return adminRequest
        .put('/api/comments-area/404')
        .send({})
        .expect(404);
    });

    it('should update a comment area', async () => {
      const data = {
        identifier: 'id:someOtherIdentifier',
        informationUrl: 'https://other.url',
        published: new Date(2020, 0, 1).toJSON(),
        imageUrl: 'https://image.url',
      };

      const { body } = await adminRequest
        .put(`/api/comments-area/${commentsArea.id}`)
        .send(data)
        .expect(200);

      expect(body).toMatchObject(data);

      const infoDb = await commentsAreaRepository.findOne(body.id);

      expect(infoDb).toMatchObject({
        ...data,
        published: '2020-01-01',
      });
    });
  });

});
