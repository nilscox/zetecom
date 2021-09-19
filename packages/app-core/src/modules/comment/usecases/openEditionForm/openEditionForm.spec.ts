import { expect } from 'earljs';

import { Comment, createComment } from '../../../../entities';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectComment, setComment } from '../../../../store/normalize';

import { closeEditionForm, openEditionForm } from './openEditionForm';

describe('openEditionForm', () => {
  let store: MemoryStore;

  beforeEach(() => {
    store = new MemoryStore();
  });

  const getComment = (id: string) => store.select(selectComment, id);

  const setup = (comment: Comment) => {
    store.dispatch(setComment(comment));
  };

  it("opens a comment's edition form", () => {
    const comment = createComment();

    setup(comment);

    store.dispatch(openEditionForm(comment.id));

    expect(getComment(comment.id)).toBeAnObjectWith({ isEditing: true });
  });

  it("closes a comment's edition form", () => {
    const comment = createComment({ isEditing: true });

    setup(comment);

    store.dispatch(closeEditionForm(comment.id));

    expect(getComment(comment.id)).toBeAnObjectWith({ isEditing: false });
  });
});
