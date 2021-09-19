import { createComment, createUser } from '../../../entities';
import { MemoryStore } from '../../../store/MemoryStore';
import { setComment } from '../../../store/normalize';
import { setFetchingComment, setIsCommentReported, setIsReplyFormOpen, setIsReportingComment } from '../actions';

import {
  selectCanEdit,
  selectCanReply,
  selectCanReport,
  selectCanSetReaction,
  selectCanSubscribe,
  selectCanToggleReplies,
  selectCanViewHistory,
  selectComment,
  selectIsAuthor,
  selectIsCommentReported,
  selectIsFetchingComment,
  selectIsReportingComment,
  selectReportCommentLink,
} from './commentSelectors';

describe('commentSelectors', () => {
  let store: MemoryStore;

  beforeEach(() => {
    store = new MemoryStore();
  });

  const user = createUser();
  const author = createUser();
  const comment = createComment({ author });

  beforeEach(() => {
    store.dispatch(setComment(comment));
  });

  const login = () => {
    store.user = user;
  };

  const loginAsAuthor = () => {
    store.user = author;
  };

  it('selectComment', () => {
    store.testState(selectComment, comment.id).expect({
      before: comment,
    });
  });

  it('selectIsFetchingComment', () => {
    store.testState(selectIsFetchingComment).expect({
      before: false,
      action: setFetchingComment(true),
      after: true,
    });
  });

  it('selectIsReportingComment', () => {
    store.testState(selectIsReportingComment).expect({
      before: false,
      action: setIsReportingComment(true),
      after: true,
    });
  });

  it('selectIsCommentReported', () => {
    store.testState(selectIsCommentReported).expect({
      before: false,
      action: setIsCommentReported(true),
      after: true,
    });
  });

  it('selectReportCommentLink', () => {
    store.testState(selectReportCommentLink, comment.id).expect({
      before: `/commentaire/${comment.id}/signaler`,
    });
  });

  it('selectIsAuthor', () => {
    store
      .testState(selectIsAuthor, comment.id)
      .expect({
        before: false,
        action: login,
        after: false,
      })
      .expect({
        action: loginAsAuthor,
        after: true,
      });
  });

  it('selectCanEdit', () => {
    store
      .testState(selectCanEdit, comment.id)
      .expect({
        before: false,
        action: login,
        after: false,
      })
      .expect({
        action: loginAsAuthor,
        after: true,
      });
  });

  it('selectCanReply', () => {
    store.testState(selectCanReply, comment.id).expect({
      before: false,
      action: login,
      after: true,
    });
  });

  it('selectCanSetReaction', () => {
    store
      .testState(selectCanSetReaction, comment.id)
      .expect({
        before: false,
        action: loginAsAuthor,
        after: false,
      })
      .expect({
        before: false,
        action: login,
        after: true,
      });
  });

  it('selectCanToggleReplies', () => {
    store
      .testState(selectCanToggleReplies, comment.id)
      .expect({
        before: false,
        action: setComment({ ...comment, repliesCount: 2 }),
        after: true,
      })
      .expect({
        before: true,
        action: setIsReplyFormOpen(comment.id, true),
        after: false,
      });
  });

  it('selectCanSubscribe', () => {
    store.testState(selectCanSubscribe, comment.id).expect({
      before: false,
      action: login,
      after: true,
    });
  });

  it('selectCanViewHistory', () => {
    store.testState(selectCanViewHistory, comment.id).expect({
      before: false,
      action: setComment({ ...comment, edited: new Date() }),
      after: true,
    });
  });

  it('selectCanReport', () => {
    store
      .testState(selectCanReport, comment.id)
      .expect({
        before: false,
        action: loginAsAuthor,
        after: false,
      })
      .expect({
        before: false,
        action: login,
        after: true,
      });
  });
});
