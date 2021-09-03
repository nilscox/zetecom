import { createThunk } from '../../../../store/createThunk';
import { setCommentsPage } from '../../commentsAreaActions';
import { selectCommentsPagesCount } from '../../selectors/commentsAreaSelectors';
import { fetchComments } from '../fetchComments/fetchComments';

const setPage = createThunk(({ getState, dispatch }, getPage: (currentPage: number) => number) => {
  const currentPage = getState().commentsArea.commentsPage;
  const page = getPage(currentPage);

  dispatch(setCommentsPage(page));

  return dispatch(fetchComments());
});

export const previousCommentsPage = createThunk(({ dispatch }) => {
  return dispatch(setPage((page) => page - 1));
});

export const nextCommentsPage = createThunk(({ dispatch }) => {
  return dispatch(setPage((page) => page + 1));
});

export const firstCommentsPage = createThunk(({ dispatch }) => {
  return dispatch(setPage(() => 1));
});

export const lastCommentsPage = createThunk(({ getState, dispatch }) => {
  const pagesCount = selectCommentsPagesCount(getState());

  if (pagesCount !== undefined) {
    return dispatch(setPage(() => pagesCount));
  }
});
