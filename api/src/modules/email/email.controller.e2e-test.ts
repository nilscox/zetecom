import request from 'supertest';
import { getRepository, Repository } from 'typeorm';

import { createAuthenticatedAdmin, createAuthenticatedUser, setupE2eTest } from '../../testing/setup-e2e-test';
import { AuthenticationModule } from '../authentication/authentication.module';
import { AuthorizationModule } from '../authorization/authorization.module';

import { AuthorizedEmail } from './authorized-email.entity';
import { EmailModule } from './email.module';

describe('email controller', () => {

  const { server } = setupE2eTest({
    imports: [EmailModule, AuthenticationModule, AuthorizationModule],
  });

  let authorizedEmailRepository: Repository<AuthorizedEmail>;

  beforeAll(() => {
    authorizedEmailRepository = getRepository(AuthorizedEmail);
  });

  describe('authorized', () => {

    const [userRequest] = createAuthenticatedUser(server);
    const [adminRequest] = createAuthenticatedAdmin(server);

    it('should not have access to the authorized emails when unauthenticated', async () => {
      await request(server)
        .get('/api/email/authorized')
        .expect(403);
    });

    it('should not have access to the authorized emails when not admin', async () => {
      await userRequest
        .get('/api/email/authorized')
        .expect(403);
    });

    it('should access the authorized email', async () => {
      const { body } = await adminRequest
        .get('/api/email/authorized')
        .expect(200);

      expect(body).toMatchObject([]);
    });

  });

  describe('authorize', () => {

    const [userRequest] = createAuthenticatedUser(server);
    const [adminRequest] = createAuthenticatedAdmin(server);

    it('should not create an authorized email when unauthenticated', async () => {
      await request(server)
        .post('/api/email/authorize')
        .expect(403);
    });

    it('should not create an authorized email when not admin', async () => {
      await userRequest
        .post('/api/email/authorize')
        .expect(403);
    });

    it('should create an authorized email', async () => {
      const { body } = await adminRequest
        .post('/api/email/authorize')
        .send({ email: 'authorized@domain.tld' })
        .expect(201);

      expect(body).toMatchObject({ email: 'authorized@domain.tld' });

      const authorizedEmailDb = await authorizedEmailRepository.findOne({ email: 'authorized@domain.tld' });

      expect(authorizedEmailDb).toHaveProperty('email', 'authorized@domain.tld');
    });

  });

});
