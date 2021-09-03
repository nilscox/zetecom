import { expect } from 'earljs';

import { createCommentsArea } from '../../../../entities/CommentsArea';
import { SortType } from '../../../../entities/SortType';
import { MockCommentGateway } from '../../../../shared/mocks';
import { paginated } from '../../../../shared/paginated';
import { createMemoryStore } from '../../../../store/memoryStore';
import { setCommentsArea } from '../../../../store/normalize';
import { Dispatch, GetState } from '../../../../store/store';
import { setCurrentCommentsArea } from '../../commentsAreaActions';
import { selectCommentsSort } from '../../selectors/commentsAreaSelectors';

import { sortComments } from './sortComments';

describe('sortComments', () => {
  let dispatch: Dispatch;
  let getState: GetState;

  let commentGateway: MockCommentGateway;

  const commentsArea = createCommentsArea();

  beforeEach(() => {
    ({ dispatch, getState, commentGateway } = createMemoryStore());
  });

  const setup = () => {
    dispatch(setCommentsArea(commentsArea));
    dispatch(setCurrentCommentsArea(commentsArea.id));

    commentGateway.fetchRootComments.resolvesToOnce(paginated([]));
  };

  it('sorts the comments list according to a sort order', async () => {
    const sort = SortType.dateDesc;

    setup();

    await dispatch(sortComments(sort));

    expect(commentGateway.fetchRootComments).toHaveBeenCalledWith([commentsArea.id, expect.objectWith({ sort })]);
    expect(selectCommentsSort(getState())).toEqual(sort);
  });
});
