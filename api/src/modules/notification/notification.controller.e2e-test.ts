import request from 'supertest';
import { getRepository, Repository } from 'typeorm';

import { createAuthenticatedUser, setupE2eTest } from '../../testing/setup-e2e-test';
import { AuthenticationModule } from '../authentication/authentication.module';
import { UserLight } from '../user/user.entity';

import { Notification, NotificationType } from './notification.entity';
import { NotificationFactory } from './notification.factory';
import { NotificationModule } from './notification.module';

describe('notifications', () => {

  const { server, getTestingModule } = setupE2eTest({
    imports: [AuthenticationModule, NotificationModule],
  });

  let createNotification: NotificationFactory['create'];

  let notificationRepository: Repository<Notification<any>>;

  beforeAll(() => {
    notificationRepository = getRepository(Notification);

    const module = getTestingModule();

    const notificationFactory = module.get<NotificationFactory>(NotificationFactory);

    createNotification = notificationFactory.create.bind(notificationFactory);
  });

  const [userRequest, user] = createAuthenticatedUser(server);

  const subscriptionReplyPayload = {
    informationId: 1,
    commentId: 1,
    replyId: 3,
    author: { id: 69, nick: 'nick', avatar: null } as UserLight,
    text: 'text',
  };

  const markAsSeen = async (notification: Notification<any>, date: Date) => {
    await notificationRepository.update(notification.id, { seen: date });
  };

  beforeAll(async () => {
    await createNotification({ type: NotificationType.RULES_UPDATE, payload: { version: '4.2' }, user });

    const notification = await createNotification({ type: NotificationType.SUBSCRIPTION_REPLY, payload: subscriptionReplyPayload, user });
    await markAsSeen(notification, new Date(2020, 0, 1));
  });

  describe('get notifications', () => {

    it('should not fetch notifications when not authenticated', () => {
      return request(server)
        .get('/api/notification/me')
        .expect(403);
    });

    it('should fetch notifications', async () => {
      const { body } = await userRequest
        .get('/api/notification/me')
        .expect(200);

      expect(body).toMatchObject({
        items: [
          { type: NotificationType.RULES_UPDATE, payload: { version: '4.2' } },
          { type: NotificationType.SUBSCRIPTION_REPLY, payload: subscriptionReplyPayload, seen: expect.any(String) },
        ],
        total: 2,
      });
    });

  });

  describe('get count', () => {

    it('should not fetch notifications count when not authenticated', () => {
      return request(server)
        .get('/api/notification/me/count')
        .expect(403);
    });

    it('should fetch unseen notifications count', async () => {
      const { body } = await userRequest
        .get('/api/notification/me/count')
        .expect(200);

      expect(body).toMatchObject({ count: 1 });
    });

  });

});
