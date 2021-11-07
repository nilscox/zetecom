import { expect } from 'earljs';

import { Comment, commentEntityToDto, createComment } from '../../../../entities';
import { MockCommentGateway, MockTrackingGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectComment, setComment } from '../../../../store/normalize';

import { editComment } from './editComment';

describe('editComment', () => {
  let store: MemoryStore;

  let commentGateway: MockCommentGateway;
  let trackingGateway: MockTrackingGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ commentGateway, trackingGateway } = store.dependencies);
  });

  const setup = (comment: Comment, edited = createComment({ id: comment.id })) => {
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

    setup(comment);

    await store.dispatch(editComment(comment.id, ''));

    expect(getComment(comment.id)).toBeAnObjectWith({
      isEditing: false,
    });
  });

  it('notifies that the comment is being edited', async () => {
    const comment = createComment();

    setup(comment);

    await store.testLoadingState(
      editComment(comment.id, ''),
      (state) => selectComment(state, comment.id).isSubmittingEdition,
    );
  });

  it('tracks a comment edited event', async () => {
    const comment = createComment();

    setup(comment);

    await store.dispatch(editComment(comment.id, ''));

    expect(trackingGateway.track).toHaveBeenCalledWith([{ category: 'comment', action: 'comment edited' }]);
  });
});
