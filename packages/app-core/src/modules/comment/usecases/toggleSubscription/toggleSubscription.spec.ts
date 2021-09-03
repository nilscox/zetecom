import { expect } from 'earljs';

import { Comment, createComment } from '../../../../entities/Comment';
import { MockCommentGateway } from '../../../../shared/mocks';
import { createMemoryStore } from '../../../../store/memoryStore';
import { selectComment, setComment } from '../../../../store/normalize';
import { Dispatch, GetState } from '../../../../store/store';

import { toggleSubscription } from './toggleSubscription';

describe('toggleSubscription', () => {
  let dispatch: Dispatch;
  let getState: GetState;

  let commentGateway: MockCommentGateway;

  beforeEach(() => {
    ({ dispatch, getState, commentGateway } = createMemoryStore());
  });

  const getComment = (id: string) => selectComment(getState(), id);

  const setup = (comment: Comment) => {
    dispatch(setComment(comment));
    commentGateway.setSubscription.resolvesToOnce(undefined);
  };

  const execute = (comment: Comment) => dispatch(toggleSubscription(comment.id));

  it('subscribes to a comment', async () => {
    const comment = createComment({ subscribed: false });

    setup(comment);

    await execute(comment);

    expect(commentGateway.setSubscription).toHaveBeenCalledWith([comment.id, true]);

    expect(getComment(comment.id)).toBeAnObjectWith({
      subscribed: true,
    });
  });

  it('unsubscribes to a comment', async () => {
    const comment = createComment({ subscribed: true });

    setup(comment);

    await execute(comment);

    expect(commentGateway.setSubscription).toHaveBeenCalledWith([comment.id, false]);

    expect(getComment(comment.id)).toBeAnObjectWith({
      subscribed: false,
    });
  });
});
