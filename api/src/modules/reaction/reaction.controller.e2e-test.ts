// tslint:disable no-shadowed-variable

import * as request from 'supertest';
import { getCustomRepository, Repository, getRepository } from 'typeorm';

import { ReactionModule } from './reaction.module';
import { Reaction } from '../reaction/reaction.entity';

import { setupE2eTest } from '../../testing/setup-e2e-test';
import { createReaction } from '../../testing/factories/reaction.factory';
import { createMessage } from '../../testing/factories/message.factory';
import { createUser } from '../../testing/factories/user.factory';
import { createInformation } from '../../testing/factories/information.factory';
import { Information } from '../information/information.entity';
import { createSubject } from '../../testing/factories/subject.factory';
import { ReactionRepository } from './reaction.repository';
import { AuthenticationModule } from '../authentication/authentication.module';
import { QuickReactionType, QuickReaction } from './quick-reaction.entity';

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

  let information: Information;

  let reaction: Reaction;

  let reply1: Reaction;
  let reply2: Reaction;
  let reply3: Reaction;

  beforeAll(async () => {
    reactionRepository = getCustomRepository(ReactionRepository);
    quickReactionRepository = getRepository(QuickReaction);

    const user = await createUser();

    information = await createInformation();

    reaction = await createReaction({
      author: user,
      information,
      messages: [
        await createMessage({ text: 'message1' }),
        await createMessage({ text: 'message2' }),
      ],
    });

    reply1 = await createReaction({ information, parent: reaction });
    reply2 = await createReaction({ information, parent: reaction });
    reply3 = await createReaction({ information, parent: reaction });
  });

  describe('get reaction by id', () => {

    it('should get one reaction', () => {
      return request(server)
        .get(`/api/reaction/${reaction.id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            id: reaction.id,
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
            history: [{ text: 'message1' }],
          });
        });
    });

  });

  describe('get replies', () => {

    it('should not get replies for an unexisting reaction', () => {
      return request(server)
        .get(`/api/reaction/404/replies`)
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

  describe('create reaction', () => {
    let authRequest: request.SuperTest<request.Test>;
    let user: any;

    const makeReaction = (informationId: number): any => ({
      informationId,
      text: 'new reaction',
    });

    beforeAll(async () => {
      authRequest = request.agent(server);

      const { body } = await authRequest
        .post('/api/auth/signup')
        .send({
          nick: 'nick1',
          email: 'user1@domain.tld',
          password: 'password',
        })
        .expect(201);

      user = body;
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

      return authRequest
        .post('/api/reaction')
        .send(reaction)
        .expect(400);
    });

    it('should not create a reaction with unexisting informationId', () => {
      const reaction = makeReaction(information.id);
      reaction.informationId = 404;

      return authRequest
        .post('/api/reaction')
        .send(reaction)
        .expect(400);
    });

    it('should not create a recation with missing text', () => {
      const reaction = makeReaction(information.id);
      delete reaction.text;

      return authRequest
      .post('/api/reaction')
        .send(reaction)
        .expect(400);
    });

    it('should create a reaction', async () => {
      const reaction = makeReaction(information.id);

      const { body } = await authRequest
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

    it('should not create with unexisting subject', () => {
      const reaction = makeReaction(information.id);
      reaction.subjectId = 404;

      return authRequest
      .post('/api/reaction')
        .send(reaction)
        .expect(400);
    });

    it('should not create with subjectId not matching informationId', async () => {
      const subject = await createSubject();
      const reaction = makeReaction(information.id);
      reaction.subjectId = subject.id;

      return authRequest
        .post('/api/reaction')
        .send(reaction)
        .expect(400);
    });

    it('should create a reaction attached to a subject', async () => {
      const subject = await createSubject({ information });
      const reaction = makeReaction(information.id);
      reaction.subjectId = subject.id;

      const { body } = await authRequest
        .post('/api/reaction')
        .send(reaction)
        .expect(201);

      const reactionDb = await reactionRepository.findOne(body.id, { relations: ['subject'] });

      expect(reactionDb).toBeDefined();
      expect(reactionDb.subject).toMatchObject({ id: subject.id });
    });

  });

  describe('update reaction', () => {
    let authRequest: request.SuperTest<request.Test>;
    let user: any;

    beforeAll(async () => {
      authRequest = request.agent(server);

      const { body } = await authRequest
        .post('/api/auth/signup')
        .send({
          nick: 'nick2',
          email: 'user2@domain.tld',
          password: 'password',
        })
        .expect(201);

      user = body;
    });

    it('should not update a reaction when not authenticated', () => {
      return request(server)
        .put(`/api/reaction/${reaction.id}`)
        .expect(403);
    });

    it('should not update an unexisting reaction', () => {
      return authRequest
        .put(`/api/reaction/404`)
        .expect(404);
    });

    it('should not update a reaction that does not belong to the authenticated user', () => {
      return authRequest
        .put(`/api/reaction/${reaction.id}`)
        .expect(403);
    });

    it('should update a reaction', async () => {
      const reaction = await createReaction({ author: user });

      const { body } = await authRequest
        .put(`/api/reaction/${reaction.id}`)
        .send({ text: 'edited' })
        .expect(200);

      expect(body).toMatchObject({
        text: 'edited',
      });
    });

  });

  describe('quick reaction', () => {
    let authRequest: request.SuperTest<request.Test>;
    let user: any;

    beforeAll(async () => {
      authRequest = request.agent(server);

      const { body } = await authRequest
        .post('/api/auth/signup')
        .send({
          nick: 'nick3',
          email: 'user3@domain.tld',
          password: 'password',
        })
        .expect(201);

      user = body;
    });

    it('should not create a quick reaction when not authenticated', () => {
      return request(server)
        .post(`/api/reaction/${reaction.id}/quick-reaction`)
        .expect(403);
    });

    it('should not create a quick reaction with invalid type', () => {
      return authRequest
        .post(`/api/reaction/${reaction.id}/quick-reaction`)
        .send({ type: 'AGREE' })
        .expect(400);
    });

    it('should create a quick reaction', async () => {
      const { body } = await authRequest
        .post(`/api/reaction/${reaction.id}/quick-reaction`)
        .send({ type: QuickReactionType.APPROVE })
        .expect(201);

      expect(body).toMatchObject({
        quickReactionsCount: {
          [QuickReactionType.APPROVE]: 1,
          [QuickReactionType.REFUTE]: 0,
          [QuickReactionType.SKEPTIC]: 0,
        },
        userQuickReaction: QuickReactionType.APPROVE,
      });

      const quickReactionDb = await quickReactionRepository.findOne(body.id);

      expect(quickReactionDb).toMatchObject({ type: QuickReactionType.APPROVE });
    });

    it('should update a quick reaction', async () => {
      const { body } = await authRequest
        .post(`/api/reaction/${reaction.id}/quick-reaction`)
        .send({ type: QuickReactionType.SKEPTIC })
        .expect(201);

      expect(body).toMatchObject({
        quickReactionsCount: {
          [QuickReactionType.APPROVE]: 0,
          [QuickReactionType.REFUTE]: 0,
          [QuickReactionType.SKEPTIC]: 1,
        },
        userQuickReaction: QuickReactionType.SKEPTIC,
      });

      const quickReactionDb = await quickReactionRepository.findOne(body.id);

      expect(quickReactionDb).toMatchObject({ type: QuickReactionType.SKEPTIC });
    });

    it('should remove a quick reaction', async () => {
      const { body } = await authRequest
        .post(`/api/reaction/${reaction.id}/quick-reaction`)
        .send({ type: null })
        .expect(201);

      expect(body).toMatchObject({
        quickReactionsCount: {
          [QuickReactionType.APPROVE]: 0,
          [QuickReactionType.REFUTE]: 0,
          [QuickReactionType.SKEPTIC]: 0,
        },
        userQuickReaction: null,
      });

      const quickReactionDb = await quickReactionRepository.findOne(body.id);

      expect(quickReactionDb).toMatchObject({ type: null });
    });

  });

  describe('score', () => {
    let authRequest: request.SuperTest<request.Test>;
    let user: any;
    let information: Information;
    let reaction: Reaction;

    beforeAll(async () => {
      authRequest = request.agent(server);

      const { body } = await authRequest
        .post('/api/auth/signup')
        .send({
          nick: 'nick4',
          email: 'user4@domain.tld',
          password: 'password',
        })
        .expect(201);

      user = body;
    });

    beforeAll(async () => {
      information = await createInformation();
      reaction = await createReaction({ information });
    });

    it('should increment a reaction score by 2 when a reply is created', async () => {
      await authRequest
        .post(`/api/reaction`)
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

    it('should increment a reaction score when a quick reaction is created', async () => {
      await authRequest
        .post(`/api/reaction/${reaction.id}/quick-reaction`)
        .send({ type: QuickReactionType.APPROVE })
        .expect(201);

      const reactionDb = await reactionRepository.findOne(reaction.id);

      expect(reactionDb).toMatchObject({
        score: 3,
      });
    });

    it('should not change a reaction score when a quick reaction is updated', async () => {
      await authRequest
        .post(`/api/reaction/${reaction.id}/quick-reaction`)
        .send({ type: QuickReactionType.SKEPTIC })
        .expect(201);

      const reactionDb = await reactionRepository.findOne(reaction.id);

      expect(reactionDb).toMatchObject({
        score: 3,
      });
    });

    it('should decrement a reaction score when a quick reaction is removed', async () => {
      await authRequest
        .post(`/api/reaction/${reaction.id}/quick-reaction`)
        .send({ type: null })
        .expect(201);

      const reactionDb = await reactionRepository.findOne(reaction.id);

      expect(reactionDb).toMatchObject({
        score: 2,
      });
    });

  });

});
