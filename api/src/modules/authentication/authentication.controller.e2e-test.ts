import request from 'supertest';
import { getRepository, Repository } from 'typeorm';

import { EmailModule } from 'src/modules/email/email.module';
import { User } from 'src/modules/user/user.entity';
import { UserFactory } from 'src/modules/user/user.factory';
import { createAuthenticatedUser, setupE2eTest } from 'src/testing/setup-e2e-test';

import { AuthenticationModule } from './authentication.module';

describe('authentification', () => {
  const { server } = setupE2eTest({
    imports: [AuthenticationModule, EmailModule],
  });

  let userRepository: Repository<User>;

  const userFactory = new UserFactory();

  beforeAll(async () => {
    userRepository = getRepository(User);
  });

  describe('signup', () => {
    const [userRequest, authenticatedUser] = createAuthenticatedUser(server);

    it('should not create an account when already authenticated', () => {
      return userRequest.post('/api/auth/signup').expect(403);
    });

    it('should not create an account when nick already exists', async () => {
      const user = {
        email: 'email@domain.tld',
        password: 'password',
        nick: authenticatedUser.nick,
      };

      const { body } = await request(server).post('/api/auth/signup').send(user).expect(400);

      expect(body).toMatchObject({ message: 'NICK_ALREADY_EXISTS' });
    });

    it('should not create an account when nick already exists', async () => {
      const user = {
        email: authenticatedUser.email,
        password: 'password',
        nick: 'nick',
      };

      const { body } = await request(server).post('/api/auth/signup').send(user).expect(400);

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
        const { body } = await request(server).post('/api/auth/signup').send(data).expect(400);

        expect(body).toMatchObject({ message: 'PASSWORD_UNSECURE' });
      }
    });

    it('should allow a user to create an account', async () => {
      const user = {
        email: 'email@domain.tld',
        password: 'password',
        nick: 'nick',
      };

      const { body } = await request(server).post('/api/auth/signup').send(user).expect(201);

      expect(body).toMatchObject({
        id: expect.any(Number),
        email: 'email@domain.tld',
        nick: 'nick',
      });

      const userDb = await userRepository.findOne(body.id);

      expect(userDb).toBeDefined();
    });
  });

  describe('validate-email', () => {
    let user: User;

    beforeAll(async () => {
      user = await userFactory.create();
    });

    beforeEach(async () => {
      await userRepository.update(user.id, { emailValidated: false });
    });

    it("should validate a user's email address", async () => {
      await request(server).post(`/api/auth/validate-email/${user.emailValidationToken}`).expect(200);

      const userDb = await userRepository.findOne(user.id);

      expect(userDb).toHaveProperty('emailValidated', true);
    });

    it("should not validate a user's email address twice", async () => {
      await request(server).post(`/api/auth/validate-email/${user.emailValidationToken}`).expect(200);
      await request(server).post(`/api/auth/validate-email/${user.emailValidationToken}`).expect(400);
    });
  });

  describe('login', () => {
    const [userRequest] = createAuthenticatedUser(server);

    let user: User;

    beforeAll(async () => {
      user = await userFactory.create({ password: 'pa$$sword' });
    });

    it('should not be possible to login when already authenticated', () => {
      return userRequest.post('/api/auth/login').expect(403);
    });

    it('should not login with invalid credentials', async () => {
      const data = {
        email: 'notok@domain.tld',
        password: 'notok',
      };

      const cases = [
        { ...data, email: user.email },
        { ...data, password: 'pa$$sword' },
      ];

      for (const data of cases) {
        const { body } = await request(server).post('/api/auth/login').send(data).expect(401);

        expect(body).toMatchObject({ message: 'INVALID_CREDENTIALS' });
      }
    });

    it('should not login when the email is not validated', async () => {
      const data = { email: user.email, password: 'pa$$sword' };
      const { body } = await request(server).post('/api/auth/login').send(data).expect(401);

      expect(body).toMatchObject({ message: 'EMAIL_NOT_VALIDATED' });
    });

    it('should login', async () => {
      const data = { email: user.email, password: 'pa$$sword' };
      await userFactory.setEmailValidated(user, true);

      const { body } = await request(server).post('/api/auth/login').send(data).expect(200);

      expect(body).toHaveProperty('id', user.id);
    });
  });

  describe('emailLogin', () => {
    it('should not login with an invalid token', async () => {
      const { body } = await request(server).post('/api/auth/email-login').send({ token: 'nope' }).expect(401);

      expect(body).toMatchObject({
        message: 'INVALID_EMAIL_LOGIN_TOKEN',
      });
    });

    it('should login with a token', async () => {
      const user = await userFactory.create({ emailLoginToken: 'token' });

      const { body } = await request(server).post('/api/auth/email-login').send({ token: 'token' }).expect(200);

      expect(body).toHaveProperty('id', user.id);

      const userDb = await userRepository.findOne(user.id);

      expect(userDb).toMatchObject({
        emailLoginToken: null,
      });
    });

    it('should validate the email address', async () => {
      const user = await userFactory.create({ emailLoginToken: 'token' });

      await request(server).post('/api/auth/email-login').send({ token: 'token' }).expect(200);

      const userDb = await userRepository.findOne(user.id);

      expect(userDb).toMatchObject({
        emailValidated: true,
      });
    });
  });

  describe('askEmailLogin', () => {
    let user: User;

    beforeAll(async () => {
      user = await userFactory.create();
    });

    it('should ask for a login token', async () => {
      await request(server).post('/api/auth/ask-email-login').send({ email: user.email }).expect(204);

      const userDb = await userRepository.findOne(user.id);

      expect(userDb).toMatchObject({
        emailLoginToken: expect.any(String),
      });
    });

    it('should return a status code 204 even if the email does not exist', async () => {
      await request(server).post('/api/auth/ask-email-login').send({ email: 'nopp@domain.tld' }).expect(204);
    });
  });

  describe('logout', () => {
    const [userRequest] = createAuthenticatedUser(server);

    it('should not be possible to logout when unauthenticated', () => {
      return request(server).post('/api/auth/logout').expect(403);
    });

    it('should logout', async () => {
      await userRequest.post('/api/auth/logout').expect(204);
    });
  });

  describe('me', () => {
    const [userRequest, user] = createAuthenticatedUser(server);

    it('should not fetch me when unauthenticated', () => {
      return request(server).get('/api/auth/me').expect(403);
    });

    it('s me, mario!', async () => {
      const { body } = await userRequest.get('/api/auth/me').expect(200);

      expect(body).toHaveProperty('id', user.id);
    });
  });
});
