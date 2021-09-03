import { expect } from 'earljs';

import { Comment, createComment } from '../../../../entities/Comment';
import { MockCommentGateway } from '../../../../shared/mocks';
import { paginated } from '../../../../shared/paginated';
import { createMemoryStore } from '../../../../store/memoryStore';
import { selectComment, setComment } from '../../../../store/normalize';
import { Dispatch, GetState } from '../../../../store/store';
import { commentEntityToDto } from '../../commentDtoMap';

import { fetchReplies } from './fetchReplies';

describe('fetchReplies', () => {
  let dispatch: Dispatch;
  let getState: GetState;

  let commentGateway: MockCommentGateway;

  beforeEach(() => {
    ({ dispatch, getState, commentGateway } = createMemoryStore());
  });

  const getComment = (commentId: string) => selectComment(getState(), commentId);

  const setup = (comment: Comment, replies: Comment[]) => {
    dispatch(setComment(comment));
    commentGateway.fetchReplies.resolvesToOnce(paginated(replies.map(commentEntityToDto)));
  };

  it("fetches a comment's replies", async () => {
    const comment = createComment({ repliesCount: 1 });
    const replies = [createComment()];

    setup(comment, replies);

    await dispatch(fetchReplies(comment.id));

    expect(commentGateway.fetchReplies).toHaveBeenCalledWith([comment.id]);

    expect(getComment(comment.id)).toBeAnObjectWith({
      replies,
    });
  });

  it('notifies that the replies are being fetched', async () => {
    const comment = createComment({ repliesCount: 1 });
    const replies = [createComment()];

    setup(comment, replies);

    const promise = dispatch(fetchReplies(comment.id));

    expect(getComment(comment.id)).toBeAnObjectWith({
      isFetchingReplies: true,
    });

    await promise;

    expect(getComment(comment.id)).toBeAnObjectWith({
      isFetchingReplies: false,
    });
  });
});
