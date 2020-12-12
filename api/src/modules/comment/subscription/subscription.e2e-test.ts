import { getRepository, Repository } from 'typeorm';

import { createAuthenticatedUser, setupE2eTest } from '../../../testing/setup-e2e-test';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { CommentFactory } from '../../comment/comment.factory';
import { CommentModule } from '../../comment/comment.module';
import { CommentsAreaFactory } from '../../comments-area/comments-area.factory';
import { Notification } from '../../notification/notification.entity';
import { NotificationModule } from '../../notification/notification.module';
import { UserFactory } from '../../user/user.factory';

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
