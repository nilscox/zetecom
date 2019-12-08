import * as request from 'supertest';

import { InformationModule } from './information.module';

import { setupE2eTest } from '../../testing/typeorm/setup-e2e-test';
import { createInformation } from '../../testing/factories/information.factory';
import { Information } from './information.entity';

describe('information controller', () => {

  const server = setupE2eTest({
    imports: [InformationModule],
  }, moduleBuilder => {
    moduleBuilder
      .overrideProvider('INFORMATION_PAGE_SIZE')
      .useValue(1);
  });

  let information1: Information;
  let information2: Information;

  beforeAll(async () => {
    information1 = await createInformation();
    information2 = await createInformation();
  });

  describe('list informations', () => {

    it('should list all informations on page 1', () => {
      return request(server)
        .get('/api/information')
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject([
            {
              id: information1.id,
              creator: {
                id: information1.creator.id,
              },
            },
          ]);
        });
    });

    it('should list all informations on page 2', () => {
      return request(server)
        .get('/api/information?page=2')
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject([
            {
              id: information2.id,
              creator: {
                id: information2.creator.id,
              },
            },
          ]);
        });
    });

  });

});
