import * as request from 'supertest';
import { getCustomRepository } from 'typeorm';

import { AppModule } from '../../app.module';
import { InformationModule } from './information.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { InformationRepository } from './information.repository';
import { Information } from './information.entity';
import { Reaction } from '../reaction/reaction.entity';
import { Message } from '../reaction/message.entity';
import { Subject } from '../subject/subject.entity';

import { setupE2eTest } from '../../testing/setup-e2e-test';
import { createInformation } from '../../testing/factories/information.factory';
import { createReaction } from '../../testing/factories/reaction.factory';
import { createMessage } from '../../testing/factories/message.factory';
import { createSubject } from '../../testing/factories/subject.factory';

describe('information controller', () => {

  const server = setupE2eTest({
    imports: [InformationModule, AuthenticationModule],
  }, moduleBuilder => {
    moduleBuilder
      .overrideProvider('INFORMATION_PAGE_SIZE')
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

  let message4: Message;
  let reaction4: Reaction;

  let subject: Subject;

  let informationRepository: InformationRepository;

  beforeAll(async () => {
    informationRepository = getCustomRepository(InformationRepository);

    information1 = await createInformation();
    information2 = await createInformation();
    information3 = await createInformation();

    message1 = await createMessage({ text: 'message1 search wow' });
    reaction1 = await createReaction({ information: information1, messages: [message1] });

    reaction2 = await createReaction({ information: information1 });

    message3 = await createMessage({ text: 'searching message3' });
    reaction3 = await createReaction({ information: information1, messages: [message3], parent: reaction2 });

    message4 = await createMessage({ text: 'message4 search' });
    reaction4 = await createReaction({ information: information2, messages: [message4] });

    subject = await createSubject({ information: information1 });
  });

  describe('list informations', () => {

    it('should list all informations', async () => {
      return request(server)
        .get('/api/information')
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            items: [
              { id: information1.id },
              { id: information2.id },
            ],
            total: 3,
          });
        });
    });

  });

  describe('get information', () => {

    it('should not find an information with unexisting id', () => {
      return request(server)
        .get(`/api/information/4`)
        .expect(404);
    });

    it('should fetch an information by id', () => {
      return request(server)
        .get(`/api/information/${information1.id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            id: information1.id,
          });
        });
    });

    it('should not find an information with unexisting url', () => {
      return request(server)
        .get(`/api/information/by-url/${encodeURIComponent('https://fake.news/article/1')}`)
        .expect(404);
    });

    it('should fetch an information by url', () => {
      return request(server)
        .get(`/api/information/by-url/${encodeURIComponent(information1.url)}`)
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
        .get(`/api/information/4/reactions`)
        .expect(404);
    });

    it('should fetch the root reactions', () => {
      return request(server)
        .get(`/api/information/${information1.id}/reactions`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            items: [
              { id: reaction2.id },
              { id: reaction1.id },
            ],
            total: 2,
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
            total: 2,
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

  describe('get subjects', () => {

    it('should not find subjects for an information that does not exist', () => {
      return request(server)
        .get(`/api/information/4/subjects`)
        .expect(404);
    });

    it('should fetch the subjects', () => {
      return request(server)
        .get(`/api/information/${information1.id}/subjects`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            items: [
              { id: subject.id },
            ],
            total: 1,
          });
        });
    });

  });

  describe('create information', () => {
    let authRequest: any; // request.SuperTest<request.Test>;
    let user: any;

    const info = {
      title: 'title',
      url: 'https://some.url',
    };

    beforeAll(async () => {
      authRequest = request.agent(server);

      const { body } = await authRequest
        .post('/api/auth/signup')
        .send({
          nick: 'nick',
          email: 'user@domain.tld',
          password: 'password',
        })
        .expect(201);

      user = body;
    });

    it('should not create an information when unauthenticated', () => {
      return request(server)
        .post('/api/information')
        .send(info)
        .expect(403);
    });

    it('should not create an information with missing title', () => {
      const data = { ...info };
      delete data.title;

      return authRequest
        .post('/api/information')
        .send(data)
        .expect(400);
    });

    it('should not create an information with missing url', () => {
      const data = { ...info };
      delete data.url;

      return authRequest
        .post('/api/information')
        .send(data)
        .expect(400);
    });

    it('should create an information', async () => {
      const { body } = await authRequest
        .post('/api/information')
        .send(info)
        .expect(201);

      expect(body).toMatchObject(info);
      expect(body).toHaveProperty('creator');
      expect(body.creator).toMatchObject({ id: user.id });

      const infoDb = await informationRepository.find(body.id);

      expect(infoDb).toBeDefined();
    });
  });

});
