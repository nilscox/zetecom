import { expect } from 'earljs';

import { createCommentsArea } from '../../../entities/CommentsArea';
import { SortType } from '../../../entities/SortType';
import { createMemoryStore } from '../../../store/memoryStore';
import { selectCommentsArea, setCommentsArea } from '../../../store/normalize';
import { Dispatch, GetState } from '../../../store/store';
import { setIsSubmittingRootComment } from '../../comment/commentActions';
import {
  setCommentsPage,
  setCommentsSearchQuery,
  setCommentsSort,
  setCurrentCommentsArea,
  setFetchingCommentsArea,
} from '../commentsAreaActions';

import {
  selectCommentsPage,
  selectCommentsPagesCount,
  selectCommentsPageSize,
  selectCommentsSearchQuery,
  selectCommentsSort,
  selectCurrentCommentsArea,
  selectIsFetchingCommentsArea,
  selectIsSubmittingRootComment,
} from './commentsAreaSelectors';

describe('commentsAreaSelectors', () => {
  let dispatch: Dispatch;
  let getState: GetState;

  beforeEach(() => {
    ({ dispatch, getState } = createMemoryStore());
  });

  it('selectCommentsArea', () => {
    const commentsArea = createCommentsArea();

    dispatch(setCommentsArea(commentsArea));

    expect(selectCommentsArea(getState(), commentsArea.id)).toEqual(commentsArea);
  });

  it('selectCurrentCommentsArea', () => {
    expect(selectCurrentCommentsArea(getState())).toEqual(undefined);

    const commentsArea = createCommentsArea();

    dispatch(setCommentsArea(commentsArea));
    dispatch(setCurrentCommentsArea(commentsArea.id));

    expect(selectCurrentCommentsArea(getState())).toEqual(commentsArea);
  });

  it('selectIsFetchingCommentsArea', () => {
    expect(selectIsFetchingCommentsArea(getState())).toEqual(false);

    dispatch(setFetchingCommentsArea(true));

    expect(selectIsFetchingCommentsArea(getState())).toEqual(true);
  });

  it('selectIsSubmittingRootComment', () => {
    expect(selectIsSubmittingRootComment(getState())).toEqual(false);

    dispatch(setIsSubmittingRootComment(true));

    expect(selectIsSubmittingRootComment(getState())).toEqual(true);
  });

  it('selectCommentsPage', () => {
    expect(selectCommentsPage(getState())).toEqual(1);

    dispatch(setCommentsPage(6));

    expect(selectCommentsPage(getState())).toEqual(6);
  });

  it('selectCommentsPageSize', () => {
    expect(selectCommentsPageSize(getState())).toEqual(10);
  });

  it('selectCommentsPagesCount', () => {
    expect(selectCommentsPagesCount(getState())).toEqual(undefined);

    const commentsArea = createCommentsArea({ commentsCount: 36 });

    dispatch(setCommentsArea(commentsArea));
    dispatch(setCurrentCommentsArea(commentsArea.id));

    expect(selectCommentsPagesCount(getState())).toEqual(3);
  });

  it('selectCommentsSort', () => {
    expect(selectCommentsSort(getState())).toEqual(SortType.relevance);

    dispatch(setCommentsSort(SortType.dateAsc));

    expect(selectCommentsSort(getState())).toEqual(SortType.dateAsc);
  });

  it('selectCommentsSearchQuery', () => {
    expect(selectCommentsSearchQuery(getState())).toEqual(undefined);

    dispatch(setCommentsSearchQuery('query'));

    expect(selectCommentsSearchQuery(getState())).toEqual('query');
  });
});
