import { expect } from 'earljs';

import { CommentsArea, createCommentsArea } from '../../../../entities/CommentsArea';
import { SortType } from '../../../../entities/SortType';
import { MockCommentGateway } from '../../../../shared/mocks';
import { paginated } from '../../../../shared/paginated';
import { createMemoryStore } from '../../../../store/memoryStore';
import { setCommentsArea } from '../../../../store/normalize';
import { Dispatch, GetState } from '../../../../store/store';
import {
  setCommentsPage,
  setCommentsSearchQuery,
  setCommentsSort,
  setCurrentCommentsArea,
} from '../../commentsAreaActions';
import { selectIsFetchingComments } from '../../selectors/commentsAreaSelectors';

import { fetchComments } from './fetchComments';

describe('fetchComments', () => {
  let dispatch: Dispatch;
  let getState: GetState;

  let commentGateway: MockCommentGateway;

  beforeEach(() => {
    ({ dispatch, getState, commentGateway } = createMemoryStore());
  });

  const setup = (commentsArea: CommentsArea) => {
    dispatch(setCommentsArea(commentsArea));
    dispatch(setCurrentCommentsArea(commentsArea.id));
    commentGateway.fetchRootComments.resolvesToOnce(paginated([]));
  };

  it("notifies that a comments area's comments are being fetched", async () => {
    const commentsArea = createCommentsArea();

    setup(commentsArea);

    const promise = dispatch(fetchComments());

    expect(selectIsFetchingComments(getState())).toEqual(true);

    await promise;

    expect(selectIsFetchingComments(getState())).toEqual(false);
  });

  it("fetches a comments area's comments with mixed options", async () => {
    const page = 3;
    const sort = SortType.dateAsc;
    const query = 'query';

    const commentsArea = createCommentsArea();

    commentGateway.searchComments.resolvesToOnce(paginated([]));

    setup(commentsArea);

    dispatch(setCommentsPage(page));
    dispatch(setCommentsSort(sort));
    dispatch(setCommentsSearchQuery(query));

    await dispatch(fetchComments());

    expect(commentGateway.searchComments).toHaveBeenCalledWith([
      commentsArea.id,
      query,
      { page, pageSize: expect.a(Number), sort },
    ]);
  });
});
