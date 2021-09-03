import { createThunk } from '../../../../store/createThunk';
import { setCommentsSearchQuery } from '../../commentsAreaActions';
import { fetchComments } from '../fetchComments/fetchComments';

const SEARCH_DEBOUNCE_TIMEOUT = 100;

const setSearch = createThunk(async ({ dispatch }, query: string) => {
  await dispatch(fetchComments(query));

  dispatch(setCommentsSearchQuery(query));
});

const clearSearch = createThunk(async ({ dispatch }) => {
  dispatch(setCommentsSearchQuery(undefined));

  await dispatch(fetchComments(undefined));
});

let searchTimeout: NodeJS.Timeout | undefined;

export const searchComments = createThunk(async ({ dispatch, timerGateway }, query: string) => {
  if (searchTimeout) {
    timerGateway.clearTimeout(searchTimeout);
  }

  searchTimeout = timerGateway.setTimeout(async () => {
    if (query === '') {
      await dispatch(clearSearch());
    } else {
      await dispatch(setSearch(query));
    }
  }, SEARCH_DEBOUNCE_TIMEOUT);
});
