import { expect } from 'earljs';

import { Comment, createComment } from '../../../../entities/Comment';
import { MockCommentGateway } from '../../../../shared/mocks';
import { createMemoryStore } from '../../../../store/memoryStore';
import { selectComment, setComment } from '../../../../store/normalize';
import { Dispatch, GetState } from '../../../../store/store';
import { commentEntityToDto } from '../../commentDtoMap';

import { editComment } from './editComment';

describe('editComment', () => {
  let dispatch: Dispatch;
  let getState: GetState;

  let commentGateway: MockCommentGateway;

  beforeEach(() => {
    ({ dispatch, getState, commentGateway } = createMemoryStore());
  });

  const setup = (comment: Comment, edited: Comment) => {
    dispatch(setComment(comment));
    commentGateway.editComment.resolvesToOnce(commentEntityToDto(edited));
  };

  const getComment = (id: string) => selectComment(getState(), id);

  it('edits a comment', async () => {
    const text = 'edited';

    const comment = createComment({ text: 'initial' });
    const edited = createComment({ ...comment, text, edited: new Date() });

    setup(comment, edited);

    await dispatch(editComment(comment.id, text));

    expect(commentGateway.editComment).toHaveBeenCalledWith([comment.id, text]);

    expect(getComment(comment.id)).toEqual(edited);
  });

  it("disables the edited comment's edition mode", async () => {
    const comment = createComment({ text: 'initial', isEditing: true });
    const edited = createComment({ id: comment.id });

    setup(comment, edited);

    await dispatch(editComment(comment.id, ''));

    expect(getComment(comment.id)).toBeAnObjectWith({
      isEditing: false,
    });
  });

  it('notifies that the comment is being edited', async () => {
    const comment = createComment();
    const edited = createComment({ id: comment.id });

    setup(comment, edited);

    const promise = dispatch(editComment(comment.id, ''));

    expect(getComment(comment.id)).toBeAnObjectWith({
      isSubmittingEdition: true,
    });

    await promise;

    expect(getComment(comment.id)).toBeAnObjectWith({
      isSubmittingEdition: false,
    });
  });
});
