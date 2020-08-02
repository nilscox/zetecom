import request from 'supertest';
import { getRepository, Repository } from 'typeorm';

import { createUser } from '../../testing/factories/user.factory';
import { createAuthenticatedUser, setupE2eTest } from '../../testing/setup-e2e-test';
import { EmailModule } from '../email/email.module';
import { User } from '../user/user.entity';

import { AuthenticationModule } from './authentication.module';

describe('authentification', () => {

  const { server } = setupE2eTest({
    imports: [AuthenticationModule, EmailModule],
  });

  let userRepository: Repository<User>;

  beforeAll(async () => {
    userRepository = getRepository(User);
  });

  describe('signup', () => {
    const [userRequest, authenticatedUser] = createAuthenticatedUser(server);

    it('should not create an account when already authenticated', () => {
      return userRequest
        .post('/api/auth/signup')
        .expect(403);
    });

    it('should not create an account when nick already exists', async () => {
      const user = {
        email: 'email@domain.tld',
        password: 'password',
        nick: authenticatedUser.nick,
      };

      const { body } = await request(server)
        .post('/api/auth/signup')
        .send(user)
        .expect(400);

      expect(body).toMatchObject({ message: 'NICK_ALREADY_EXISTS' });
    });

    it('should not create an account when nick already exists', async () => {
      const user = {
        email: authenticatedUser.email,
        password: 'password',
        nick: 'nick',
      };

      const { body } = await request(server)
        .post('/api/auth/signup')
        .send(user)
        .expect(400);

      expect(body).toMatchObject({ message: 'EMAIL_ALREADY_EXISTS' });
    });

    it('should not create an account when the password is too week', async () => {
      const user = {
        email: 'email@domain.tld',
        password: 'password',
        nick: 'nick',
      };

      const cases = [
        { ...user, nick: 'abcpassword123' },
        { ...user, password: 'abcnick123' },
        { ...user, email: 'abcpassword123@domain.tld' },
        { ...user, password: 'abcemail@domain.tld123' },
      ];

      for (const data of cases) {
        const { body } = await request(server)
          .post('/api/auth/signup')
          .send(data)
          .expect(400);

        expect(body).toMatchObject({ message: 'PASSWORD_UNSECURE' });
      }
    });

    it('should allow a user to create an account', async () => {
      const user = {
        email: 'email@domain.tld',
        password: 'password',
        nick: 'nick',
      };

      const { body } = await request(server)
        .post('/api/auth/signup')
        .send(user)
        .expect(201);

      expect(body).toMatchObject({
        id: expect.any(Number),
        email: 'email@domain.tld',
        nick: 'nick',
      });

      const userDb = await userRepository.findOne(body.id);

      expect(userDb).toBeDefined();
    });

  });

  describe('login', () => {
    const [userRequest] = createAuthenticatedUser(server);

    let user: User;

    beforeAll(async () => {
      user = await createUser({ password: 'pa$$word' });
    });

    it('should not be possible to login when already authenticated', () => {
      return userRequest
        .post('/api/auth/login')
        .expect(403);
    });

    it('should not login with invalid credentials', async () => {
      const data = {
        email: 'email@domain.tld',
        password: 'password',
      };

      const cases = [
        { ...data, email: user.email },
        { ...data, password: user.password },
      ];

      for (const data of cases) {
        const { body } = await request(server)
          .post('/api/auth/login')
          .send(data)
          .expect(401);

        expect(body).toMatchObject({ message: 'INVALID_CREDENTIALS' });
      }
    });

    it('should not login when the email is not validated', async () => {
      const user = await createUser({ password: 'pa$$word', emailValidated: false });
      const data = { email: user.email, password: 'pa$$word' };

      const { body } = await request(server)
        .post('/api/auth/login')
        .send(data)
        .expect(401);

      expect(body).toMatchObject({ message: 'EMAIL_NOT_VALIDATED' });
    });

    it('should login', async () => {
      const data = { email: user.email, password: 'pa$$word' };

      const { body } = await request(server)
        .post('/api/auth/login')
        .send(data)
        .expect(200);

      expect(body).toHaveProperty('id', user.id);
    });

  });

  describe('emailLogin', () => {

    let user: User;

    beforeAll(async () => {
      user = await createUser({ emailLoginToken: 'token' });
    });

    it('should not login with an invalid token', async () => {
      const { body } = await request(server)
        .post('/api/auth/email-login')
        .send({ token: 'nope' })
        .expect(401);

      expect(body).toMatchObject({
        message: 'INVALID_EMAIL_LOGIN_TOKEN',
      });
    });

    it('should login with a token', async () => {
      const { body } = await request(server)
        .post('/api/auth/email-login')
        .send({ token: 'token' })
        .expect(200);

      expect(body).toHaveProperty('id', user.id);
    });

    it('should validate the email address', async () => {
      const user = await createUser({ emailValidated: false, emailLoginToken: 'token' });

      await request(server)
        .post('/api/auth/email-login')
        .send({ token: 'token' })
        .expect(200);

      const userDb = await userRepository.findOne(user.id);

      expect(userDb).toMatchObject({
        emailValidated: true,
      });
    });

  });

  describe('askEmailLogin', () => {

    let user: User;

    beforeAll(async () => {
      user = await createUser({ emailLoginToken: 'token' });
    });

    it('should ask for a login token', async () => {
      await request(server)
        .post('/api/auth/ask-email-login')
        .send({ email: user.email })
        .expect(204);

      const userDb = await userRepository.findOne(user.id);

      expect(userDb).toMatchObject({
        emailLoginToken: expect.any(String),
      });
    });

    it('should return a status code 204 even if the email does not exist', async () => {
      await request(server)
        .post('/api/auth/ask-email-login')
        .send({ email: 'nopp@domain.tld' })
        .expect(204);
    });

  });

  describe('logout', () => {
    const [userRequest] = createAuthenticatedUser(server);

    it('should not be possible to logout when unauthenticated', () => {
      return request(server)
        .post('/api/auth/logout')
        .expect(403);
    });

    it('should logout', async () => {
      await userRequest
        .post('/api/auth/logout')
        .expect(204);
    });

  });

  describe('me', () => {
    const [userRequest, user] = createAuthenticatedUser(server);

    it('should not fetch me when unauthenticated', () => {
      return request(server)
        .get('/api/auth/me')
        .expect(403);
    });

    it('s me, mario!', async () => {
      const { body } = await userRequest
        .get('/api/auth/me')
        .expect(200);

      expect(body).toHaveProperty('id', user.id);
    });

  });

});
