import { DeepPartial, getCustomRepository, getManager } from 'typeorm';

import { SortType } from 'Common/sort-type';

import { createInformation } from '../../testing/factories/information.factory';
import { createMessage } from '../../testing/factories/message.factory';
import { createReaction } from '../../testing/factories/reaction.factory';
import { createUser } from '../../testing/factories/user.factory';
import { setupIntgTest } from '../../testing/setup-intg-test';

import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { ReactionType } from './reaction.entity';

export const createComment = async (data: DeepPartial<Comment> = {}) => {
  const manager = getManager();

  if (!data.information)
    data.information = await createInformation();

  if (!data.author)
    data.author = await createUser();

  if (!data.message)
    data.message = await createMessage();

  const comment = manager.create(Comment, {
    ...data,
  });

  const result = await manager.save(comment);

  if (data.history) {
    await Promise.all(data.history.map(message => {
      message.comment = result;
      return manager.save(message);
    }));
  }

  data.message.comment = comment;
  await manager.save(data.message);
  await manager.query(`UPDATE message SET created = NOW() WHERE id = ${data.message.id}`);

  return result;
};

describe('comment repository', () => {

  setupIntgTest();

  let commentRepository: CommentRepository;

  beforeAll(async () => {
    commentRepository = getCustomRepository(CommentRepository);
  });

  describe('findRootComments', () => {
    it('should find the root comments on the first page', async () => {
      const information = await createInformation();
      const comment1 = await createComment({ information });
      const comment2 = await createComment({ information });
      await createComment({ information });

      const result = await commentRepository.findRootComments(information.id, SortType.DATE_ASC, 1, 2);

      expect(result).toMatchObject({
        items: [
          { id: comment1.id },
          { id: comment2.id },
        ],
        total: 3,
      });
    });

    it('should find the root comments on page 2', async () => {
      const information = await createInformation();
      await createComment({ information });
      await createComment({ information });
      const comment3 = await createComment({ information });

      const result = await commentRepository.findRootComments(information.id, SortType.DATE_ASC, 2, 2);

      expect(result).toMatchObject({
        items: [
          { id: comment3.id },
        ],
        total: 3,
      });
    });

    it('should find the root comments sorted by date-desc', async () => {
      const information = await createInformation();
      const comment1 = await createComment({ information });
      const comment2 = await createComment({ information });

      const result = await commentRepository.findRootComments(information.id, SortType.DATE_DESC, 1, 2);

      expect(result).toMatchObject({
        items: [
          { id: comment2.id },
          { id: comment1.id },
        ],
      });
    });

    it('should find the root comments sorted by relevance', async () => {
      const information = await createInformation();
      const comment1 = await createComment({ information, score: 1 });
      const comment2 = await createComment({ information, score: 2 });
      const comment3 = await createComment({ information, score: 3 });

      const result = await commentRepository.findRootComments(information.id, SortType.RELEVANCE, 1, 3);

      expect(result).toMatchObject({
        items: [
          { id: comment3.id },
          { id: comment2.id },
          { id: comment1.id },
        ],
      });
    });

    it('should find the root comments when the first message was edited', async () => {
      const information = await createInformation();
      const comment1 = await createComment({ information });
      const comment2 = await createComment({ information });
      await createComment({ information });
      await createMessage({ comment: { id: comment1.id} });

      const result = await commentRepository.findRootComments(information.id, SortType.DATE_ASC, 1, 2);

      expect(result).toMatchObject({
        items: [
          { id: comment1.id },
          { id: comment2.id },
        ],
        total: 3,
      });
    });
  });

  describe('search', () => {
    it('should search for a comment on page 1', async () => {
      const information = await createInformation();
      const comment1 = await createComment({ information, message: await createMessage({ text: 'searching...' }) });
      const comment2 = await createComment({ information });
      const comment3 = await createComment({ information, parent: comment2, message: await createMessage({ text: 'you search me' }) });
      await createComment({ information, message: await createMessage({ text: 'eousearcheoop' }) });

      const result = await commentRepository.search(information.id, 'search', SortType.DATE_ASC, 1, 2);

      expect(result).toMatchObject({
        items: [
          { id: comment1.id },
          { id: comment3.id },
        ],
      });
    });

    it('should search for a comment on page 2', async () => {
      const information = await createInformation();
      await createComment({ information, message: await createMessage({ text: 'searching...' }) });
      const comment2 = await createComment({ information });
      await createComment({ information, parent: comment2, message: await createMessage({ text: 'you search me' }) });
      const comment4 = await createComment({ information, message: await createMessage({ text: 'eousearcheoop' }) });

      const result = await commentRepository.search(information.id, 'search', SortType.DATE_ASC, 2, 2);

      expect(result).toMatchObject({
        items: [
          { id: comment4.id },
        ],
      });
    });
  });

  describe('findReplies', () => {
    it('should find replies on page 1', async () => {
      const information = await createInformation();
      const root = await createComment({ information });
      const child1 = await createComment({ information, parent: root });
      const child2 = await createComment({ information, parent: root });
      await createComment({ information, parent: root });

      const result = await commentRepository.findReplies(root.id, 1, 2);

      expect(result).toMatchObject({
        items: [
          { id: child1.id },
          { id: child2.id },
        ],
      });
    });

    it('should find replies on page 2', async () => {
      const information = await createInformation();
      const root = await createComment({ information });
      await createComment({ information, parent: root });
      await createComment({ information, parent: root });
      const child3 = await createComment({ information, parent: root });

      const result = await commentRepository.findReplies(root.id, 2, 2);

      expect(result).toMatchObject({
        items: [
          { id: child3.id },
        ],
      });
    });
  });

  describe('findForUser', () => {
    it('should find the comments for a user on the first page', async () => {
      const author = await createUser();
      const information = await createInformation();
      await createComment({ information, author });
      const comment2 = await createComment({ information, author });
      const comment3 = await createComment({ information, author });

      const result = await commentRepository.findForUser(author.id, '', 1, 2);

      expect(result).toMatchObject({
        items: [
          { informationId: information.id, commentId: comment3.id },
          { informationId: information.id, commentId: comment2.id },
        ],
        total: 3,
      });
    });

    it('should find the comments for a user on page 2', async () => {
      const information = await createInformation();
      const author = await createUser();
      const comment1 = await createComment({ information, author });
      await createComment({ information, author });
      await createComment({ information, author });

      const result = await commentRepository.findForUser(author.id, '', 2, 2);

      expect(result).toMatchObject({
        items: [
          { informationId: information.id, commentId: comment1.id },
        ],
        total: 3,
      });
    });
  });

  describe('getRepliesCounts', () => {
    it('should find the replies counts', async () => {
      const information = await createInformation();
      const comment = await createComment({ information });
      await createComment({ information, parent: comment });

      const result = await commentRepository.getRepliesCounts([comment.id]);

      expect(result).toMatchObject([{
        commentId: comment.id,
        repliesCount: 1,
      }]);
    });
  });

  describe('getReactionsCounts', () => {
    it('should find the comments counts', async () => {
      const information = await createInformation();
      const comment = await createComment({ information });
      await createReaction({ comment, type: ReactionType.APPROVE });
      await createReaction({ comment, type: ReactionType.APPROVE });
      await createReaction({ comment, type: ReactionType.REFUTE });

      const result = await commentRepository.getReactionsCounts([comment.id]);

      expect(result).toMatchObject([{
        commentId: comment.id,
        reactions: {
          [ReactionType.APPROVE]: 2,
          [ReactionType.REFUTE]: 1,
          [ReactionType.SKEPTIC]: 0,
        },
      }]);
    });
  });

  describe('getReactionForUser', () => {
    it('should find the comment for a user', async () => {
      const user = await createUser();
      const information = await createInformation();
      const comment = await createComment({ information, author: user });
      await createReaction({ comment, user, type: ReactionType.REFUTE });

      const result = await commentRepository.getReactionForUser([comment.id], user.id);

      expect(result).toMatchObject([{
        commentId: comment.id,
        type: ReactionType.REFUTE,
      }]);
    });
  });
});
