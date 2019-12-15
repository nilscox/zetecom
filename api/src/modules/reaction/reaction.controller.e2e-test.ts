import * as request from 'supertest';

import { ReactionModule } from './reaction.module';
import { Reaction } from '../reaction/reaction.entity';
import { Message } from '../reaction/message.entity';

import { setupE2eTest } from '../../testing/typeorm/setup-e2e-test';
import { createInformation } from '../../testing/factories/information.factory';
import { createReaction } from '../../testing/factories/reaction.factory';
import { createMessage } from '../../testing/factories/message.factory';

describe('reaction controller', () => {
  it('should pass', () => {});
/*
  const server = setupE2eTest({
    imports: [ReactionModule],
  }, moduleBuilder => {
    moduleBuilder
      .overrideProvider('INFORMATION_PAGE_SIZE')
      .useValue(2);
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
*/
});
