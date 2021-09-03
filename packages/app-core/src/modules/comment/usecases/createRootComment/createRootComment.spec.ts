import { expect } from 'earljs';

import { Comment, createComment } from '../../../../entities/Comment';
import { MockCommentGateway } from '../../../../shared/mocks';
import { createMemoryStore } from '../../../../store/memoryStore';
import { selectComment } from '../../../../store/normalize';
import { Dispatch, GetState } from '../../../../store/store';
import { selectIsSubmittingRootComment } from '../../../commentsArea/selectors/commentsAreaSelectors';
import { commentEntityToDto } from '../../commentDtoMap';

import { createRootComment as createCommentThunk } from './createRootComment';

describe('createRootComment', () => {
  let dispatch: Dispatch;
  let getState: GetState;

  let commentGateway: MockCommentGateway;

  beforeEach(() => {
    ({ dispatch, getState, commentGateway } = createMemoryStore());
  });

  const setup = (comment: Comment) => {
    commentGateway.createComment.resolvesToOnce(commentEntityToDto(comment));
  };

  const getComment = (id: string) => selectComment(getState(), id);

  it('creates a root comment', async () => {
    const comment = createComment();

    setup(comment);

    await dispatch(createCommentThunk(comment.text));

    expect(commentGateway.createComment).toHaveBeenCalledWith([comment.text]);

    expect(getComment(comment.id)).toEqual(comment);
  });

  it('notifies that a root comment is being submitted', async () => {
    const comment = createComment();

    setup(comment);

    const promise = dispatch(createCommentThunk(comment.text));

    expect(selectIsSubmittingRootComment(getState())).toEqual(true);

    await promise;

    expect(selectIsSubmittingRootComment(getState())).toEqual(false);
  });
});
