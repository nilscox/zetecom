import { expect } from 'earljs';

import { Comment, commentEntityToDto, createComment } from '../../../../entities';
import { MockCommentGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectComment, setComment } from '../../../../store/normalize';

import { editComment } from './editComment';

describe('editComment', () => {
  let store: MemoryStore;

  let commentGateway: MockCommentGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ commentGateway } = store.dependencies);
  });

  const setup = (comment: Comment, edited: Comment) => {
    store.dispatch(setComment(comment));
    commentGateway.editComment.resolvesToOnce(commentEntityToDto(edited));
  };

  const getComment = (id: string) => store.select(selectComment, id);

  it('edits a comment', async () => {
    const text = 'edited';

    const comment = createComment({ text: 'initial' });
    const edited = createComment({ ...comment, text, edited: new Date() });

    setup(comment, edited);

    await store.dispatch(editComment(comment.id, text));

    expect(commentGateway.editComment).toHaveBeenCalledWith([comment.id, text]);

    expect(getComment(comment.id)).toEqual(edited);
  });

  it("disables the edited comment's edition mode", async () => {
    const comment = createComment({ text: 'initial', isEditing: true });
    const edited = createComment({ id: comment.id });

    setup(comment, edited);

    await store.dispatch(editComment(comment.id, ''));

    expect(getComment(comment.id)).toBeAnObjectWith({
      isEditing: false,
    });
  });

  it('notifies that the comment is being edited', async () => {
    const comment = createComment();
    const edited = createComment({ id: comment.id });

    setup(comment, edited);

    const promise = store.dispatch(editComment(comment.id, ''));

    expect(getComment(comment.id)).toBeAnObjectWith({
      isSubmittingEdition: true,
    });

    await promise;

    expect(getComment(comment.id)).toBeAnObjectWith({
      isSubmittingEdition: false,
    });
  });
});
