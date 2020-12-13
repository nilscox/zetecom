import request from 'supertest';
import { getRepository, Repository } from 'typeorm';

import { createAuthenticatedModerator, createAuthenticatedUser, setupE2eTest } from '../../../testing/setup-e2e-test';
import { AuthenticationModule } from '../../authentication/authentication.module';

import { CommentsAreaRequest, CommentsAreaRequestStatus } from './comments-area-request.entity';
import { CommentsAreaRequestFactory } from './comments-area-request.factory';
import { CommentsAreaRequestModule } from './comments-area-request.module';

describe('comments area request controller', () => {
  const { server } = setupE2eTest({
    imports: [AuthenticationModule, CommentsAreaRequestModule],
  });

  let commentsAreaRequestRepository: Repository<CommentsAreaRequest>;

  const commentsAreaRequestFactory = new CommentsAreaRequestFactory();

  beforeAll(() => {
    commentsAreaRequestRepository = getRepository(CommentsAreaRequest);
  });

  describe('list pending requests', () => {
    let commentsAreaRequest: CommentsAreaRequest;

    beforeAll(async () => {
      commentsAreaRequest = await commentsAreaRequestFactory.create();
    });

    const [asUser] = createAuthenticatedUser(server);
    const [asModerator] = createAuthenticatedModerator(server);

    it('should not list pending requests when not a moderator', async () => {
      await request(server).get('/api/comments-area-request').expect(403);
      await asUser.get('/api/comments-area-request').expect(403);
    });

    it('should list pending requests', async () => {
      const { body } = await asModerator.get('/api/comments-area-request').expect(200);

      expect(body).toMatchObject({
        total: 1,
        items: [{ id: commentsAreaRequest.id }],
      });
    });
  });

  describe('create a new request', () => {
    const [asUser1, user1] = createAuthenticatedUser(server);
    const [asUser2] = createAuthenticatedUser(server);

    const informationUrl = 'https://info.url/articles/1';

    it('should not request to open a new comments area when not authenticated', async () => {
      await request(server).get('/api/comments-area-request').expect(403);
    });

    it('should request to create a new comment area', async () => {
      const { body } = await asUser1.post('/api/comments-area-request').send({ informationUrl }).expect(201);

      expect(body).toMatchObject({ informationUrl });

      const request1Db = await commentsAreaRequestRepository.findOne(body.id);

      expect(request1Db).toMatchObject({
        id: body.id,
        requester: { id: user1.id },
        status: CommentsAreaRequestStatus.PENDING,
      });
    });

    it('should be possible to request to create the same comment area twice', async () => {
      await asUser1.post('/api/comments-area-request').send({ informationUrl }).expect(201);
    });

    it('should request to open the same comments area from another user', async () => {
      await asUser2.post('/api/comments-area-request').send({ informationUrl }).expect(201);
    });

    it('should request to create a new comments area with full payload', async () => {
      const payload = {
        identifier: 'id:1',
        informationUrl,
        imageUrl: 'https://image.url',
        informationTitle: 'title',
        informationAuthor: 'autor',
        informationPublicationDate: new Date(2020, 1, 10).toISOString(),
      };

      const { body } = await asUser1.post('/api/comments-area-request').send(payload).expect(201);

      expect(body).toMatchObject(payload);
    });
  });

  describe('reject a request', () => {
    const [asUser] = createAuthenticatedUser(server);
    const [asModerator, moderator] = createAuthenticatedModerator(server);

    it('should not reject a request when not a moderator', async () => {
      await request(server).post('/api/comments-area-request/42/reject').expect(403);
      await asUser.post('/api/comments-area-request/42/reject').expect(403);
    });

    it('should reject a request', async () => {
      const request = await commentsAreaRequestFactory.create();

      await asModerator.post(`/api/comments-area-request/${request.id}/reject`).expect(200);

      const requestDb = await commentsAreaRequestRepository.findOne(request.id, { relations: ['moderator'] });

      expect(requestDb).toMatchObject({
        status: CommentsAreaRequestStatus.REFUSED,
        moderator: { id: moderator.id },
      });
    });
  });
});
