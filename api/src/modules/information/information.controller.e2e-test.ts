import request from 'supertest';
import { getCustomRepository } from 'typeorm';

import { createAuthenticatedAdmin, createAuthenticatedUser, setupE2eTest } from '../../testing/setup-e2e-test';
import { AuthenticationModule } from '../authentication/authentication.module';
import { Comment } from '../comment/comment.entity';
import { CommentFactory } from '../comment/comment.factory';

import { Information } from './information.entity';
import { InformationFactory } from './information.factory';
import { InformationModule } from './information.module';
import { InformationRepository } from './information.repository';

describe('information controller', () => {

  const { server, getTestingModule } = setupE2eTest({
    imports: [InformationModule, AuthenticationModule],
  }, moduleBuilder => {
    moduleBuilder
      .overrideProvider('INFORMATION_PAGE_SIZE')
      .useValue(2)
      .overrideProvider('COMMENT_PAGE_SIZE')
      .useValue(2);
  });

  let createInformation: InformationFactory['create'];
  let createComment: CommentFactory['create'];

  let information1: Information;
  let information2: Information;
  let information3: Information;

  let comment1: Comment;
  let comment2: Comment;
  let comment3: Comment;
  let comment4: Comment;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let comment5: Comment;

  let informationRepository: InformationRepository;

  /*
    - information1
      - comment1 (message1 search wow)
      - comment2
        - comment3 (searching message3)
      - comment4

    - information2
      - comment5 (message5 search)

    - information3
  */

  beforeAll(async () => {
    const module = getTestingModule();
    const informationFactory = module.get<InformationFactory>(InformationFactory);
    const commentFactory = module.get<CommentFactory>(CommentFactory);

    createInformation = informationFactory.create.bind(informationFactory);
    createComment = commentFactory.create.bind(commentFactory);

    informationRepository = getCustomRepository(InformationRepository);

    information1 = await createInformation({ title: 'title', url: 'url', imageUrl: 'imageUrl' });
    information2 = await createInformation({ title: 'search me' });
    information3 = await createInformation();

    comment1 = await createComment({ information: information1, text: 'message1 search wow' });
    comment2 = await createComment({ information: information1 });
    comment3 = await createComment({ information: information1, text: 'searching message3', parent: comment2 });
    comment4 = await createComment({ information: information1 });
    comment5 = await createComment({ information: information2, text: 'message5 search' });
  });

  describe('list informations', () => {

    it('should list all informations', async () => {
      return request(server)
        .get('/api/information')
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            items: [
              { id: information1.id, commentsCount: 4 },
              { id: information2.id, commentsCount: 1 },
            ],
            total: 3,
          });
        });
    });

    it('should list all informations on page 2', async () => {
      return request(server)
        .get('/api/information')
        .query({ page: 2 })
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            items: [
              { id: information3.id, commentsCount: 0 },
            ],
            total: 3,
          });
        });
    });

    it('should search informations', async () => {
      return request(server)
        .get('/api/information')
        .query({ search: 'search' })
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            items: [
              { id: information2.id },
            ],
            total: 1,
          });
        });
    });

  });

  describe('get information', () => {

    it('should not find an information with unexisting id', () => {
      return request(server)
        .get('/api/information/4')
        .expect(404);
    });

    it('should fetch an information by id', () => {
      return request(server)
        .get(`/api/information/${information1.id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            id: information1.id,
            title: 'title',
            url: 'url',
            imageUrl: 'imageUrl',
            commentsCount: 4,
          });
        });
    });

    it('should not find an information with unexisting identifier', () => {
      return request(server)
        .get(`/api/information/by-identifier/${encodeURIComponent('id:unexisting')}`)
        .expect(404);
    });

    it('should fetch an information by identifier', () => {
      return request(server)
        .get(`/api/information/by-identifier/${encodeURIComponent(information1.identifier)}`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            id: information1.id,
          });
        });
    });

  });

  describe('get root comments', () => {

    it('should not find comments for an information that does not exist', () => {
      return request(server)
        .get('/api/information/4/comments')
        .expect(404);
    });

    it('should fetch the root comments', () => {
      return request(server)
        .get(`/api/information/${information1.id}/comments`)
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
        .get(`/api/information/${information1.id}/comments`)
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
        .get(`/api/information/${information1.id}/comments?sort=date-asc`)
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
        .get(`/api/information/${information1.id}/comments?search=search`)
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

  describe('create information', () => {
    const [userRequest] = createAuthenticatedUser(server);
    const [adminRequest] = createAuthenticatedAdmin(server);

    const info = {
      title: 'title',
      identifier: 'id:someIdentifier',
      published: new Date(2020, 0, 1).toJSON(),
      url: 'https://info.url',
      imageUrl: 'https://image.url',
    };

    it('should not create an information when unauthenticated', () => {
      return request(server)
        .post('/api/information')
        .send(info)
        .expect(403);
    });

    it('should not create an information when not an admin', () => {
      return userRequest
        .post('/api/information')
        .send(info)
        .expect(403);
    });

    it('should not create an information with missing title', () => {
      const data = { ...info };
      delete data.title;

      return adminRequest
        .post('/api/information')
        .send(data)
        .expect(400);
    });

    it('should not create an information with missing identifier', () => {
      const data = { ...info };
      delete data.identifier;

      return adminRequest
        .post('/api/information')
        .send(data)
        .expect(400);
    });

    it('should create an information', async () => {
      const { body } = await adminRequest
        .post('/api/information')
        .send(info)
        .expect(201);

      expect(body).toMatchObject(info);

      const infoDb = await informationRepository.findOne(body.id);

      expect(infoDb).toMatchObject({
        title: 'title',
        identifier: 'id:someIdentifier',
        url: 'https://info.url',
        published: '2020-01-01',
        imageUrl: 'https://image.url',
      });
    });
  });

  describe('update information', () => {
    const [userRequest] = createAuthenticatedUser(server);
    const [adminRequest] = createAuthenticatedAdmin(server);

    let info: Information;

    beforeAll(async () => {
      info = await createInformation();
    });

    it('should not update an information when unauthenticated', () => {
      return request(server)
        .put(`/api/information/${info.id}`)
        .send(info)
        .expect(403);
    });

    it('should not update an information when not an admin', () => {
      return userRequest
        .put(`/api/information/${info.id}`)
        .send(info)
        .expect(403);
    });

    it('should not update an information that does not exist', () => {
      return adminRequest
        .put('/api/information/404')
        .send({})
        .expect(404);
    });

    it('should update an information', async () => {
      const data = {
        identifier: 'id:someOtherIdentifier',
        url: 'https://other.url',
        published: new Date(2020, 0, 1).toJSON(),
        imageUrl: 'https://image.url',
      };

      const { body } = await adminRequest
        .put(`/api/information/${info.id}`)
        .send(data)
        .expect(200);

      expect(body).toMatchObject(data);

      const infoDb = await informationRepository.findOne(body.id);

      expect(infoDb).toMatchObject({
        ...data,
        published: '2020-01-01',
      });
    });
  });

});
