import { getCustomRepository } from 'typeorm';

import { SortType } from 'Common/sort-type';

import { createInformation } from '../../testing/factories/information.factory';
import { createMessage } from '../../testing/factories/message.factory';
import { createQuickReaction } from '../../testing/factories/quick-reaction.factory';
import { createReaction } from '../../testing/factories/reaction.factory';
import { createUser } from '../../testing/factories/user.factory';
import { setupIntgTest } from '../../testing/setup-intg-test';

import { QuickReactionType } from './quick-reaction.entity';
import { ReactionRepository } from './reaction.repository';

describe('reaction repository', () => {

  setupIntgTest();

  let reactionRepository: ReactionRepository;

  beforeAll(async () => {
    reactionRepository = getCustomRepository(ReactionRepository);
  });

  describe('findRootReactions', () => {
    it('should find the root reactions on the first page', async () => {
      const information = await createInformation();
      const reaction1 = await createReaction({ information });
      const reaction2 = await createReaction({ information });
      await createReaction({ information });

      const result = await reactionRepository.findRootReactions(information.id, SortType.DATE_ASC, 1, 2);

      expect(result).toMatchObject({
        items: [
          { id: reaction1.id },
          { id: reaction2.id },
        ],
        total: 3,
      });
    });

    it('should find the root reactions on page 2', async () => {
      const information = await createInformation();
      await createReaction({ information });
      await createReaction({ information });
      const reaction3 = await createReaction({ information });

      const result = await reactionRepository.findRootReactions(information.id, SortType.DATE_ASC, 2, 2);

      expect(result).toMatchObject({
        items: [
          { id: reaction3.id },
        ],
        total: 3,
      });
    });

    it('should find the root reactions sorted by date-desc', async () => {
      const information = await createInformation();
      const reaction1 = await createReaction({ information });
      const reaction2 = await createReaction({ information });

      const result = await reactionRepository.findRootReactions(information.id, SortType.DATE_DESC, 1, 2);

      expect(result).toMatchObject({
        items: [
          { id: reaction2.id },
          { id: reaction1.id },
        ],
      });
    });

    it('should find the root reactions sorted by relevance', async () => {
      const information = await createInformation();
      const reaction1 = await createReaction({ information, score: 1 });
      const reaction2 = await createReaction({ information, score: 2 });
      const reaction3 = await createReaction({ information, score: 3 });

      const result = await reactionRepository.findRootReactions(information.id, SortType.RELEVANCE, 1, 3);

      expect(result).toMatchObject({
        items: [
          { id: reaction3.id },
          { id: reaction2.id },
          { id: reaction1.id },
        ],
      });
    });
  });

  describe('search', () => {
    it('should search for a reaction on page 1', async () => {
      const information = await createInformation();
      const reaction1 = await createReaction({ information, messages: [await createMessage({ text: 'searching...' })] });
      const reaction2 = await createReaction({ information });
      const reaction3 = await createReaction({ information, parent: reaction2, messages: [await createMessage({ text: 'you search me' })] });
      await createReaction({ information, messages: [await createMessage({ text: 'eousearcheoop' })] });

      const result = await reactionRepository.search(information.id, 'search', SortType.DATE_ASC, 1, 2);

      expect(result).toMatchObject({
        items: [
          { id: reaction1.id },
          { id: reaction3.id },
        ],
      });
    });

    it('should search for a reaction on page 2', async () => {
      const information = await createInformation();
      await createReaction({ information, messages: [await createMessage({ text: 'searching...' })] });
      const reaction2 = await createReaction({ information });
      await createReaction({ information, parent: reaction2, messages: [await createMessage({ text: 'you search me' })] });
      const reaction4 = await createReaction({ information, messages: [await createMessage({ text: 'eousearcheoop' })] });

      const result = await reactionRepository.search(information.id, 'search', SortType.DATE_ASC, 2, 2);

      expect(result).toMatchObject({
        items: [
          { id: reaction4.id },
        ],
      });
    });
  });

  describe('findReplies', () => {
    it('should find replies on page 1', async () => {
      const information = await createInformation();
      const root = await createReaction({ information });
      const child1 = await createReaction({ information, parent: root });
      const child2 = await createReaction({ information, parent: root });
      await createReaction({ information, parent: root });

      const result = await reactionRepository.findReplies(root.id, 1, 2);

      expect(result).toMatchObject({
        items: [
          { id: child1.id },
          { id: child2.id },
        ],
      });
    });

    it('should find replies on page 2', async () => {
      const information = await createInformation();
      const root = await createReaction({ information });
      await createReaction({ information, parent: root });
      await createReaction({ information, parent: root });
      const child3 = await createReaction({ information, parent: root });

      const result = await reactionRepository.findReplies(root.id, 2, 2);

      expect(result).toMatchObject({
        items: [
          { id: child3.id },
        ],
      });
    });
  });

  describe('findForUser', () => {
    it('should find the reactions for a user on the first page', async () => {
      const author = await createUser();
      const information = await createInformation();
      const reaction1 = await createReaction({ information, author });
      const reaction2 = await createReaction({ information, author });
      await createReaction({ information, author });

      const result = await reactionRepository.findForUser(author.id, undefined, '', SortType.DATE_ASC, 1, 2);

      expect(result).toMatchObject({
        items: [
          { id: reaction1.id },
          { id: reaction2.id },
        ],
      });
    });

    it('should find the reactions for a user on page 2', async () => {
      const information = await createInformation();
      const author = await createUser();
      await createReaction({ information, author });
      await createReaction({ information, author });
      const reaction3 = await createReaction({ information, author });

      const result = await reactionRepository.findForUser(author.id, undefined, '', SortType.DATE_ASC, 2, 2);

      expect(result).toMatchObject({
        items: [
          { id: reaction3.id },
        ],
      });
    });

    it('should find the reactions for a user sorted by date-desc', async () => {
      const information = await createInformation();
      const author = await createUser();
      const reaction1 = await createReaction({ information, author });
      const reaction2 = await createReaction({ information, author });

      const result = await reactionRepository.findForUser(author.id, undefined, '', SortType.DATE_DESC, 1, 2);

      expect(result).toMatchObject({
        items: [
          { id: reaction2.id },
          { id: reaction1.id },
        ],
      });
    });

    it('should find the reactions for a user sorted by relevance', async () => {
      const author = await createUser();
      const reaction1 = await createReaction({ author, score: 1 });
      const reaction2 = await createReaction({ author, score: 2 });
      const reaction3 = await createReaction({ author, score: 3 });

      const result = await reactionRepository.findForUser(author.id, undefined, '', SortType.RELEVANCE, 1, 3);

      expect(result).toMatchObject({
        items: [
          { id: reaction3.id },
          { id: reaction2.id },
          { id: reaction1.id },
        ],
      });
    });
  });

  describe('getRepliesCounts', () => {
    it('should find the replies counts', async () => {
      const information = await createInformation();
      const reaction = await createReaction({ information });
      await createReaction({ information, parent: reaction });

      const result = await reactionRepository.getRepliesCounts([reaction.id]);

      expect(result).toMatchObject([{
        reactionId: reaction.id,
        repliesCount: 1,
      }]);
    });
  });

  describe('getQuickReactionsCounts', () => {
    it('should find the quick reactions counts', async () => {
      const information = await createInformation();
      const reaction = await createReaction({ information });
      await createQuickReaction({ reaction, type: QuickReactionType.APPROVE });
      await createQuickReaction({ reaction, type: QuickReactionType.APPROVE });
      await createQuickReaction({ reaction, type: QuickReactionType.REFUTE });

      const result = await reactionRepository.getQuickReactionsCounts([reaction.id]);

      expect(result).toMatchObject([{
        reactionId: reaction.id,
        quickReactions: {
          [QuickReactionType.APPROVE]: 2,
          [QuickReactionType.REFUTE]: 1,
          [QuickReactionType.SKEPTIC]: 0,
        },
      }]);
    });
  });

  describe('getQuickReactionForUser', () => {
    it('should find the quick reaction for a user', async () => {
      const user = await createUser();
      const information = await createInformation();
      const reaction = await createReaction({ information, author: user });
      await createQuickReaction({ reaction, user, type: QuickReactionType.REFUTE });

      const result = await reactionRepository.getQuickReactionForUser([reaction.id], user.id);

      expect(result).toMatchObject([{
        reactionId: reaction.id,
        type: QuickReactionType.REFUTE,
      }]);
    });
  });
});
