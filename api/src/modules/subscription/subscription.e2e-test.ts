import { getRepository, In, Repository } from 'typeorm';

import { createInformation } from '../../testing/factories/information.factory';
import { createReaction } from '../../testing/factories/reaction.factory';
import { createSubscription } from '../../testing/factories/subscription.factory';
import { createUser } from '../../testing/factories/user.factory';
import { createAuthenticatedUser, setupE2eTest } from '../../testing/setup-e2e-test';
import { AuthenticationModule } from '../authentication/authentication.module';
import { Notification } from '../notification/notification.entity';
import { NotificationModule } from '../notification/notification.module';
import { ReactionModule } from '../reaction/reaction.module';

describe('subscription', () => {

  const server = setupE2eTest({
    imports: [AuthenticationModule, ReactionModule, NotificationModule],
  });

  const [userRequest, user] = createAuthenticatedUser(server);

  let notificationRepository: Repository<Notification>;

  beforeAll(() => {
    notificationRepository = getRepository(Notification);
  });

  it('should create a notification from a subscription to a reaction', async () => {
    const information = await createInformation();
    const reaction = await createReaction({ information });
    const otherUser = await createUser();

    const subscription = await createSubscription({ reaction, user });
    const subscriptionOther = await createSubscription({ reaction, user: otherUser });

    const requestBody = {
      parentId: reaction.id,
      informationId: information.id,
      text: 'text',
    };

    await userRequest
      .post('/api/reaction')
      .send(requestBody)
      .expect(201);

    const notificationsDb = await notificationRepository.find({
      where: { subscription: In([subscription.id, subscriptionOther.id]) },
      relations: ['subscription'],
    });

    expect(notificationsDb).toHaveLength(1);
    expect(notificationsDb[0]).toMatchObject({ subscription: { id: subscriptionOther.id } });
  });

});
