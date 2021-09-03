import { expect } from 'earljs';

import { Comment, createComment } from '../../../../entities/Comment';
import { MockCommentGateway } from '../../../../shared/mocks';
import { createMemoryStore } from '../../../../store/memoryStore';
import { setComment } from '../../../../store/normalize';
import { Dispatch, GetState } from '../../../../store/store';
import { commentEntityToDto } from '../../commentDtoMap';
import { selectComment } from '../../selectors/commentSelectors';

import { createReply } from './createReply';

describe('createReply', () => {
  let dispatch: Dispatch;
  let getState: GetState;

  let commentGateway: MockCommentGateway;

  beforeEach(() => {
    ({ dispatch, getState, commentGateway } = createMemoryStore());
  });

  const getComment = (commentId: string) => selectComment(getState(), commentId);

  const setup = (parent: Comment, reply: Comment) => {
    dispatch(setComment(parent));

    commentGateway.createComment.resolvesToOnce(commentEntityToDto(reply));
  };

  it('adds a reply to a comment', async () => {
    const parent = createComment();
    const reply = createComment();

    setup(parent, reply);

    await dispatch(createReply(parent.id, reply.text));

    expect(commentGateway.createComment).toHaveBeenCalledWith([reply.text, parent.id]);

    expect(selectComment(getState(), parent.id)).toBeAnObjectWith({
      repliesCount: 1,
      replies: [reply],
    });
  });

  it('prepends a reply to a comment already having replies', async () => {
    const existingReply = createComment();
    const parent = createComment({ replies: [existingReply] });
    const reply = createComment();

    setup(parent, reply);

    await dispatch(createReply(parent.id, reply.text));

    expect(selectComment(getState(), parent.id)).toBeAnObjectWith({
      repliesCount: 2,
      replies: [reply, existingReply],
    });
  });

  it('notifies that the reply is being submitted', async () => {
    const parent = createComment();
    const reply = createComment();

    setup(parent, reply);

    const promise = dispatch(createReply(parent.id, reply.text));

    expect(getComment(parent.id)).toBeAnObjectWith({
      isSubmittingReply: true,
    });

    await promise;

    expect(getComment(parent.id)).toBeAnObjectWith({
      isSubmittingReply: false,
    });
  });

  it('closes the reply form', async () => {
    const parent = createComment({ isReplyFormOpen: true });
    const reply = createComment();

    setup(parent, reply);

    await dispatch(createReply(parent.id, reply.text));

    expect(getComment(parent.id)).toBeAnObjectWith({
      isReplyFormOpen: false,
    });
  });
});
