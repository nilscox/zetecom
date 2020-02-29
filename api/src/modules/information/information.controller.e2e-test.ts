import * as request from 'supertest';
import { getCustomRepository } from 'typeorm';

import { createInformation } from '../../testing/factories/information.factory';
import { createMessage } from '../../testing/factories/message.factory';
import { createReaction } from '../../testing/factories/reaction.factory';
import { createSubject } from '../../testing/factories/subject.factory';
import { createAuthenticatedUser, setupE2eTest } from '../../testing/setup-e2e-test';
import { AuthenticationModule } from '../authentication/authentication.module';
import { Message } from '../reaction/message.entity';
import { Reaction } from '../reaction/reaction.entity';
import { Subject } from '../subject/subject.entity';

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
      .overrideProvider('SUBJECT_PAGE_SIZE')
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

  let subject1: Subject;
  let subject2: Subject;
  let subject3: Subject;
  let subject4: Subject;

  let message6: Message;
  let reaction6: Reaction;
  let reaction7: Reaction;

  let informationRepository: InformationRepository;

  /*
    - information1
      - reaction1 (message1 search wow)
      - reaction2
        - reaction3 (searching message3)
      - reaction4

      - subject1 (subject1 much search)
        - reaction6 (message6 search)
      - subject2
        - reaction7
      - subject3 (;qjsearchcrl subject3)

    - information2
      - reaction5 (message5 search)
      - subject4 (subject4 search)

    - information3
  */

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

    reaction4 = await createReaction({ information: information1 });

    message5 = await createMessage({ text: 'message5 search' });
    reaction5 = await createReaction({ information: information2, messages: [message5] });

    subject1 = await createSubject({ information: information1, subject: 'subject1 much search' });
    subject2 = await createSubject({ information: information1 });
    subject3 = await createSubject({ information: information1, subject: ';qjsearchcrl subject3' });

    subject4 = await createSubject({ information: information2, subject: 'subject4 search' });

    message6 = await createMessage({ text: 'message6 search' });
    reaction6 = await createReaction({ information: information1, subject: subject1, messages: [message6] });

    reaction7 = await createReaction({ information: information1, subject: subject2 });
  });

  describe('list informations', () => {

    it('should list all informations', async () => {
      return request(server)
        .get('/api/information')
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            items: [
              { id: information1.id, subjectsCount: 3, reactionsCount: 6 },
              { id: information2.id, subjectsCount: 1, reactionsCount: 1 },
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
              { id: information3.id, subjectsCount: 0, reactionsCount: 0 },
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
            subjectsCount: 3,
            reactionsCount: 6,
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
              { id: subject1.id },
              { id: subject2.id },
            ],
            total: 3,
          });
        });
    });

    it('should fetch the subjects on page 2', () => {
      return request(server)
        .get(`/api/information/${information1.id}/subjects`)
        .query({ page: 2 })
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            items: [
              { id: subject3.id },
            ],
            total: 3,
          });
        });
    });

    it('should search in the subjects', () => {
      return request(server)
        .get(`/api/information/${information1.id}/subjects`)
        .query({ search: 'search' })
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            items: [
              { id: subject1.id },
              { id: subject3.id },
            ],
            total: 2,
          });
        });
    });

  });

  describe('create information', () => {
    const { authRequest, user } = createAuthenticatedUser(server);

    const info = {
      title: 'title',
      url: 'https://some.url',
      imageUrl: 'https://image.url',
    };

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

      const infoDb = await informationRepository.findOne(body.id);

      expect(infoDb).toBeDefined();
    });
  });

  describe('update information', () => {
    const { authRequest, user } = createAuthenticatedUser(server);
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

    it('should not update an information that does not exist', () => {
      return authRequest
        .put('/api/information/404')
        .send({})
        .expect(404);
    });

    it('should update an information', async () => {
      const data = { url: 'https://updated.url', imageUrl: 'https://image.url' };

      const { body } = await authRequest
        .put(`/api/information/${info.id}`)
        .send(data)
        .expect(200);

      expect(body).toMatchObject(data);

      const infoDb = await informationRepository.findOne(body.id);

      expect(infoDb).toHaveProperty('url', data.url);
      expect(infoDb).toHaveProperty('imageUrl', data.imageUrl);
    });
  });

});
