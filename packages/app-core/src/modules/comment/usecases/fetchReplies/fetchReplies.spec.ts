import { expect } from 'earljs';

import { Comment, commentEntityToDto, createComment } from '../../../../entities';
import { MockCommentGateway } from '../../../../shared/mocks';
import { paginated } from '../../../../shared/paginated';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectComment, setComment } from '../../../../store/normalize';

import { fetchReplies } from './fetchReplies';

describe('fetchReplies', () => {
  let store: MemoryStore;

  let commentGateway: MockCommentGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ commentGateway } = store.dependencies);
  });

  const getComment = (commentId: string) => store.select(selectComment, commentId);

  const setup = (comment: Comment, replies: Comment[]) => {
    store.dispatch(setComment(comment));
    commentGateway.fetchReplies.resolvesToOnce(paginated(replies.map(commentEntityToDto)));
  };

  it("fetches a comment's replies", async () => {
    const comment = createComment({ repliesCount: 1 });
    const replies = [createComment()];

    setup(comment, replies);

    await store.dispatch(fetchReplies(comment.id));

    expect(commentGateway.fetchReplies).toHaveBeenCalledWith([comment.id]);

    expect(getComment(comment.id)).toBeAnObjectWith({
      replies,
    });
  });

  it('notifies that the replies are being fetched', async () => {
    const comment = createComment({ repliesCount: 1 });
    const replies = [createComment()];

    setup(comment, replies);

    const promise = store.dispatch(fetchReplies(comment.id));

    expect(getComment(comment.id)).toBeAnObjectWith({
      isFetchingReplies: true,
    });

    await promise;

    expect(getComment(comment.id)).toBeAnObjectWith({
      isFetchingReplies: false,
    });
  });
});
