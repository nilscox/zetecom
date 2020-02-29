import * as request from 'supertest';
import { getRepository, In, Repository } from 'typeorm';

import { createNotification } from '../../testing/factories/notification.factory';
import { createSubscription } from '../../testing/factories/subscription.factory';
import { createAuthenticatedUser, setupE2eTest } from '../../testing/setup-e2e-test';
import { AuthenticationModule } from '../authentication/authentication.module';

import { Notification } from './notification.entity';
import { NotificationModule } from './notification.module';

describe('notifications', () => {

  const server = setupE2eTest({
    imports: [AuthenticationModule, NotificationModule],
  });

  const { user, authRequest } = createAuthenticatedUser(server);

  let notificationRepository: Repository<Notification>;

  beforeAll(() => {
    notificationRepository = getRepository(Notification);
  });

  describe('get count', () => {

    it('should not fetch notifications count when not authenticated', () => {
      return request(server)
        .get('/api/notification/me/count')
        .expect(403);
    });

    it('should fetch unseen notifications count', async () => {
      const subscription = await createSubscription({ user });
      await createNotification({ subscription });

      const { body } = await authRequest
        .get('/api/notification/me/count')
        .expect(200);

      expect(body).toMatchObject({ count: 1 });
    });

    it('should fetch seen notifications count', async () => {
      const subscription = await createSubscription({ user });
      await createNotification({ subscription, seen: new Date() });

      const { body } = await authRequest
        .get('/api/notification/me/seen/count')
        .expect(200);

      expect(body).toMatchObject({ count: 1 });
    });

  });

});
