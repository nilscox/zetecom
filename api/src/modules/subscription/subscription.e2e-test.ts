import { getRepository, In, Repository } from 'typeorm';

import { createComment } from '../../testing/factories/comment.factory';
import { createInformation } from '../../testing/factories/information.factory';
import { createCommentSubscription } from '../../testing/factories/subscription.factory';
import { createUser } from '../../testing/factories/user.factory';
import { createAuthenticatedUser, setupE2eTest } from '../../testing/setup-e2e-test';
import { AuthenticationModule } from '../authentication/authentication.module';
import { CommentModule } from '../comment/comment.module';
import { Notification, SubscriptionReplyNotification } from '../notification/notification.entity';
import { NotificationModule } from '../notification/notification.module';

describe('subscription', () => {

  const server = setupE2eTest({
    imports: [AuthenticationModule, CommentModule, NotificationModule],
  });

  const [userRequest, user] = createAuthenticatedUser(server);

  let notificationRepository: Repository<SubscriptionReplyNotification>;

  beforeAll(() => {
    notificationRepository = getRepository(Notification as any);
  });

  it('should create a notification from a subscription to a comment', async () => {
    const information = await createInformation();
    const comment = await createComment({ information });
    const otherUser = await createUser();

    await createCommentSubscription({ comment: comment, user });
    await createCommentSubscription({ comment: comment, user: otherUser });

    const requestBody = {
      parentId: comment.id,
      informationId: information.id,
      text: 'text',
    };

    const { body } = await userRequest
      .post('/api/comment')
      .send(requestBody)
      .expect(201);

    const notificationsDb = await notificationRepository.find({
      where: { user: otherUser },
    });

    expect(notificationsDb).toHaveLength(1);
    expect(notificationsDb[0]).toMatchObject({
      payload: {
        author: { id: user.id },
        informationId: information.id,
        commentId: comment.id,
        replyId: body.id,
        text: 'text',
      },
    });
  });

});
