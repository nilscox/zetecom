// tslint:disable no-shadowed-variable

import * as request from 'supertest';
import { getCustomRepository, getRepository, Repository } from 'typeorm';

import { createInformation } from '../../testing/factories/information.factory';
import { createMessage } from '../../testing/factories/message.factory';
import { createReaction } from '../../testing/factories/reaction.factory';
import { createReactionSubscription } from '../../testing/factories/subscription.factory';
import { createUser } from '../../testing/factories/user.factory';
import { createAuthenticatedUser, setupE2eTest } from '../../testing/setup-e2e-test';
import { AuthenticationModule } from '../authentication/authentication.module';
import { Information } from '../information/information.entity';
import { Reaction } from '../reaction/reaction.entity';
import { ReactionSubscription } from '../subscription/subscription.entity';

import { QuickReaction, QuickReactionType } from './quick-reaction.entity';
import { ReactionModule } from './reaction.module';
import { ReactionRepository } from './reaction.repository';

describe('reaction controller', () => {

  const server = setupE2eTest({
    imports: [ReactionModule, AuthenticationModule],
  }, moduleBuilder => {
    moduleBuilder
      .overrideProvider('REACTION_PAGE_SIZE')
      .useValue(2);
  });

  let reactionRepository: ReactionRepository;
  let quickReactionRepository: Repository<QuickReaction>;
  let subscriptionRepository: Repository<ReactionSubscription>;

  let information: Information;

  let reaction: Reaction;

  let reply1: Reaction;
  let reply2: Reaction;
  let reply3: Reaction;

  beforeAll(async () => {
    reactionRepository = getCustomRepository(ReactionRepository);
    quickReactionRepository = getRepository(QuickReaction);
    subscriptionRepository = getRepository(ReactionSubscription);

    const user = await createUser();

    information = await createInformation();

    reaction = await createReaction({
      author: user,
      information,
      message: await createMessage({ text: 'message2' }),
      history: [await createMessage({ text: 'message1' })],
    });

    reply1 = await createReaction({ information, parent: reaction });
    reply2 = await createReaction({ information, parent: reaction });
    reply3 = await createReaction({ information, parent: reaction });
  });

  describe('get for user', () => {

    const [userRequest, user] = createAuthenticatedUser(server);

    let information1: Information;
    let information2: Information;
    let reaction1: Reaction;
    let reaction2: Reaction;
    let reaction3: Reaction;
    let reaction4: Reaction;

    beforeAll(async () => {
      information1 = await createInformation();
      information2 = await createInformation();

      reaction1 = await createReaction({ information: information1, author: user });

      reaction2 = await createReaction({ information: information2, author: user });
      // await createReaction({ information: information2 });

      reaction3 = await createReaction({ information: information1, author: user });
      reaction4 = await createReaction({ information: information1, author: user });
    });

    it('should not get reactions created by a specific user when unauthenticated', () => {
      return request(server)
        .get('/api/reaction/me')
        .expect(403);
    });

    it('should get reactions created by a specific user', async () => {
      const { body } = await userRequest
        .get('/api/reaction/me')
        .expect(200);

      // .toMatchObject makes the output hard to debug
      expect(body).toHaveProperty('total', 4);
      expect(body).toHaveProperty('items.0.id', information1.id);
      expect(body).toHaveProperty('items.0.reactions.0.id', reaction4.id);
      expect(body).toHaveProperty('items.0.reactions.1.id', reaction3.id);
    });

    it('should get reactions created by a specific user on page 2', async () => {
      const { body } = await userRequest
        .get('/api/reaction/me')
        .query({ page: 2 })
        .expect(200);

      expect(body).toHaveProperty('total', 4);
      expect(body).toHaveProperty('items.0.id', information1.id);
      expect(body).toHaveProperty('items.0.reactions.0.id', reaction1.id);
      expect(body).toHaveProperty('items.1.id', information2.id);
      expect(body).toHaveProperty('items.1.reactions.0.id', reaction2.id);
    });

  });

  describe('get reaction by id', () => {

    it('should get one reaction', () => {
      return request(server)
        .get(`/api/reaction/${reaction.id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            id: reaction.id,
            // date: expect.any(String),
          });
        });
    });

    it('should get the reaction history', () => {
      return request(server)
        .get(`/api/reaction/${reaction.id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            text: 'message2',
            history: [{ text: 'message2' }, { text: 'message1' }],
          });
        });
    });

  });

  describe('get replies', () => {

    it('should not get replies for an unexisting reaction', () => {
      return request(server)
        .get('/api/reaction/404/replies')
        .expect(404);
    });

    it('should get replies on page 1', () => {
      return request(server)
        .get(`/api/reaction/${reaction.id}/replies`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            items: [
              { id: reply1.id },
              { id: reply2.id },
            ],
            total: 3,
          });
        });
    });

    it('should get replies on page 2', () => {
      return request(server)
        .get(`/api/reaction/${reaction.id}/replies`)
        .query({ page: 2 })
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            items: [
              { id: reply3.id },
            ],
            total: 3,
          });
        });
    });

  });

  describe('subscribe to a reaction', () => {
    const [userRequest, user] = createAuthenticatedUser(server);

    it('should not subscribe when unauthenticated', () => {
      return request(server)
        .post(`/api/reaction/${reaction.id}/subscribe`)
        .expect(403);
    });

    it('should not subscribe to an unexisting reaction', () => {
      return userRequest
        .post('/api/reaction/404/subscribe')
        .expect(404);
    });

    it('should not subscribe to a reaction twice', async () => {
      const reaction = await createReaction();
      await createReactionSubscription({ reaction, user });

      return userRequest
        .post(`/api/reaction/${reaction.id}/subscribe`)
        .expect(409);
    });

    it('subscribe to a reaction', async () => {
      const reaction = await createReaction();

      await userRequest
        .post(`/api/reaction/${reaction.id}/subscribe`)
        .expect(201);

      const subscriptionDb = await subscriptionRepository.findOne({ user, reaction });

      expect(subscriptionDb).toBeDefined();
    });
  });

  describe('unsubscribe from a reaction', () => {
    const [userRequest, user] = createAuthenticatedUser(server);

    it('should not subscribe when unauthenticated', () => {
      return request(server)
        .post(`/api/reaction/${reaction.id}/unsubscribe`)
        .expect(403);
    });

    it('should not subscribe to an unexisting reaction', () => {
      return userRequest
        .post('/api/reaction/404/unsubscribe')
        .expect(404);
    });

    it('unsubscribe to a reaction', async () => {
      const reaction = await createReaction();
      await createReactionSubscription({ user, reaction });

      await userRequest
        .post(`/api/reaction/${reaction.id}/unsubscribe`)
        .expect(204);

      const subscriptionDb = await subscriptionRepository.findOne({ user, reaction });

      expect(subscriptionDb).not.toBeDefined();
    });
  });

  describe('set the subscribed field when subscribed to a reaction', () => {
    const [userRequest, user] = createAuthenticatedUser(server);

    it('should not set the subscribed field when unauthenticated', async () => {
      const reaction = await createReaction();

      const { body } = await request(server)
        .get(`/api/reaction/${reaction.id}`)
        .expect(200);

      expect(body.subscribed).not.toBeDefined();
    });

    it('should set the subscribed field to false when not subscribed to a reaction', async () => {
      const reaction = await createReaction();

      const { body } = await userRequest
        .get(`/api/reaction/${reaction.id}`)
        .expect(200);

      expect(body).toMatchObject({ subscribed: false });
    });

    it('should set the subscribed field to true when subscribed to a reaction', async () => {
      const reaction = await createReaction();
      await createReactionSubscription({ user, reaction });

      const { body } = await userRequest
        .get(`/api/reaction/${reaction.id}`)
        .expect(200);

      expect(body).toMatchObject({ subscribed: true });
    });

  });

  describe('create reaction', () => {
    const [userRequest, user] = createAuthenticatedUser(server);

    const makeReaction = (informationId: number): any => ({
      informationId,
      text: 'new reaction',
    });

    it('should not create a reaction when not authenticated', () => {
      const reaction = makeReaction(information.id);

      return request(server)
        .post('/api/reaction')
        .send(reaction)
        .expect(403);
    });

    it('should not create a reaction with missing informationId', () => {
      const reaction = makeReaction(information.id);
      delete reaction.informationId;

      return userRequest
        .post('/api/reaction')
        .send(reaction)
        .expect(400);
    });

    it('should not create a reaction with unexisting informationId', () => {
      const reaction = makeReaction(information.id);
      reaction.informationId = 404;

      return userRequest
        .post('/api/reaction')
        .send(reaction)
        .expect(400);
    });

    it('should not create a recation with missing text', () => {
      const reaction = makeReaction(information.id);
      delete reaction.text;

      return userRequest
        .post('/api/reaction')
        .send(reaction)
        .expect(400);
    });

    it('should create a reaction', async () => {
      const reaction = makeReaction(information.id);

      const { body } = await userRequest
        .post('/api/reaction')
        .send(reaction)
        .expect(201);

      expect(body).toMatchObject({
        author: { id: user.id },
        text: reaction.text,
      });

      const reactionDb = await reactionRepository.findOne(body.id);

      expect(reactionDb).toBeDefined();
    });

    it('should be subscribed to a created reaction', async () => {
      const reaction = makeReaction(information.id);

      const { body } = await userRequest
        .post('/api/reaction')
        .send(reaction)
        .expect(201);

      expect(body).toMatchObject({
        subscribed: true,
      });

      const subscriptionDb = await subscriptionRepository.findOne({
        where: {
          reaction: { id : body.id },
        },
      });

      expect(subscriptionDb).toBeDefined();
    });

  });

  describe('update reaction', () => {
    const [userRequest, user] = createAuthenticatedUser(server);

    it('should not update a reaction when not authenticated', () => {
      return request(server)
        .put(`/api/reaction/${reaction.id}`)
        .expect(403);
    });

    it('should not update an unexisting reaction', () => {
      return userRequest
        .put('/api/reaction/404')
        .expect(404);
    });

    it('should not update a reaction that does not belong to the authenticated user', () => {
      return userRequest
        .put(`/api/reaction/${reaction.id}`)
        .expect(403);
    });

    it('should update a reaction', async () => {
      const reaction = await createReaction({ author: user });

      const { body } = await userRequest
        .put(`/api/reaction/${reaction.id}`)
        .send({ text: 'edited' })
        .expect(200);

      expect(body).toMatchObject({
        text: 'edited',
      });
    });

  });

  describe('quick reaction', () => {
    const [userRequest, user] = createAuthenticatedUser(server);

    it('should not create a quick reaction when not authenticated', () => {
      return request(server)
        .post(`/api/reaction/${reaction.id}/quick-reaction`)
        .expect(403);
    });

    it('should not create a quick reaction with invalid type', () => {
      return userRequest
        .post(`/api/reaction/${reaction.id}/quick-reaction`)
        .send({ type: 'AGREE' })
        .expect(400);
    });

    it('should not create a quick reaction on own reaction', async () => {
      const reaction = await createReaction({ author: user });

      return userRequest
        .post(`/api/reaction/${reaction.id}/quick-reaction`)
        .send({ type: QuickReactionType.APPROVE })
        .expect(403);
    });

    it('should create a quick reaction', async () => {
      const { body } = await userRequest
        .post(`/api/reaction/${reaction.id}/quick-reaction`)
        .send({ type: QuickReactionType.APPROVE })
        .expect(201);

      expect(body).toMatchObject({
        quickReactionsCount: {
          APPROVE: 1,
          REFUTE: 0,
          SKEPTIC: 0,
        },
        userQuickReaction: 'APPROVE',
      });

      const quickReactionDb = await quickReactionRepository.findOne(body.id);

      expect(quickReactionDb).toMatchObject({ type: QuickReactionType.APPROVE });
    });

    it('should update a quick reaction', async () => {
      const { body } = await userRequest
        .post(`/api/reaction/${reaction.id}/quick-reaction`)
        .send({ type: QuickReactionType.SKEPTIC })
        .expect(201);

      expect(body).toMatchObject({
        quickReactionsCount: {
          APPROVE: 0,
          REFUTE: 0,
          SKEPTIC: 1,
        },
        userQuickReaction: 'SKEPTIC',
      });

      const quickReactionDb = await quickReactionRepository.findOne(body.id);

      expect(quickReactionDb).toMatchObject({ type: QuickReactionType.SKEPTIC });
    });

    it('should remove a quick reaction', async () => {
      const { body } = await userRequest
        .post(`/api/reaction/${reaction.id}/quick-reaction`)
        .send({ type: null })
        .expect(201);

      expect(body).toMatchObject({
        quickReactionsCount: {
          APPROVE: 0,
          REFUTE: 0,
          SKEPTIC: 0,
        },
      });

      expect(body).not.toHaveProperty('userQuickReaction');

      const quickReactionDb = await quickReactionRepository.findOne(body.id);

      expect(quickReactionDb).toMatchObject({ type: null });
    });

  });

  describe('score', () => {
    const [userRequest] = createAuthenticatedUser(server);
    const [userRequest2] = createAuthenticatedUser(server);

    beforeAll(async () => {
      information = await createInformation();
      reaction = await createReaction({ information });
    });

    it('should increment a reaction score by 2 when a reply is created', async () => {
      await userRequest
        .post('/api/reaction')
        .send({
          informationId: information.id,
          parentId: reaction.id,
          text: 'text',
        })
        .expect(201);

      const reactionDb = await reactionRepository.findOne(reaction.id);

      expect(reactionDb).toMatchObject({
        score: 2,
      });
    });

    // this is odd, but can still be achived by calling the api directly
    it('should not update the score when a quick reaction is created with type null', async () => {
      await userRequest
        .post(`/api/reaction/${reaction.id}/quick-reaction`)
        .send({ type: null })
        .expect(201);

      const reactionDb = await reactionRepository.findOne(reaction.id);

      expect(reactionDb).toMatchObject({
        score: 2,
      });
    });

    it('should increment a reaction score when a quick reaction is created', async () => {
      await userRequest
        .post(`/api/reaction/${reaction.id}/quick-reaction`)
        .send({ type: QuickReactionType.APPROVE })
        .expect(201);

      const reactionDb = await reactionRepository.findOne(reaction.id);

      expect(reactionDb).toMatchObject({
        score: 3,
      });
    });

    it('should not change a reaction score when a quick reaction is updated', async () => {
      await userRequest
        .post(`/api/reaction/${reaction.id}/quick-reaction`)
        .send({ type: QuickReactionType.SKEPTIC })
        .expect(201);

      const reactionDb = await reactionRepository.findOne(reaction.id);

      expect(reactionDb).toMatchObject({
        score: 3,
      });
    });

    it('should decrement a reaction score when a quick reaction is removed', async () => {
      await userRequest
        .post(`/api/reaction/${reaction.id}/quick-reaction`)
        .send({ type: null })
        .expect(201);

      const reactionDb = await reactionRepository.findOne(reaction.id);

      expect(reactionDb).toMatchObject({
        score: 2,
      });
    });

    it('should reincrement a reaction score when a quick reaction is recreated', async () => {
      await userRequest
        .post(`/api/reaction/${reaction.id}/quick-reaction`)
        .send({ type: QuickReactionType.APPROVE })
        .expect(201);

      const reactionDb = await reactionRepository.findOne(reaction.id);

      expect(reactionDb).toMatchObject({
        score: 3,
      });
    });

    it('should increment a parent reaction score when a quick reaction is created', async () => {
      const child = await reactionRepository.findOne({ parent: reaction });

      await userRequest2
        .post(`/api/reaction/${child.id}/quick-reaction`)
        .send({ type: QuickReactionType.APPROVE })
        .expect(201);

      const reactionDb = await reactionRepository.findOne(reaction.id);

      expect(reactionDb).toMatchObject({
        score: 4,
      });
    });

  });

});
