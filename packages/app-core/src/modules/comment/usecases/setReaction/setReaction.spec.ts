import { expect } from 'earljs';

import { Comment, createComment, createReactionsCount, ReactionsCount, ReactionType } from '../../../../entities';
import { MockCommentGateway, MockTrackingGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectComment, setComment } from '../../../../store/normalize';

import { setReaction } from './setReaction';

describe('setReaction', () => {
  let store: MemoryStore;

  let commentGateway: MockCommentGateway;
  let trackingGateway: MockTrackingGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ commentGateway, trackingGateway } = store.dependencies);
  });

  const getComment = (id: string) => store.select(selectComment, id);

  const setup = (comment: Comment) => {
    store.dispatch(setComment(comment));
    commentGateway.updateReaction.resolvesToOnce(undefined);
  };

  const execute = (comment: Comment, reaction: ReactionType) => store.dispatch(setReaction(comment.id, reaction));

  const expectReactions = (
    commentId: string,
    expected: { expectedUserReaction: ReactionType | null; expectedReactions: Partial<ReactionsCount> },
  ) => {
    expect(getComment(commentId)).toBeAnObjectWith({
      userReaction: expected.expectedUserReaction,
      reactionsCount: expect.objectWith(expected.expectedReactions),
    });
  };

  it('adds a reaction to a comment', async () => {
    const comment = createComment({ userReaction: null });

    setup(comment);

    await execute(comment, ReactionType.disagree);

    expect(commentGateway.updateReaction).toHaveBeenCalledWith([comment.id, ReactionType.disagree]);

    expectReactions(comment.id, {
      expectedUserReaction: ReactionType.disagree,
      expectedReactions: {
        [ReactionType.disagree]: 1,
      },
    });
  });

  it('updates a reaction to a comment', async () => {
    const comment = createComment({
      userReaction: ReactionType.disagree,
      reactionsCount: createReactionsCount({
        disagree: 1,
      }),
    });

    setup(comment);

    await execute(comment, ReactionType.think);

    expectReactions(comment.id, {
      expectedUserReaction: ReactionType.think,
      expectedReactions: {
        [ReactionType.disagree]: 0,
        [ReactionType.think]: 1,
      },
    });
  });

  it('removes a reaction to a comment', async () => {
    const comment = createComment({
      userReaction: ReactionType.think,
      reactionsCount: createReactionsCount({
        think: 1,
      }),
    });

    setup(comment);

    await execute(comment, ReactionType.think);

    expect(commentGateway.updateReaction).toHaveBeenCalledWith([comment.id, null]);

    expectReactions(comment.id, {
      expectedUserReaction: null,
      expectedReactions: {
        [ReactionType.think]: 0,
      },
    });
  });

  describe('tracking', () => {
    it('tracks an event when a reaction is set', async () => {
      const comment = createComment();

      setup(comment);

      await execute(comment, ReactionType.think);

      expect(trackingGateway.track).toHaveBeenCalledWith([
        { category: 'comment', action: 'set reaction', name: 'set reaction think' },
      ]);
    });

    it('tracks an event when a reaction is unset', async () => {
      const comment = createComment({ userReaction: ReactionType.think });

      setup(comment);

      await execute(comment, ReactionType.think);

      expect(trackingGateway.track).toHaveBeenCalledWith([{ category: 'comment', action: 'unset reaction' }]);
    });
  });
});
