import { expect } from 'earljs';

import { createComment } from '../../../entities/Comment';
import { createUser, User } from '../../../entities/User';
import { createMemoryStore } from '../../../store/memoryStore';
import { setComment } from '../../../store/normalize';
import { Dispatch, GetState } from '../../../store/store';
import { setCurrentUser } from '../../user/usecases/setCurrentUser/setCurrentUser';
import { setIsReplyFormOpen } from '../commentActions';

import {
  selectCanEdit,
  selectCanReply,
  selectCanReport,
  selectCanSetReaction,
  selectCanSubscribe,
  selectCanToggleReplies,
  selectComment,
  selectIsAuthor,
  selectReportCommentLink,
} from './commentSelectors';

describe('commentSelectors', () => {
  let dispatch: Dispatch;
  let getState: GetState;

  beforeEach(() => {
    ({ dispatch, getState } = createMemoryStore());
  });

  const author = createUser();
  const comment = createComment({ author });

  beforeEach(() => {
    dispatch(setComment(comment));
  });

  const setUser = (user: User) => {
    dispatch(setCurrentUser(user));
  };

  it('selectComment', () => {
    expect(selectComment(getState(), comment.id)).toEqual(comment);
  });

  it('selectReportCommentLink', () => {
    expect(selectReportCommentLink(getState(), comment.id)).toEqual(`/commentaire/${comment.id}/signaler`);
  });

  it('selectIsAuthor', () => {
    expect(selectIsAuthor(getState(), comment.id)).toEqual(false);

    setUser(createUser());
    expect(selectIsAuthor(getState(), comment.id)).toEqual(false);

    setUser(author);
    expect(selectIsAuthor(getState(), comment.id)).toEqual(true);
  });

  it('selectCanEdit', () => {
    expect(selectCanEdit(getState(), comment.id)).toEqual(false);

    setUser(createUser());
    expect(selectCanEdit(getState(), comment.id)).toEqual(false);

    setUser(author);
    expect(selectCanEdit(getState(), comment.id)).toEqual(true);
  });

  it('selectCanReply', () => {
    expect(selectCanReply(getState(), comment.id)).toEqual(false);

    setUser(createUser());
    expect(selectCanReply(getState(), comment.id)).toEqual(true);
  });

  it('selectCanSetReaction', () => {
    expect(selectCanSetReaction(getState(), comment.id)).toEqual(false);

    setUser(author);
    expect(selectCanSetReaction(getState(), comment.id)).toEqual(false);

    setUser(createUser());
    expect(selectCanSetReaction(getState(), comment.id)).toEqual(true);
  });

  it('selectCanToggleReplies', () => {
    expect(selectCanToggleReplies(getState(), comment.id)).toEqual(false);

    dispatch(setComment({ ...comment, repliesCount: 2 }));
    expect(selectCanToggleReplies(getState(), comment.id)).toEqual(true);

    dispatch(setIsReplyFormOpen(comment.id, true));
    expect(selectCanToggleReplies(getState(), comment.id)).toEqual(false);
  });

  it('selectCanSubscribe', () => {
    expect(selectCanSubscribe(getState(), comment.id)).toEqual(false);

    setUser(createUser());
    expect(selectCanSubscribe(getState(), comment.id)).toEqual(true);
  });

  it('selectCanReport', () => {
    expect(selectCanReport(getState(), comment.id)).toEqual(false);

    setUser(author);
    expect(selectCanReport(getState(), comment.id)).toEqual(false);

    setUser(createUser());
    expect(selectCanReport(getState(), comment.id)).toEqual(true);
  });
});
