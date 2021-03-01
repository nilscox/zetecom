import request from 'supertest';

import { AuthenticationModule } from 'src/modules/authentication/authentication.module';
import { UserLightDto } from 'src/modules/user/dtos/user-ligth.dto';
import { createAuthenticatedUser, setupE2eTest } from 'src/testing/setup-e2e-test';

import { NotificationFactory } from './notification.factory';
import { NotificationModule } from './notification.module';
import { SubscriptionReplyNotificationPayload } from './notification-payload';
import { NotificationType } from './notification-type';

describe('notifications', () => {
  const { server } = setupE2eTest({
    imports: [AuthenticationModule, NotificationModule],
  });

  const notificationFactory = new NotificationFactory();

  const [userRequest, user] = createAuthenticatedUser(server);

  const subscriptionReplyPayload: SubscriptionReplyNotificationPayload = {
    commentsAreaId: 1,
    commentsAreaTitle: 'title',
    commentId: 1,
    replyId: 3,
    author: { id: 69, nick: 'nick', avatar: null } as UserLightDto,
    text: 'text',
  };

  beforeAll(async () => {
    await notificationFactory.create({ type: NotificationType.RULES_UPDATE, payload: { version: '4.2' }, user });

    const notification = await notificationFactory.create({
      type: NotificationType.SUBSCRIPTION_REPLY,
      payload: subscriptionReplyPayload,
      user,
    });

    await notificationFactory.markAsSeen(notification, new Date(2020, 0, 1));
  });

  describe('get notifications', () => {
    it('should not fetch notifications when not authenticated', () => {
      return request(server).get('/api/notification/me').expect(403);
    });

    it("should fetch the user's notifications", async () => {
      const { body } = await userRequest.get('/api/notification/me').expect(200);

      expect(body).toMatchObject({
        items: [
          { type: NotificationType.SUBSCRIPTION_REPLY, payload: subscriptionReplyPayload, seen: expect.any(String) },
          { type: NotificationType.RULES_UPDATE, payload: { version: '4.2' } },
        ],
        total: 2,
      });
    });

    it("should search the users's notifications", async () => {
      const { body } = await userRequest.get('/api/notification/me').query({ search: 'title' }).expect(200);

      expect(body).toMatchObject({
        items: [
          { type: NotificationType.SUBSCRIPTION_REPLY, payload: subscriptionReplyPayload, seen: expect.any(String) },
        ],
        total: 1,
      });
    });
  });

  describe('get count', () => {
    it('should not fetch notifications count when not authenticated', () => {
      return request(server).get('/api/notification/me/count').expect(403);
    });

    it('should fetch unseen notifications count', async () => {
      const { body } = await userRequest.get('/api/notification/me/count').expect(200);

      expect(body).toMatchObject({ count: 1 });
    });
  });
});
