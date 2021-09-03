import { expect } from 'earljs';

import { createCommentsArea } from '../../../../entities/CommentsArea';
import { MockCommentGateway } from '../../../../shared/mocks';
import { paginated } from '../../../../shared/paginated';
import { createMemoryStore } from '../../../../store/memoryStore';
import { setCommentsArea } from '../../../../store/normalize';
import { Dispatch, GetState } from '../../../../store/store';
import { setCommentsPage, setCurrentCommentsArea } from '../../commentsAreaActions';
import { selectCommentsPage } from '../../selectors/commentsAreaSelectors';

import { firstCommentsPage, lastCommentsPage, nextCommentsPage, previousCommentsPage } from './setCommentsPage';

describe('setCommentsPage', () => {
  let dispatch: Dispatch;
  let getState: GetState;

  let commentGateway: MockCommentGateway;

  const commentsArea = createCommentsArea();

  beforeEach(() => {
    ({ dispatch, getState, commentGateway } = createMemoryStore());
  });

  const setup = (currentPage: number) => {
    dispatch(setCommentsArea(commentsArea));
    dispatch(setCurrentCommentsArea(commentsArea.id));
    dispatch(setCommentsPage(currentPage));

    commentGateway.fetchRootComments.resolvesToOnce(paginated([]));
  };

  const expectFetchedPage = (expected: number) => {
    expect(commentGateway.fetchRootComments).toHaveBeenCalledWith([
      commentsArea.id,
      expect.objectWith({ page: expected }),
    ]);

    expect(selectCommentsPage(getState())).toEqual(expected);
  };

  it("fetches a comments area's comments on the previous page", async () => {
    setup(2);

    await dispatch(previousCommentsPage());

    expectFetchedPage(1);
  });

  it("fetches a comments area's comments on the next page", async () => {
    setup(1);

    await dispatch(nextCommentsPage());

    expectFetchedPage(2);
  });

  it("fetches a comments area's comments on the first page", async () => {
    setup(3);

    await dispatch(firstCommentsPage());

    expectFetchedPage(1);
  });

  it("fetches a comments area's comments on the last page", async () => {
    setup(1);

    dispatch(setCommentsArea(createCommentsArea({ id: commentsArea.id, commentsCount: 30 })));

    await dispatch(lastCommentsPage());

    expectFetchedPage(3);
  });
});
