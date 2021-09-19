import { expect } from 'earljs';

import { Comment, createComment } from '../../../../entities';
import { MockCommentGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectComment, setComment } from '../../../../store/normalize';

import { toggleSubscription } from './toggleSubscription';

describe('toggleSubscription', () => {
  let store: MemoryStore;

  let commentGateway: MockCommentGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ commentGateway } = store.dependencies);
  });

  const getComment = (id: string) => store.select(selectComment, id);

  const setup = (comment: Comment) => {
    store.dispatch(setComment(comment));
    commentGateway.setSubscription.resolvesToOnce(undefined);
  };

  const execute = (comment: Comment) => store.dispatch(toggleSubscription(comment.id));

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
