import request from 'supertest';
import { getCustomRepository, getRepository, Repository } from 'typeorm';

import { AuthenticationModule } from 'src/modules/authentication/authentication.module';
import { CommentsArea } from 'src/modules/comments-area/comments-area.entity';
import { CommentsAreaFactory } from 'src/modules/comments-area/comments-area.factory';
import { createAuthenticatedUser, setupE2eTest } from 'src/testing/setup-e2e-test';

import { Comment } from './comment.entity';
import { CommentFactory } from './comment.factory';
import { CommentModule } from './comment.module';
import { CommentRepository } from './comment.repository';
import { Reaction, ReactionType } from './reaction.entity';
import { Subscription } from './subscription/subscription.entity';
import { SubscriptionFactory } from './subscription/subscription.factory';

describe('comment controller', () => {
  const { server } = setupE2eTest(
    {
      imports: [CommentModule, AuthenticationModule],
    },
    moduleBuilder => {
      moduleBuilder.overrideProvider('COMMENT_PAGE_SIZE').useValue(2);
    },
  );

  const reactionsCountZero = {
    [ReactionType.like]: 0,
    [ReactionType.approve]: 0,
    [ReactionType.think]: 0,
    [ReactionType.disagree]: 0,
    [ReactionType.dontUnderstand]: 0,
  };

  const commentsAreaFactory = new CommentsAreaFactory();
  const commentFactory = new CommentFactory();
  const subscriptionFactory = new SubscriptionFactory();

  let commentRepository: CommentRepository;
  let reactionRepository: Repository<Reaction>;
  let subscriptionRepository: Repository<Subscription>;

  beforeAll(async () => {
    commentRepository = getCustomRepository(CommentRepository);
    reactionRepository = getRepository(Reaction);
    subscriptionRepository = getRepository(Subscription);
  });

  describe('get root', () => {
    let commentsArea: CommentsArea;

    let comment1: Comment;
    let comment2: Comment;
    let comment3: Comment;
    let comment4: Comment;

    beforeAll(async () => {
      commentsArea = await commentsAreaFactory.create();

      comment1 = await commentFactory.create({ commentsArea: commentsArea }, 'search');
      comment2 = await commentFactory.create({ commentsArea: commentsArea });
      comment3 = await commentFactory.create({ commentsArea: commentsArea, parent: comment1 }, 'you search me');
      comment4 = await commentFactory.create({ commentsArea: commentsArea });

      const commentsArea2 = await commentsAreaFactory.create();

      await commentFactory.create({ commentsArea: commentsArea2 }, 'search');
    });

    it('should return a bad request when not providing a commentsAreaId', async () => {
      await request(server).get('/api/comment').expect(400);
    });

    it('should not find comments for a comment area that does not exist', async () => {
      await request(server).get('/api/comment').query({ commentsAreaId: 42 }).expect(404);
    });

    it('should fetch the root comments', async () => {
      const { body } = await request(server).get('/api/comment').query({ commentsAreaId: commentsArea.id }).expect(200);

      expect(body).toMatchObject({
        items: [{ id: comment4.id }, { id: comment2.id }],
        total: 3,
      });
    });

    it('should fetch the root comments on page 2', async () => {
      const { body } = await request(server)
        .get('/api/comment')
        .query({ commentsAreaId: commentsArea.id, page: 2 })
        .expect(200);

      expect(body).toMatchObject({
        items: [{ id: comment1.id }],
        total: 3,
      });
    });

    it('should fetch the root comments sorted by date asc', async () => {
      const { body } = await request(server)
        .get('/api/comment')
        .query({ commentsAreaId: commentsArea.id, sort: 'date-asc' })
        .expect(200);

      expect(body).toMatchObject({
        items: [{ id: comment1.id }, { id: comment2.id }],
        total: 3,
      });
    });

    it('should fetch the comments that match a search query', async () => {
      const { body } = await request(server)
        .get('/api/comment')
        .query({ commentsAreaId: commentsArea.id, search: 'search' })
        .expect(200);

      expect(body).toMatchObject({
        items: [{ id: comment3.id }, { id: comment1.id }],
        total: 2,
      });
    });
  });

  describe('get for user', () => {
    const [userRequest, user] = createAuthenticatedUser(server);

    let commentsArea1: CommentsArea;
    let CommentsArea2: CommentsArea;
    let comment1: Comment;
    let comment2: Comment;
    let comment3: Comment;
    let comment4: Comment;

    beforeAll(async () => {
      commentsArea1 = await commentsAreaFactory.create();
      CommentsArea2 = await commentsAreaFactory.create();

      comment1 = await commentFactory.create({ commentsArea: commentsArea1, author: user });

      comment2 = await commentFactory.create({ commentsArea: CommentsArea2, author: user }, 'comment2 search');
      // await commentFactory.create({ commentsArea: commentsArea2 });

      comment3 = await commentFactory.create({ commentsArea: commentsArea1, author: user });
      comment4 = await commentFactory.create(
        {
          commentsArea: commentsArea1,
          author: user,
        },
        'comment4 you search me',
      );
    });

    it('should not get comments created by a specific user when unauthenticated', async () => {
      await request(server).get('/api/comment/me').expect(403);
    });

    it('should get comments for a user', async () => {
      const { body } = await userRequest.get('/api/comment/me').expect(200);

      expect(body).toMatchObject({
        total: 4,
        items: [
          {
            commentsArea: { id: commentsArea1.id },
            comments: [
              { id: comment4.id, text: expect.any(String) },
              { id: comment3.id, text: expect.any(String) },
            ],
          },
        ],
      });
    });

    it('should get comments for a user on page 2', async () => {
      const { body } = await userRequest.get('/api/comment/me').query({ page: 2 }).expect(200);

      expect(body).toMatchObject({
        total: 4,
        items: [
          {
            commentsArea: { id: CommentsArea2.id },
            comments: [{ id: comment2.id, text: expect.any(String) }],
          },
          {
            commentsArea: { id: commentsArea1.id },
            comments: [{ id: comment1.id, text: expect.any(String) }],
          },
        ],
      });
    });

    it('should search comments for a user', async () => {
      const { body } = await userRequest.get('/api/comment/me').query({ search: 'search' }).expect(200);

      expect(body).toMatchObject({
        total: 2,
        items: [
          {
            comments: [{ id: comment4.id }],
          },
          {
            comments: [{ id: comment2.id }],
          },
        ],
      });
    });
  });

  describe('get by id', () => {
    let comment: Comment;

    beforeAll(async () => {
      comment = await commentFactory.create({}, 'hello');
    });

    it('should get one comment', async () => {
      const { body } = await request(server).get(`/api/comment/${comment.id}`).expect(200);

      expect(body).toMatchObject({
        id: comment.id,
        date: expect.any(String),
        author: {},
        edited: false,
        text: 'hello',
        repliesCount: 0,
        reactionsCount: reactionsCountZero,
        score: 0,
      });
    });
  });

  describe('get history', () => {
    let comment: Comment;

    beforeAll(async () => {
      comment = await commentFactory.create({}, 'message 1');

      await commentFactory.edit(comment, 'message 2');
    });

    it('should get the comment history', async () => {
      const { body } = await request(server).get(`/api/comment/${comment.id}/history`).expect(200);

      expect(body).toMatchObject([
        { text: 'message 2', date: expect.any(String) },
        { text: 'message 1', date: expect.any(String) },
      ]);
    });
  });

  describe('get replies', () => {
    let commentsArea: CommentsArea;

    let comment: Comment;

    let reply1: Comment;
    let reply2: Comment;
    let reply3: Comment;

    beforeAll(async () => {
      commentsArea = await commentsAreaFactory.create();

      comment = await commentFactory.create();

      reply1 = await commentFactory.create({ commentsArea, parent: comment });
      reply2 = await commentFactory.create({ commentsArea, parent: comment });
      reply3 = await commentFactory.create({ commentsArea, parent: comment });
    });

    it('should not get replies for an unexisting comment', async () => {
      await request(server).get('/api/comment/404/replies').expect(404);
    });

    it("should get a comment's replies on page 1", async () => {
      const { body } = await request(server).get(`/api/comment/${comment.id}/replies`).expect(200);

      expect(body).toMatchObject({
        items: [{ id: reply1.id }, { id: reply2.id }],
        total: 3,
      });
    });

    it("should get a comment's replies on page 2", async () => {
      const { body } = await request(server).get(`/api/comment/${comment.id}/replies`).query({ page: 2 }).expect(200);

      expect(body).toMatchObject({
        items: [{ id: reply3.id }],
        total: 3,
      });
    });
  });

  describe('subscribe to a comment', () => {
    let comment: Comment;

    beforeAll(async () => {
      comment = await commentFactory.create();
    });

    const [userRequest, user] = createAuthenticatedUser(server);

    it('should not subscribe when unauthenticated', async () => {
      await request(server).post(`/api/comment/${comment.id}/subscribe`).expect(403);
    });

    it('should not subscribe to an unexisting comment', async () => {
      return userRequest.post('/api/comment/404/subscribe').expect(404);
    });

    it('should not subscribe to a comment twice', async () => {
      const comment = await commentFactory.create();
      await subscriptionFactory.create({ comment, user });

      return userRequest.post(`/api/comment/${comment.id}/subscribe`).expect(409);
    });

    it('subscribe to a comment', async () => {
      const comment = await commentFactory.create();

      await userRequest.post(`/api/comment/${comment.id}/subscribe`).expect(201);

      const { body } = await userRequest.get(`/api/comment/${comment.id}`).expect(200);

      expect(body).toHaveProperty('subscribed', true);

      const subscriptionDb = await subscriptionRepository.findOne({ user, comment });

      expect(subscriptionDb).toBeDefined();
    });
  });

  describe('unsubscribe from a comment', () => {
    let comment: Comment;

    beforeAll(async () => {
      comment = await commentFactory.create();
    });

    const [userRequest, user] = createAuthenticatedUser(server);

    it('should not subscribe when unauthenticated', async () => {
      await request(server).post(`/api/comment/${comment.id}/unsubscribe`).expect(403);
    });

    it('should not subscribe to an unexisting comment', async () => {
      return userRequest.post('/api/comment/404/unsubscribe').expect(404);
    });

    it('unsubscribe to a comment', async () => {
      const comment = await commentFactory.create();
      await subscriptionFactory.create({ user, comment });

      await userRequest.post(`/api/comment/${comment.id}/unsubscribe`).expect(204);

      const { body } = await userRequest.get(`/api/comment/${comment.id}`).expect(200);

      expect(body).toHaveProperty('subscribed', false);

      const subscriptionDb = await subscriptionRepository.findOne({ user, comment });

      expect(subscriptionDb).not.toBeDefined();
    });
  });

  describe('create comment', () => {
    let commentsArea: CommentsArea;

    beforeAll(async () => {
      commentsArea = await commentsAreaFactory.create();
    });

    const [userRequest, user] = createAuthenticatedUser(server);

    const makeComment = (commentsAreaId: number) => ({
      commentsAreaId,
      text: 'new comment',
    });

    it('should not create a comment when not authenticated', async () => {
      const comment = makeComment(commentsArea.id);

      await request(server).post('/api/comment').send(comment).expect(403);
    });

    it('should not create a comment with missing commentsAreaId', async () => {
      const comment = makeComment(commentsArea.id);
      delete comment.commentsAreaId;

      return userRequest.post('/api/comment').send(comment).expect(400);
    });

    it('should not create a comment with unexisting commentsAreaId', async () => {
      const comment = makeComment(commentsArea.id);
      comment.commentsAreaId = 404;

      return userRequest.post('/api/comment').send(comment).expect(400);
    });

    it('should not create a recation with missing text', async () => {
      const comment = makeComment(commentsArea.id);
      delete comment.text;

      return userRequest.post('/api/comment').send(comment).expect(400);
    });

    it('should create a comment', async () => {
      const comment = makeComment(commentsArea.id);

      const { body } = await userRequest.post('/api/comment').send(comment).expect(201);

      expect(body).toMatchObject({
        author: { id: user.id },
        text: comment.text,
      });

      const commentDb = await commentRepository.findOne(body.id);

      expect(commentDb).toBeDefined();
    });

    it('should be subscribed to a created comment', async () => {
      const comment = makeComment(commentsArea.id);

      const { body } = await userRequest.post('/api/comment').send(comment).expect(201);

      expect(body).toMatchObject({
        subscribed: true,
      });

      const subscriptionDb = await subscriptionRepository.findOne({
        where: {
          comment: { id: body.id },
        },
      });

      expect(subscriptionDb).toBeDefined();
    });
  });

  describe('edit comment', () => {
    let comment: Comment;

    beforeAll(async () => {
      comment = await commentFactory.create();
    });

    const [userRequest, user] = createAuthenticatedUser(server);

    it('should not edit a comment when not authenticated', async () => {
      await request(server).put(`/api/comment/${comment.id}`).expect(403);
    });

    it('should not edit an unexisting comment', async () => {
      return userRequest.put('/api/comment/404').send({ text: 'text' }).expect(404);
    });

    it('should not edit a comment that does not belong to the authenticated user', async () => {
      return userRequest.put(`/api/comment/${comment.id}`).expect(403);
    });

    it('should not edit a comment when there is no change', async () => {
      const comment = await commentFactory.create({ author: user });

      await userRequest.put(`/api/comment/${comment.id}`).send({ text: comment.message.text }).expect(400);
    });

    it('should edit a comment', async () => {
      const comment = await commentFactory.create({ author: user });

      const { body } = await userRequest.put(`/api/comment/${comment.id}`).send({ text: 'edited' }).expect(200);

      expect(body).toMatchObject({
        text: 'edited',
      });
    });
  });

  describe('reaction', () => {
    let comment: Comment;

    beforeAll(async () => {
      comment = await commentFactory.create();
    });

    const [userRequest, user] = createAuthenticatedUser(server);

    it('should not create a reaction when not authenticated', async () => {
      await request(server).post(`/api/comment/${comment.id}/reaction`).expect(403);
    });

    it('should not create a reaction with invalid type', async () => {
      return userRequest.post(`/api/comment/${comment.id}/reaction`).send({ type: 'AGREE' }).expect(400);
    });

    it('should not create a reaction on own comment', async () => {
      const comment = await commentFactory.create({ author: user });

      return userRequest.post(`/api/comment/${comment.id}/reaction`).send({ type: ReactionType.like }).expect(403);
    });

    it('should create a reaction', async () => {
      await userRequest.post(`/api/comment/${comment.id}/reaction`).send({ type: ReactionType.like }).expect(204);

      const { body } = await userRequest.get(`/api/comment/${comment.id}`).expect(200);

      expect(body).toMatchObject({
        reactionsCount: {
          ...reactionsCountZero,
          [ReactionType.like]: 1,
        },
        userReaction: ReactionType.like,
      });

      const reactionsDb = await reactionRepository.find({ where: { comment }, relations: ['user'] });

      expect(reactionsDb).toHaveLength(1);
      expect(reactionsDb[0]).toMatchObject({ type: ReactionType.like, user: { id: user.id } });
    });

    it('should update a reaction', async () => {
      await userRequest.post(`/api/comment/${comment.id}/reaction`).send({ type: ReactionType.think }).expect(204);

      const { body } = await userRequest.get(`/api/comment/${comment.id}`).expect(200);

      expect(body).toMatchObject({
        reactionsCount: {
          ...reactionsCountZero,
          [ReactionType.think]: 1,
        },
        userReaction: ReactionType.think,
      });

      const reactionsDb = await reactionRepository.find({ where: { comment }, relations: ['user'] });

      expect(reactionsDb).toHaveLength(1);
      expect(reactionsDb[0]).toMatchObject({ type: ReactionType.think, user: { id: user.id } });
    });

    it('should remove a reaction', async () => {
      await userRequest.post(`/api/comment/${comment.id}/reaction`).send({ type: null }).expect(204);

      const { body } = await userRequest.get(`/api/comment/${comment.id}`).expect(200);

      expect(body).not.toHaveProperty('userReaction');

      expect(body).toMatchObject({
        reactionsCount: reactionsCountZero,
      });

      const reactionsDb = await reactionRepository.find({ where: { comment }, relations: ['user'] });

      expect(reactionsDb).toHaveLength(1);
      expect(reactionsDb[0]).toMatchObject({ type: null, user: { id: user.id } });
    });
  });

  describe('score', () => {
    let commentsArea: CommentsArea;
    let comment: Comment;

    beforeAll(async () => {
      commentsArea = await commentsAreaFactory.create();
      comment = await commentFactory.create({ commentsArea });
    });

    const [userRequest] = createAuthenticatedUser(server);
    const [userRequest2] = createAuthenticatedUser(server);

    beforeAll(async () => {
      commentsArea = await commentsAreaFactory.create();
      comment = await commentFactory.create({ commentsArea });
    });

    it('should increment a comment score by 2 when a reply is created', async () => {
      await userRequest
        .post('/api/comment')
        .send({
          commentsAreaId: commentsArea.id,
          parentId: comment.id,
          text: 'text',
        })
        .expect(201);

      const commentDb = await commentRepository.findOne(comment.id);

      expect(commentDb).toMatchObject({
        score: 2,
      });
    });

    // this is odd, but can still be achived by calling the api directly
    it('should not update the score when a reaction is created with type null', async () => {
      await userRequest.post(`/api/comment/${comment.id}/reaction`).send({ type: null }).expect(204);

      const commentDb = await commentRepository.findOne(comment.id);

      expect(commentDb).toMatchObject({
        score: 2,
      });
    });

    it('should increment a comment score when a reaction is created', async () => {
      await userRequest.post(`/api/comment/${comment.id}/reaction`).send({ type: ReactionType.like }).expect(204);

      const commentDb = await commentRepository.findOne(comment.id);

      expect(commentDb).toMatchObject({
        score: 3,
      });
    });

    it('should not change a comment score when a reaction is updated', async () => {
      await userRequest.post(`/api/comment/${comment.id}/reaction`).send({ type: ReactionType.disagree }).expect(204);

      const commentDb = await commentRepository.findOne(comment.id);

      expect(commentDb).toMatchObject({
        score: 3,
      });
    });

    it('should decrement a comment score when a reaction is removed', async () => {
      await userRequest.post(`/api/comment/${comment.id}/reaction`).send({ type: null }).expect(204);

      const commentDb = await commentRepository.findOne(comment.id);

      expect(commentDb).toMatchObject({
        score: 2,
      });
    });

    it('should reincrement a comment score when a reaction is recreated', async () => {
      await userRequest.post(`/api/comment/${comment.id}/reaction`).send({ type: ReactionType.like }).expect(204);

      const commentDb = await commentRepository.findOne(comment.id);

      expect(commentDb).toMatchObject({
        score: 3,
      });
    });

    it('should increment a parent comment score when a reaction is created', async () => {
      const child = await commentRepository.findOne({ parent: comment });

      await userRequest2.post(`/api/comment/${child.id}/reaction`).send({ type: ReactionType.like }).expect(204);

      const commentDb = await commentRepository.findOne(comment.id);

      expect(commentDb).toMatchObject({
        score: 4,
      });
    });
  });
});
