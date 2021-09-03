import { expect } from 'earljs';

import {
  Comment,
  createComment,
  createReactionsCount,
  ReactionsCount,
  ReactionType,
} from '../../../../entities/Comment';
import { MockCommentGateway } from '../../../../shared/mocks';
import { createMemoryStore } from '../../../../store/memoryStore';
import { selectComment, setComment } from '../../../../store/normalize';
import { Dispatch, GetState } from '../../../../store/store';

import { setReaction } from './setReaction';

describe('setReaction', () => {
  let dispatch: Dispatch;
  let getState: GetState;

  let commentGateway: MockCommentGateway;

  beforeEach(() => {
    ({ dispatch, getState, commentGateway } = createMemoryStore());
  });

  const getComment = (id: string) => selectComment(getState(), id);

  const setup = (comment: Comment) => {
    dispatch(setComment(comment));
    commentGateway.updateReaction.resolvesToOnce(undefined);
  };

  const execute = (comment: Comment, reaction: ReactionType) => dispatch(setReaction(comment.id, reaction));

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
});
