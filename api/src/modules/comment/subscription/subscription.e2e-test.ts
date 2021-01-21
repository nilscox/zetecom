import { getRepository, Repository } from 'typeorm';

import { AuthenticationModule } from 'src/modules/authentication/authentication.module';
import { CommentFactory } from 'src/modules/comment/comment.factory';
import { CommentModule } from 'src/modules/comment/comment.module';
import { CommentsAreaFactory } from 'src/modules/comments-area/comments-area.factory';
import { Notification } from 'src/modules/notification/notification.entity';
import { NotificationModule } from 'src/modules/notification/notification.module';
import { UserFactory } from 'src/modules/user/user.factory';
import { createAuthenticatedUser, setupE2eTest } from 'src/testing/setup-e2e-test';

import { SubscriptionFactory } from './subscription.factory';

describe('subscription', () => {
  const { server } = setupE2eTest({
    imports: [AuthenticationModule, CommentModule, NotificationModule],
  });

  const userFactor = new UserFactory();
  const commentsAreaFactory = new CommentsAreaFactory();
  const commentFactory = new CommentFactory();
  const subscriptionFactory = new SubscriptionFactory();

  let notificationRepository: Repository<Notification>;

  const [userRequest, user] = createAuthenticatedUser(server);

  beforeAll(() => {
    notificationRepository = getRepository(Notification);
  });

  it('should create a notification from a subscription to a comment', async () => {
    const commentsArea = await commentsAreaFactory.create();
    const comment = await commentFactory.create({ commentsArea });
    const otherUser = await userFactor.create({ nick: 'otherUser' });

    await subscriptionFactory.create({ comment: comment, user });
    await subscriptionFactory.create({ comment: comment, user: otherUser });

    const requestBody = {
      parentId: comment.id,
      commentsAreaId: commentsArea.id,
      text: 'text',
    };

    const { body } = await userRequest.post('/api/comment').send(requestBody).expect(201);

    const notificationsDb = await notificationRepository.find({
      where: { user: otherUser },
    });

    expect(notificationsDb).toHaveLength(1);
    expect(notificationsDb[0]).toMatchObject({
      payload: {
        author: { id: user.id },
        commentsAreaId: commentsArea.id,
        commentId: comment.id,
        replyId: body.id,
        text: 'text',
      },
    });
  });
});
