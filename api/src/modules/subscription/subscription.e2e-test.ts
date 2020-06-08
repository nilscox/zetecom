import { getRepository, In, Repository } from 'typeorm';

import { createInformation } from '../../testing/factories/information.factory';
import { createReaction } from '../../testing/factories/reaction.factory';
import { createReactionSubscription } from '../../testing/factories/subscription.factory';
import { createUser } from '../../testing/factories/user.factory';
import { createAuthenticatedUser, setupE2eTest } from '../../testing/setup-e2e-test';
import { AuthenticationModule } from '../authentication/authentication.module';
import { Notification, SubscriptionReplyNotification } from '../notification/notification.entity';
import { NotificationModule } from '../notification/notification.module';
import { ReactionModule } from '../reaction/reaction.module';

describe('subscription', () => {

  const server = setupE2eTest({
    imports: [AuthenticationModule, ReactionModule, NotificationModule],
  });

  const [userRequest, user] = createAuthenticatedUser(server);

  let notificationRepository: Repository<SubscriptionReplyNotification>;

  beforeAll(() => {
    notificationRepository = getRepository(Notification as any);
  });

  it('should create a notification from a subscription to a reaction', async () => {
    const information = await createInformation();
    const reaction = await createReaction({ information });
    const otherUser = await createUser();

    await createReactionSubscription({ reaction, user });
    await createReactionSubscription({ reaction, user: otherUser });

    const requestBody = {
      parentId: reaction.id,
      informationId: information.id,
      text: 'text',
    };

    const { body } = await userRequest
      .post('/api/reaction')
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
        reactionId: reaction.id,
        replyId: body.id,
        text: 'text',
      },
    });
  });

});
