import { createCommentsArea, SortType } from '../../../entities';
import { array } from '../../../shared/array';
import { MemoryStore } from '../../../store/MemoryStore';
import { selectCommentsArea, setCommentsArea } from '../../../store/normalize';
import {
  setCommentsAreaIdentifier,
  setCommentsAreaNotFound,
  setCommentsAreaRequested,
  setCommentsAreas,
  setCommentsSearchQuery,
  setCommentsSort,
  setCurrentCommentsArea,
  setFetchingCommentsArea,
  setFetchingCommentsAreas,
  setIsRequestingCommentsArea,
  setIsSubmittingRootComment,
  setTotalCommentsAreas,
} from '../actions';

import {
  selectCommentsAreaByIdentifier,
  selectCommentsAreaNotFound,
  selectCommentsAreaRequested,
  selectCommentsAreas,
  selectCommentsSearchQuery,
  selectCommentsSort,
  selectCurrentCommentsArea,
  selectIsFetchingCommentsArea,
  selectIsFetchingCommentsAreas,
  selectIsRequestingCommentsArea,
  selectIsSubmittingRootComment,
  selectTotalCommentsAreas,
} from './commentsAreaSelectors';

describe('commentsAreaSelectors', () => {
  let store: MemoryStore;

  beforeEach(() => {
    store = new MemoryStore();
  });

  it('selectCommentsArea', () => {
    const commentsArea = createCommentsArea();

    store.testState(selectCommentsArea, commentsArea.id).expect({
      before: undefined,
      action: setCommentsArea(commentsArea),
      after: commentsArea,
    });
  });

  it('selectCommentsAreaByIdentifier', () => {
    const commentsArea = createCommentsArea();

    store.dispatch(setCommentsArea(commentsArea));

    store.testState(selectCommentsAreaByIdentifier, 'identifier').expect({
      before: undefined,
      action: setCommentsAreaIdentifier('identifier', commentsArea),
      after: commentsArea,
    });
  });

  it('selectCommentsAreas', () => {
    const commentsAreas = array(2, () => createCommentsArea());

    store.testState(selectCommentsAreas).expect({
      before: [],
      action: () => {
        store.dispatch(setCommentsAreas(commentsAreas));
        store.dispatch(setCommentsArea(...commentsAreas));
      },
      after: commentsAreas,
    });
  });

  it('selectTotalCommentsAreas', () => {
    store.testState(selectTotalCommentsAreas).expect({
      before: 0,
      action: setTotalCommentsAreas(2),
      after: 2,
    });
  });

  it('selectIsFetchingCommentsAreas', () => {
    store.testState(selectIsFetchingCommentsAreas).expect({
      before: false,
      action: setFetchingCommentsAreas(true),
      after: true,
    });
  });

  it('selectCommentsAreaNotFound', () => {
    store.testState(selectCommentsAreaNotFound).expect({
      before: false,
      action: setCommentsAreaNotFound(true),
      after: true,
    });
  });

  it('selectIsRequestingCommentsArea', () => {
    store.testState(selectIsRequestingCommentsArea).expect({
      before: false,
      action: setIsRequestingCommentsArea(true),
      after: true,
    });
  });

  it('selectCommentsAreaRequested', () => {
    store.testState(selectCommentsAreaRequested).expect({
      before: false,
      action: setCommentsAreaRequested(true),
      after: true,
    });
  });

  it('selectCurrentCommentsArea', () => {
    const commentsArea = createCommentsArea();

    store.testState(selectCurrentCommentsArea).expect({
      before: undefined,
      action: () => {
        store.dispatch(setCommentsArea(commentsArea));
        store.dispatch(setCurrentCommentsArea(commentsArea));
      },
      after: commentsArea,
    });
  });

  it('selectIsFetchingCommentsArea', () => {
    store.testState(selectIsFetchingCommentsArea).expect({
      before: false,
      action: setFetchingCommentsArea(true),
      after: true,
    });
  });

  it('selectIsSubmittingRootComment', () => {
    store.testState(selectIsSubmittingRootComment).expect({
      before: false,
      action: setIsSubmittingRootComment(true),
      after: true,
    });
  });

  it('selectCommentsSort', () => {
    store.testState(selectCommentsSort).expect({
      before: SortType.relevance,
      action: setCommentsSort(SortType.dateAsc),
      after: SortType.dateAsc,
    });
  });

  it('selectCommentsSearchQuery', () => {
    store.testState(selectCommentsSearchQuery).expect({
      before: undefined,
      action: setCommentsSearchQuery('query'),
      after: 'query',
    });
  });
});
