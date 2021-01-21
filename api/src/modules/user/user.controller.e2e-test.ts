import request from 'supertest';
import { getRepository, Repository } from 'typeorm';

import { AuthenticationModule } from 'src/modules/authentication/authentication.module';
import { createAuthenticatedAdmin, setupE2eTest } from 'src/testing/setup-e2e-test';

import { User } from './user.entity';
import { UserFactory } from './user.factory';
import { UserModule } from './user.module';

describe('user controller', () => {
  const { server } = setupE2eTest({
    imports: [AuthenticationModule, UserModule],
  });

  let userRepository: Repository<User>;
  const userFactory = new UserFactory();

  let user: User;

  beforeAll(async () => {
    userRepository = getRepository(User);

    user = await userFactory.create({
      email: 'user@domain.tld',
      nick: 'user',
      password: 'password',
    });
  });

  const [adminRequest] = createAuthenticatedAdmin(server);

  it('should find all users', async () => {
    const { body } = await adminRequest.get('/api/user').expect(200);

    expect(body).toHaveLength(2);
    expect(body).toMatchObject([{ id: user.id }, {}]);
  });

  it('should find a user by id', async () => {
    const { body } = await adminRequest.get(`/api/user/${user.id}`).expect(200);

    expect(body).toEqual({
      id: user.id,
      nick: 'user',
      avatar: null,
    });
  });

  describe('update role', () => {
    it("should not update a user's roles when not an admin", async () => {
      await request(server).get(`/api/user/${user.id}`).expect(403);
    });

    it("should update a user's roles", async () => {
      const { body } = await adminRequest
        .put(`/api/user/${user.id}/roles`)
        .send({ roles: ['USER', 'ADMIN'] })
        .expect(200);

      expect(body).toHaveProperty('roles', ['USER', 'ADMIN']);

      const userDb = await userRepository.findOne(user.id);

      expect(userDb).toHaveProperty('roles', ['USER', 'ADMIN']);
    });
  });
});
