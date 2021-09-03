import { expect } from 'earljs';

import { Comment, createComment } from '../../../../entities/Comment';
import { createMemoryStore } from '../../../../store/memoryStore';
import { selectComment, setComment } from '../../../../store/normalize';
import { Dispatch, GetState } from '../../../../store/store';

import { closeEditionForm, openEditionForm } from './openEditionForm';

describe('openEditionForm', () => {
  let dispatch: Dispatch;
  let getState: GetState;

  beforeEach(() => {
    ({ dispatch, getState } = createMemoryStore());
  });

  const getComment = (id: string) => selectComment(getState(), id);

  const setup = (comment: Comment) => {
    dispatch(setComment(comment));
  };

  it("opens a comment's edition form", () => {
    const comment = createComment();

    setup(comment);

    dispatch(openEditionForm(comment.id));

    expect(getComment(comment.id)).toBeAnObjectWith({ isEditing: true });
  });

  it("closes a comment's edition form", () => {
    const comment = createComment({ isEditing: true });

    setup(comment);

    dispatch(closeEditionForm(comment.id));

    expect(getComment(comment.id)).toBeAnObjectWith({ isEditing: false });
  });
});
