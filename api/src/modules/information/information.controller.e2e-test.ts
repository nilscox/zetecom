import * as request from 'supertest';

import { InformationModule } from './information.module';
import { Information } from './information.entity';
import { Reaction } from '../reaction/reaction.entity';
import { Message } from '../reaction/message.entity';

import { setupE2eTest } from '../../testing/typeorm/setup-e2e-test';
import { createInformation } from '../../testing/factories/information.factory';
import { createReaction } from '../../testing/factories/reaction.factory';
import { createMessage } from '../../testing/factories/message.factory';

describe('information controller', () => {

  const server = setupE2eTest({
    imports: [InformationModule],
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

  beforeAll(async () => {
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
  });

  describe('list informations', () => {

    it('should list all informations on page 1', () => {
      return request(server)
        .get('/api/information')
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject([
            { id: information1.id },
            { id: information2.id },
          ]);
        });
    });

    it('should list all informations on page 2', () => {
      return request(server)
        .get('/api/information?page=2')
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject([
            { id: information3.id },
          ]);
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
          expect(body).toMatchObject([
            { id: reaction2.id },
            { id: reaction1.id },
          ]);
        });
    });

    it('should fetch the root reactions sorted by date asc', () => {
      return request(server)
        .get(`/api/information/${information1.id}/reactions?sort=date-asc`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject([
            { id: reaction1.id },
            { id: reaction2.id },
          ]);
        });
    });

    it('should search from the reactions', () => {
      return request(server)
        .get(`/api/information/${information1.id}/reactions?search=search`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject([
            { id: reaction3.id },
            { id: reaction1.id },
          ]);
        });
    });

  });

});
