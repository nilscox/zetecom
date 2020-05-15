import * as request from 'supertest';
import { getCustomRepository, getRepository, Repository } from 'typeorm';

import { createInformation } from '../../testing/factories/information.factory';
import { createMessage } from '../../testing/factories/message.factory';
import { createReaction } from '../../testing/factories/reaction.factory';
import { createAuthenticatedAdmin, createAuthenticatedUser, setupE2eTest } from '../../testing/setup-e2e-test';
import { AuthenticationModule } from '../authentication/authentication.module';
import { Message } from '../reaction/message.entity';
import { Reaction } from '../reaction/reaction.entity';
import { User } from '../user/user.entity';

import { Information } from './information.entity';
import { InformationModule } from './information.module';
import { InformationRepository } from './information.repository';

describe('information controller', () => {

  const server = setupE2eTest({
    imports: [InformationModule, AuthenticationModule],
  }, moduleBuilder => {
    moduleBuilder
      .overrideProvider('INFORMATION_PAGE_SIZE')
      .useValue(2)
      .overrideProvider('REACTION_PAGE_SIZE')
      .useValue(2);
  });

  let information1: Information;
  let information2: Information;
  let information3: Information;

  let message1: Message;
  let reaction1: Reaction;

  let reaction2: Reaction;

  let message3: Message;
  let reaction3: Reaction;

  let reaction4: Reaction;

  let message5: Message;
  let reaction5: Reaction;

  let message6: Message;
  let reaction6: Reaction;
  let reaction7: Reaction;

  let userRepository: Repository<User>;
  let informationRepository: InformationRepository;

  /*
    - information1
      - reaction1 (message1 search wow)
      - reaction2
        - reaction3 (searching message3)
      - reaction4

    - information2
      - reaction5 (message5 search)

    - information3
  */

  beforeAll(async () => {
    userRepository = getRepository(User);
    informationRepository = getCustomRepository(InformationRepository);

    information1 = await createInformation();
    information2 = await createInformation();
    information3 = await createInformation();

    message1 = await createMessage({ text: 'message1 search wow' });
    reaction1 = await createReaction({ information: information1, message: message1 });

    reaction2 = await createReaction({ information: information1 });

    message3 = await createMessage({ text: 'searching message3' });
    reaction3 = await createReaction({ information: information1, message: message3, parent: reaction2 });

    reaction4 = await createReaction({ information: information1 });

    message5 = await createMessage({ text: 'message5 search' });
    reaction5 = await createReaction({ information: information2, message: message5 });

    message6 = await createMessage({ text: 'message6 search' });
  });

  describe('list informations', () => {

    it('should list all informations', async () => {
      return request(server)
        .get('/api/information')
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            items: [
              { id: information1.id, reactionsCount: 4 },
              { id: information2.id, reactionsCount: 1 },
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
              { id: information3.id, reactionsCount: 0 },
            ],
            total: 3,
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
            reactionsCount: 4,
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

  describe('get root reactions', () => {

    it('should not find reaction for an information that does not exist', () => {
      return request(server)
        .get('/api/information/4/reactions')
        .expect(404);
    });

    it('should fetch the root reactions', () => {
      return request(server)
        .get(`/api/information/${information1.id}/reactions`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            items: [
              { id: reaction4.id },
              { id: reaction2.id },
            ],
            total: 3,
          });
        });
    });

    it('should fetch the root reactions on page 2', () => {
      return request(server)
        .get(`/api/information/${information1.id}/reactions`)
        .query({ page: 2 })
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            items: [
              { id: reaction1.id },
            ],
            total: 3,
          });
        });
    });

    it('should fetch the root reactions sorted by date asc', () => {
      return request(server)
        .get(`/api/information/${information1.id}/reactions?sort=date-asc`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            items: [
              { id: reaction1.id },
              { id: reaction2.id },
            ],
            total: 3,
          });
        });
    });

    it('should search from the reactions', () => {
      return request(server)
        .get(`/api/information/${information1.id}/reactions?search=search`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            items: [
              { id: reaction3.id },
              { id: reaction1.id },
            ],
            total: 2,
          });
        });
    });

  });

  describe('create information', () => {
    const [userRequest] = createAuthenticatedUser(server);
    const [adminRequest, admin] = createAuthenticatedAdmin(server);

    const info = {
      title: 'title',
      identifier: 'id:someIdentifier',
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
      expect(body).toHaveProperty('creator');
      expect(body.creator).toMatchObject({ id: admin.id });

      const infoDb = await informationRepository.findOne(body.id);

      expect(infoDb).toBeDefined();
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
      const data = { identifier: 'id:someOtherIdentifier', imageUrl: 'https://image.url' };

      const { body } = await adminRequest
        .put(`/api/information/${info.id}`)
        .send(data)
        .expect(200);

      expect(body).toMatchObject(data);

      const infoDb = await informationRepository.findOne(body.id);

      expect(infoDb).toHaveProperty('identifier', data.identifier);
      expect(infoDb).toHaveProperty('imageUrl', data.imageUrl);
    });
  });

});
