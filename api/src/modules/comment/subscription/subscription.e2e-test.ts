import { getRepository, Repository } from 'typeorm';

import { createAuthenticatedUser, setupE2eTest } from '../../../testing/setup-e2e-test';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { CommentFactory } from '../../comment/comment.factory';
import { CommentModule } from '../../comment/comment.module';
import { InformationFactory } from '../../information/information.factory';
import { Notification, SubscriptionReplyNotification } from '../../notification/notification.entity';
import { NotificationModule } from '../../notification/notification.module';
import { UserFactory } from '../../user/user.factory';

import { SubscriptionFactory } from './subscription.factory';

describe('subscription', () => {

  const { server, getTestingModule } = setupE2eTest({
    imports: [AuthenticationModule, CommentModule, NotificationModule],
  });

  let createUser: UserFactory['create'];
  let createInformation: InformationFactory['create'];
  let createComment: CommentFactory['create'];
  let createsubscription: SubscriptionFactory['create'];

  let notificationRepository: Repository<SubscriptionReplyNotification>;

  const [userRequest, user] = createAuthenticatedUser(server);

  beforeAll(() => {
    const module = getTestingModule();

    const userFactory = module.get<UserFactory>(UserFactory);
    const informationFactory = module.get<InformationFactory>(InformationFactory);
    const commentFactory = module.get<CommentFactory>(CommentFactory);
    const subscriptionFactory = module.get<SubscriptionFactory>(SubscriptionFactory);

    createUser = userFactory.create.bind(userFactory);
    createInformation = informationFactory.create.bind(informationFactory);
    createComment = commentFactory.create.bind(commentFactory);
    createsubscription = subscriptionFactory.create.bind(subscriptionFactory);

    notificationRepository = getRepository(Notification as any);
  });

  it('should create a notification from a subscription to a comment', async () => {
    const information = await createInformation();
    const comment = await createComment({ information });
    const otherUser = await createUser({ nick: 'otherUser' });

    await createsubscription({ comment: comment, user });
    await createsubscription({ comment: comment, user: otherUser });

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
