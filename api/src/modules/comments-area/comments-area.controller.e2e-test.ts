import request from 'supertest';
import { getCustomRepository, getRepository, Repository } from 'typeorm';

import { AuthenticationModule } from 'src/modules/authentication/authentication.module';
import { CommentFactory } from 'src/modules/comment/comment.factory';

import {
  createAuthenticatedAdmin,
  createAuthenticatedModerator,
  createAuthenticatedUser,
  setupE2eTest,
} from '../../testing/setup-e2e-test';

import { CommentsArea, CommentsAreaStatus } from './comments-area.entity';
import { CommentsAreaFactory } from './comments-area.factory';
import { CommentsAreaModule } from './comments-area.module';
import { CommentsAreaRepository } from './comments-area.repository';
import { CommentsAreaIntegration } from './comments-area-integration/comments-area-integration.entity';
import { CommentsAreaIntegrationFactory } from './comments-area-integration/comments-area-integration.factory';
import { CommentsAreaRequest, CommentsAreaRequestStatus } from './comments-area-request/comments-area-request.entity';
import { CommentsAreaRequestFactory } from './comments-area-request/comments-area-request.factory';

describe('comments area controller', () => {
  const { server } = setupE2eTest({
    imports: [CommentsAreaModule, AuthenticationModule],
  });

  const commentsAreaFactory = new CommentsAreaFactory();
  const commentFactory = new CommentFactory();
  const commentsAreaIntegrationFactory = new CommentsAreaIntegrationFactory();
  const commentsAreaRequestFactory = new CommentsAreaRequestFactory();

  let commentsAreaRepository: CommentsAreaRepository;
  let commentsAreaRequestRepository: Repository<CommentsAreaRequest>;
  let commentsAreaIntegrationRepository: Repository<CommentsAreaIntegration>;

  beforeAll(() => {
    commentsAreaRepository = getCustomRepository(CommentsAreaRepository);
    commentsAreaRequestRepository = getRepository(CommentsAreaRequest);
    commentsAreaIntegrationRepository = getRepository(CommentsAreaIntegration);
  });

  describe('list comments areas', () => {
    let commentsArea1: CommentsArea;
    let commentsArea2: CommentsArea;
    let commentsArea3: CommentsArea;
    let commentsArea4: CommentsArea;

    beforeAll(async () => {
      commentsArea1 = await commentsAreaFactory.create();
      commentsArea2 = await commentsAreaFactory.create({ informationTitle: 'search me' });
      commentsArea3 = await commentsAreaFactory.create();
      commentsArea4 = await commentsAreaFactory.create({ status: CommentsAreaStatus.requested });
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
      await request(server).get('/api/comments-area').query({ pageSize: 51 }).expect(418);
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

    it('searches comments areas', async () => {
      const { body } = await request(server).get('/api/comments-area').query({ search: 'search' }).expect(200);

      expect(body).toMatchObject({
        items: [{ id: commentsArea2.id }],
        total: 1,
      });
    });
  });

  describe('get comments area', () => {
    let commentsArea: CommentsArea;

    beforeAll(async () => {
      commentsArea = await commentsAreaFactory.create({
        informationTitle: 'title',
        informationUrl: 'url',
        informationAuthor: 'author',
        informationPublicationDate: new Date(2020, 1, 10),
      });

      await commentFactory.create({ commentsArea });
    });

    it('should not find a comments area with unexisting id', async () => {
      await request(server).get('/api/comments-area/42').expect(404);
    });

    it('should fetch a comments area by id', async () => {
      const { body } = await request(server).get(`/api/comments-area/${commentsArea.id}`).expect(200);

      expect(body).toMatchObject({
        id: commentsArea.id,
        commentsCount: 1,
        information: {
          title: 'title',
          url: 'url',
          author: 'author',
          publicationDate: '2020-02-10',
        },
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
    const [userRequest] = createAuthenticatedUser(server);
    const [asModerator] = createAuthenticatedModerator(server);

    const commentsArea = {
      informationUrl: 'https://info.url',
      informationTitle: 'title',
      informationAuthor: 'author',
      informationPublicationDate: new Date(2020, 0, 1).toJSON(),
    };

    it('should not create a comments area when unauthenticated', async () => {
      await request(server).post('/api/comments-area').send(commentsArea).expect(403);
    });

    it('should not create a comments area when not an admin', async () => {
      await userRequest.post('/api/comments-area').send(commentsArea).expect(403);
    });

    it('should not create a comments area with missing information title', async () => {
      const data: Partial<typeof commentsArea> = { ...commentsArea };
      delete data.informationTitle;

      await asModerator.post('/api/comments-area').send(data).expect(400);
    });

    it('should not create a comments area with missing information url', async () => {
      const data: Partial<typeof commentsArea> = { ...commentsArea };
      delete data.informationUrl;

      await asModerator.post('/api/comments-area').send(data).expect(400);
    });

    it('should create a comments area', async () => {
      const { body } = await asModerator.post('/api/comments-area').send(commentsArea).expect(201);

      expect(body).toMatchObject({
        information: {
          url: commentsArea.informationUrl,
          title: commentsArea.informationTitle,
          author: commentsArea.informationAuthor,
          publicationDate: '2020-01-01T00:00:00.000Z',
        },
      });

      const commentsAreaDb = await commentsAreaRepository.findOne(body.id);

      expect(commentsAreaDb).toMatchObject({
        ...commentsArea,
        informationPublicationDate: '2020-01-01',
      });
    });

    it('should approve related requests after creating a comments area', async () => {
      const informationUrl = commentsArea.informationUrl;

      const request = await commentsAreaRequestFactory.create({ informationUrl });

      await asModerator.post('/api/comments-area').send(commentsArea).expect(201);

      const requestDb = await commentsAreaRequestRepository.findOne(request.id);

      expect(requestDb).toHaveProperty('status', CommentsAreaRequestStatus.APPROVED);
    });

    it('should create an integration along with the comments area', async () => {
      const identifier = 'test:2';

      const { body } = await asModerator
        .post('/api/comments-area')
        .send({ ...commentsArea, integrationIdentifier: identifier })
        .expect(201);

      const [integration] = await commentsAreaIntegrationRepository.find({
        where: {
          commentsArea: { id: body.id },
        },
        relations: ['commentsArea'],
      });

      expect(integration).toBeDefined();
      expect(integration).toHaveProperty('identifier', identifier);
    });
  });

  describe('update comments area', () => {
    const [userRequest] = createAuthenticatedUser(server);
    const [adminRequest] = createAuthenticatedAdmin(server);

    let commentsArea: CommentsArea;

    beforeAll(async () => {
      commentsArea = await commentsAreaFactory.create();
    });

    it('should not update a comments area when unauthenticated', async () => {
      await request(server).put(`/api/comments-area/${commentsArea.id}`).send(commentsArea).expect(403);
    });

    it('should not update a comments area when not an admin', async () => {
      await userRequest.put(`/api/comments-area/${commentsArea.id}`).send(commentsArea).expect(403);
    });

    it('should not update a comments area that does not exist', async () => {
      await adminRequest.put('/api/comments-area/404').send({}).expect(404);
    });

    it('should update a comments area', async () => {
      const data = {
        informationUrl: 'https://other.url',
        informationAuthor: 'someone',
        informationPublicationDate: new Date(2020, 0, 1).toISOString(),
      };

      const { body } = await adminRequest.put(`/api/comments-area/${commentsArea.id}`).send(data).expect(200);

      expect(body).toMatchObject({
        information: {
          url: data.informationUrl,
          author: data.informationAuthor,
          publicationDate: '2020-01-01',
        },
      });

      const commentsAreaDb = await commentsAreaRepository.findOne(body.id);

      expect(commentsAreaDb).toMatchObject({
        ...data,
        informationPublicationDate: '2020-01-01',
      });
    });
  });
});
