import request from 'supertest';
import { getRepository, Repository } from 'typeorm';

import { createAuthenticatedModerator, createAuthenticatedUser, setupE2eTest } from '../../../testing/setup-e2e-test';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { CommentsArea } from '../comments-area.entity';

import { CommentsAreaRequest, CommentsAreaRequestStatus } from './comments-area-request.entity';
import { CommentsAreaRequestFactory } from './comments-area-request.factory';
import { CommentsAreaRequestModule } from './comments-area-request.module';

describe('comments area request controller', () => {

  const { server, getTestingModule } = setupE2eTest({
    imports: [AuthenticationModule, CommentsAreaRequestModule],
  });

  let commentsAreaRepository: Repository<CommentsArea>;
  let commentsAreaRequestRepository: Repository<CommentsAreaRequest>;

  let createCommentsAreaRequest: CommentsAreaRequestFactory['create'];

  let commentsAreaRequest: CommentsAreaRequest;

  beforeAll(async () => {
    const module = getTestingModule();

    commentsAreaRepository = getRepository(CommentsArea);
    commentsAreaRequestRepository = getRepository(CommentsAreaRequest);

    const commentsAreaRequestFactory = module.get<CommentsAreaRequestFactory>(CommentsAreaRequestFactory);

    createCommentsAreaRequest = commentsAreaRequestFactory.create.bind(commentsAreaRequestFactory);

    commentsAreaRequest = await createCommentsAreaRequest();
  });

  describe('list pending requests', () => {
    const [asUser] = createAuthenticatedUser(server);
    const [asModerator] = createAuthenticatedModerator(server);

    it('should not list pending requests when not a moderator', async () => {
      await request(server).get('/api/comments-area-request').expect(403);
      await asUser.get('/api/comments-area-request').expect(403);
    });

    it('should list pending requests', async () => {
      const { body } = await asModerator
        .get('/api/comments-area-request')
        .expect(200);

      expect(body).toMatchObject({
        total: 1,
        items: [
          { id: commentsAreaRequest.id },
        ],
      });
    });

  });

  describe('create a new request', () => {
    const [asUser1, user1] = createAuthenticatedUser(server);
    const [asUser2, user2] = createAuthenticatedUser(server);

    it('should not request to open a new comments area when not authenticated', async () => {
      await request(server).get('/api/comments-area-request').expect(403);
    });

    it('should request to create a new comment area', async () => {
      const { body } = await asUser1
        .post('/api/comments-area-request')
        .send({ identifier: 'id:1'})
        .expect(201);

      expect(body).toMatchObject({
        identifier: 'id:1',
      });

      const request1Db = await commentsAreaRequestRepository.findOne(body.id);

      expect(request1Db).toMatchObject({
        id: body.id,
        status: CommentsAreaRequestStatus.PENDING,
      });

      await asUser2
        .post('/api/comments-area-request')
        .send({ identifier: 'id:1'})
        .expect(201);
    });

    it('should not be possible to request to create the same comment area twice', async () => {
      await asUser1
        .post('/api/comments-area-request')
        .send({ identifier: 'id:1' })
        .expect(400);
    });

  });

  describe('reject a request', () => {
    const [asUser] = createAuthenticatedUser(server);
    const [asModerator] = createAuthenticatedModerator(server);

    it('should not reject a request when not a moderator', async () => {
      await request(server).post('/api/comments-area-request/42/reject').expect(403);
      await asUser.post('/api/comments-area-request/42/reject').expect(403);
    });

    it('should reject a request', async () => {
      const request = await createCommentsAreaRequest();

      await asModerator
        .post(`/api/comments-area-request/${request.id}/reject`)
        .expect(200);

      const requestDb = await commentsAreaRequestRepository.findOne(request.id);

      expect(requestDb).toMatchObject({
        status: CommentsAreaRequestStatus.REFUSED,
      });
    });

  });

});
