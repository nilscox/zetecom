import request from 'supertest';
import { getCustomRepository, getRepository, Repository } from 'typeorm';

import { AuthenticationModule } from 'src/modules/authentication/authentication.module';
import { CommentFactory } from 'src/modules/comment/comment.factory';

import { createAuthenticatedAdmin, createAuthenticatedUser, setupE2eTest } from '../../testing/setup-e2e-test';

import { CommentsArea, CommentsAreaStatus } from './comments-area.entity';
import { CommentsAreaFactory } from './comments-area.factory';
import { CommentsAreaModule } from './comments-area.module';
import { CommentsAreaRepository } from './comments-area.repository';
import { CommentsAreaInformation, MediaType } from './comments-area-information.entity';
import { CommentsAreaInformationFactory } from './comments-area-information.factory';
import { CommentsAreaIntegration } from './comments-area-integration/comments-area-integration.entity';
import { CommentsAreaIntegrationFactory } from './comments-area-integration/comments-area-integration.factory';

describe('comments area controller', () => {
  const { server } = setupE2eTest({
    imports: [CommentsAreaModule, AuthenticationModule],
  });

  const commentsAreaFactory = new CommentsAreaFactory();
  const commentFactory = new CommentFactory();
  const commentsAreaInformationFactory = new CommentsAreaInformationFactory();
  const commentsAreaIntegrationFactory = new CommentsAreaIntegrationFactory();

  let commentsAreaRepository: CommentsAreaRepository;
  let commentsAreaIntegrationRepository: Repository<CommentsAreaIntegration>;

  beforeAll(() => {
    commentsAreaRepository = getCustomRepository(CommentsAreaRepository);
    commentsAreaIntegrationRepository = getRepository(CommentsAreaIntegration);
  });

  describe('list comments areas', () => {
    let commentsArea1: CommentsArea;
    let commentsArea2: CommentsArea;
    let commentsArea3: CommentsArea;

    beforeAll(async () => {
      commentsArea1 = await commentsAreaFactory.create({
        information: await commentsAreaInformationFactory.create({ author: 'search' }),
      });

      commentsArea2 = await commentsAreaFactory.create({
        information: await commentsAreaInformationFactory.create({ title: 'you searched me' }),
      });

      commentsArea3 = await commentsAreaFactory.create();

      await commentsAreaFactory.create({ status: CommentsAreaStatus.requested });
    });

    it('lists all comments areas', async () => {
      const { body } = await request(server).get('/api/comments-area').expect(200);

      expect(body).toMatchObject({
        items: [{ id: commentsArea3.id }, { id: commentsArea2.id }, { id: commentsArea1.id }],
        total: 3,
      });
    });

    it('limits the page size to 50', async () => {
      await request(server).get('/api/comments-area').query({ pageSize: 50 }).expect(200);
      await request(server).get('/api/comments-area').query({ pageSize: 51 }).expect(400);
    });

    it('lists all comments areas paginated', async () => {
      const { body: page1 } = await request(server).get('/api/comments-area').query({ pageSize: 2 }).expect(200);

      expect(page1).toMatchObject({
        items: [{ id: commentsArea3.id }, { id: commentsArea2.id }],
        total: 3,
      });

      const { body: page2 } = await request(server)
        .get('/api/comments-area')
        .query({ pageSize: 2, page: 2 })
        .expect(200);

      expect(page2).toMatchObject({
        items: [{ id: commentsArea1.id }],
        total: 3,
      });
    });

    it('searches the comments areas', async () => {
      const { body } = await request(server).get('/api/comments-area').query({ search: 'search' }).expect(200);

      expect(body).toMatchObject({
        items: [{ id: commentsArea2.id }, { id: commentsArea1.id }],
        total: 2,
      });
    });
  });

  describe('get comments area', () => {
    let commentsArea: CommentsArea;

    beforeAll(async () => {
      commentsArea = await commentsAreaFactory.create();

      await commentFactory.create({ commentsArea });
    });

    it('does not find a comments area with unexisting id', async () => {
      await request(server).get('/api/comments-area/42').expect(404);
    });

    it('fetches a comments area by id', async () => {
      const { body } = await request(server).get(`/api/comments-area/${commentsArea.id}`).expect(200);

      expect(body).toMatchObject({
        id: commentsArea.id,
        status: CommentsAreaStatus.open,
        commentsCount: 1,
      });
    });
  });

  describe('get comments area by identifier', () => {
    let commentsArea: CommentsArea;
    let commentsAreaIntegration: CommentsAreaIntegration;

    beforeAll(async () => {
      commentsArea = await commentsAreaFactory.create();
      commentsAreaIntegration = await commentsAreaIntegrationFactory.create({ commentsArea, identifier: 'test:1' });
    });

    it('should not get a comments area for an unexisting identifier', async () => {
      await request(server).get('/api/comments-area/by-identifier/unexisting').expect(404);
    });

    it('should get a comments area from its identifier', async () => {
      const { body } = await request(server)
        .get(`/api/comments-area/by-identifier/${commentsAreaIntegration.identifier}`)
        .expect(200);

      expect(body).toHaveProperty('id', commentsArea.id);
    });
  });

  describe('create comments area', () => {
    const [asUser] = createAuthenticatedUser(server);

    it('does not create a comments area when unauthenticated', async () => {
      await request(server).post('/api/comments-area').expect(403);
    });

    it('creates a comments area', async () => {
      const { body } = await asUser.post('/api/comments-area').expect(201);

      expect(body).toMatchObject({
        status: CommentsAreaStatus.requested,
      });

      const commentsAreaDb = await commentsAreaRepository.findOne(body.id);

      expect(commentsAreaDb).toBeDefined();
    });

    it('creates an integration along with the comments area', async () => {
      const identifier = 'test:2';

      const { body } = await asUser.post('/api/comments-area').send({ integrationIdentifier: identifier }).expect(201);

      const integration = await commentsAreaIntegrationRepository.findOne({
        where: {
          commentsArea: { id: body.id },
        },
        relations: ['commentsArea'],
      });

      expect(integration).toMatchObject({
        identifier,
      });
    });
  });

  describe("create or update a comments area's information", () => {
    const [userRequest] = createAuthenticatedUser(server);
    const [adminRequest] = createAuthenticatedAdmin(server);

    let commentsArea: CommentsArea;

    beforeAll(async () => {
      commentsArea = await commentsAreaFactory.create();
    });

    it('does not create a comments area when unauthenticated', async () => {
      await request(server).put(`/api/comments-area/${commentsArea.id}/information`).send(commentsArea).expect(403);
    });

    it('does not create a comments area when not an admin', async () => {
      await userRequest.put(`/api/comments-area/${commentsArea.id}/information`).send(commentsArea).expect(403);
    });

    it('does not create a comments area that does not exist', async () => {
      await adminRequest.put('/api/comments-area/404/information').send({}).expect(404);
    });

    it('creates a comments area information', async () => {
      const commentsArea = await commentsAreaFactory.create();

      const data: Partial<CommentsAreaInformation> = {
        media: MediaType.lepoint,
        url: 'https://some.url',
        title: 'title',
        author: 'someone',
        publicationDate: new Date(2020, 0, 1).toISOString(),
      };

      const { body } = await adminRequest
        .put(`/api/comments-area/${commentsArea.id}/information`)
        .send(data)
        .expect(200);

      expect(body).toMatchObject({ information: data });

      const { information } = await commentsAreaRepository.findOne(body.id);

      expect(information).toMatchObject(data);
    });

    it('updates a comments area information', async () => {
      const commentsArea = await commentsAreaFactory.create({
        information: await commentsAreaInformationFactory.create({
          media: MediaType.francesoir,
          url: 'https://some.url',
          title: 'title',
          author: 'someone',
          publicationDate: new Date(2020, 0, 1).toISOString(),
        }),
      });

      const data: Partial<CommentsAreaInformation> = {
        media: MediaType.leparisien,
        author: 'someone else',
        publicationDate: new Date(2020, 1, 1).toISOString(),
      };

      const { body } = await adminRequest
        .put(`/api/comments-area/${commentsArea.id}/information`)
        .send(data)
        .expect(200);

      expect(body).toMatchObject({ information: data });

      const { information } = await commentsAreaRepository.findOne(body.id);

      expect(information).toMatchObject(data);
      expect(information.updated).not.toEqual(information.created);
    });
  });
});
