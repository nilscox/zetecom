import request from 'supertest';

import { createAuthenticatedModerator, createAuthenticatedUser, setupE2eTest } from '../../../testing/setup-e2e-test';
import { AuthenticationModule } from '../../authentication/authentication.module';

import { CommentsAreaRequest } from './comments-area-request.entity';
import { CommentsAreaRequestFactory } from './comments-area-request.factory';
import { CommentsAreaRequestModule } from './comments-area-request.module';

describe('comments area request controller', () => {

  const { server, getTestingModule } = setupE2eTest({
    imports: [AuthenticationModule, CommentsAreaRequestModule],
  });

  let createCommentsAreaRequest: CommentsAreaRequestFactory['create'];

  let commentsAreaRequest: CommentsAreaRequest;

  beforeAll(async () => {
    const module = getTestingModule();

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
    const [asUser1] = createAuthenticatedUser(server);
    const [asUser2] = createAuthenticatedUser(server);

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

});
