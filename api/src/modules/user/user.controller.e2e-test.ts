import { createAuthenticatedAdmin, setupE2eTest } from '../../testing/setup-e2e-test';
import { AuthenticationModule } from '../authentication/authentication.module';

import { User } from './user.entity';
import { UserFactory } from './user.factory';
import { UserModule } from './user.module';

describe('user controller', () => {

  const { server, getTestingModule } = setupE2eTest({
    imports: [AuthenticationModule, UserModule],
  });

  let createUser: UserFactory['create'];

  let user: User;

  beforeAll(async () => {
    const module = getTestingModule();

    const userFactory = module.get<UserFactory>(UserFactory);

    createUser = userFactory.create.bind(userFactory);

    user = await createUser({
      email: 'user@domain.tld',
      nick: 'user',
      password: 'password',
    });
  });

  const [adminRequest] = createAuthenticatedAdmin(server);

  it('should find all users', async () => {
    const { body } = await adminRequest
      .get('/api/user')
      .expect(200);

    expect(body).toHaveLength(3);
    expect(body).toMatchObject([{}, { id: user.id }, {}]);
  });

  it('should find a user by id', async () => {
    const { body } = await adminRequest
      .get(`/api/user/${user.id}`)
      .expect(200);

    expect(body).toEqual({
      id: user.id,
      nick: 'user',
      avatar: null,
    });
  });
});
