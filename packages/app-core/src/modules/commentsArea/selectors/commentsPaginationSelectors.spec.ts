import { CommentsArea, createCommentsArea } from '../../../entities';
import { MemoryStore } from '../../../store/MemoryStore';
import { setCommentsArea } from '../../../store/normalize';
import { setCommentsPage, setCurrentCommentsArea as setCurrentCommentsAreaAction } from '../actions';

import {
  selectCanNavigateToNextCommentsPages,
  selectCanNavigateToPreviousCommentsPages,
  selectCommentsPage,
  selectCommentsPagesCount,
  selectCommentsPageSize,
} from './commentsPaginationSelectors';

describe('commentsAreaSelectors', () => {
  let store: MemoryStore;

  beforeEach(() => {
    store = new MemoryStore();
  });

  const setCurrentCommentsArea = (commentsArea: CommentsArea) => () => {
    store.dispatch(setCommentsArea(commentsArea));
    store.dispatch(setCurrentCommentsAreaAction(commentsArea));
  };

  it('selectCommentsPage', () => {
    store.testState(selectCommentsPage).expect({
      before: 1,
      action: setCommentsPage(6),
      after: 6,
    });
  });

  it('selectCommentsPageSize', () => {
    store.testState(selectCommentsPageSize).expect({
      before: 10,
    });
  });

  it('selectCommentsPagesCount', () => {
    store
      .testState(selectCommentsPagesCount)
      .expect({
        before: undefined,
        action: setCurrentCommentsArea(createCommentsArea({ commentsCount: 0 })),
        after: 1,
      })
      .expect({
        action: setCurrentCommentsArea(createCommentsArea({ commentsCount: 10 })),
        after: 1,
      })
      .expect({
        action: setCurrentCommentsArea(createCommentsArea({ commentsCount: 11 })),
        after: 2,
      })
      .expect({
        action: setCurrentCommentsArea(createCommentsArea({ commentsCount: 36 })),
        after: 4,
      });
  });

  it('selectCanNavigateToPreviousCommentsPage', () => {
    store.testState(selectCanNavigateToPreviousCommentsPages).expect({
      before: false,
      action: setCommentsPage(2),
      after: true,
    });
  });

  it('selectCanNavigateToNextCommentsPages', () => {
    const commentsArea = createCommentsArea({ commentsCount: 11 });

    store
      .testState(selectCanNavigateToNextCommentsPages)
      .expect({
        before: false,
        action: setCurrentCommentsArea(commentsArea),
        after: true,
      })
      .expect({
        action: setCommentsPage(2),
        after: false,
      });
  });
});
