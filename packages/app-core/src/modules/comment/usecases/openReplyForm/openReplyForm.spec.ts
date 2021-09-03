import { expect } from 'earljs';

import { Comment, createComment } from '../../../../entities/Comment';
import { MockCommentGateway } from '../../../../shared/mocks';
import { paginated } from '../../../../shared/paginated';
import { createMemoryStore } from '../../../../store/memoryStore';
import { selectComment, setComment } from '../../../../store/normalize';
import { Dispatch, GetState } from '../../../../store/store';

import { closeReplyForm, openReplyForm, toggleReplyForm } from './openReplyForm';

describe('openReplyForm', () => {
  let dispatch: Dispatch;
  let getState: GetState;

  let commentGateway: MockCommentGateway;

  beforeEach(() => {
    ({ dispatch, getState, commentGateway } = createMemoryStore());
  });

  const setup = (parent: Comment) => {
    dispatch(setComment(parent));
    commentGateway.fetchReplies.resolvesToOnce(paginated([]));

    return parent;
  };

  const getComment = (commentId: string) => selectComment(getState(), commentId);

  it('opens the reply form', async () => {
    const comment = setup(createComment());

    await dispatch(openReplyForm(comment.id));

    expect(getComment(comment.id).isReplyFormOpen).toEqual(true);
  });

  it('opens the replies', async () => {
    const comment = setup(createComment({ repliesCount: 1 }));

    await dispatch(openReplyForm(comment.id));

    expect(getComment(comment.id).areRepliesOpen).toEqual(true);
  });

  it('closes the reply form', async () => {
    const comment = setup(createComment({ isReplyFormOpen: true }));

    await dispatch(closeReplyForm(comment.id));

    expect(getComment(comment.id).isReplyFormOpen).toEqual(false);
  });

  it('toggles the reply form', async () => {
    const comment = setup(createComment());

    await dispatch(toggleReplyForm(comment.id));

    expect(getComment(comment.id).isReplyFormOpen).toEqual(true);

    await dispatch(toggleReplyForm(comment.id));

    expect(getComment(comment.id).isReplyFormOpen).toEqual(false);
  });
});
