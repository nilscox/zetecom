import { expect } from 'earljs';

import { Comment, createComment } from '../../../../entities/Comment';
import { MockCommentGateway } from '../../../../shared/mocks';
import { paginated } from '../../../../shared/paginated';
import { createMemoryStore } from '../../../../store/memoryStore';
import { selectComment, setComment } from '../../../../store/normalize';
import { Dispatch, GetState } from '../../../../store/store';
import { commentDtoToEntity } from '../../commentDtoMap';

import { closeReplies, openReplies, toggleReplies } from './openReplies';

describe('openReplies', () => {
  let dispatch: Dispatch;
  let getState: GetState;

  let commentGateway: MockCommentGateway;

  beforeEach(() => {
    ({ dispatch, getState, commentGateway } = createMemoryStore());
  });

  const getComment = (commentId: string) => selectComment(getState(), commentId);

  const setup = (comment: Comment, replies: Comment[] = []) => {
    dispatch(setComment(comment));
    commentGateway.fetchReplies.resolvesToOnce(paginated(replies.map(commentDtoToEntity)));
  };

  it("opens a comment's replies", async () => {
    const comment = createComment({ repliesCount: 1 });
    const replies = [createComment()];

    setup(comment, replies);

    await dispatch(openReplies(comment.id));

    expect(getComment(comment.id)).toBeAnObjectWith({
      areRepliesOpen: true,
      replies,
    });
  });

  it('does not fetch the replies when they were already fetched', async () => {
    const replies = [createComment()];
    const comment = createComment({ replies });

    setup(comment, replies);

    await dispatch(openReplies(comment.id));

    expect(commentGateway.fetchReplies).not.toBeExhausted();
  });

  it("closes a comment's replies", async () => {
    const comment = createComment({ areRepliesOpen: true });

    setup(comment, []);

    await dispatch(closeReplies(comment.id));

    expect(getComment(comment.id).areRepliesOpen).toEqual(false);
  });

  it("toggles a comment's replies", async () => {
    const comment = createComment();

    setup(comment, []);

    await dispatch(toggleReplies(comment.id));

    expect(getComment(comment.id).areRepliesOpen).toEqual(true);

    await dispatch(toggleReplies(comment.id));

    expect(getComment(comment.id).areRepliesOpen).toEqual(false);
  });
});
