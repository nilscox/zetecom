import { createThunk } from '../../../../store/createThunk';
import { setCommentsSearchQuery, setFetchingComments } from '../../actions';
import { selectIsFetchingComments } from '../../selectors';
import { fetchComments } from '../index';

const SEARCH_DEBOUNCE_TIMEOUT = 500;

let searchTimeout: NodeJS.Timeout | undefined;

export const searchComments = createThunk(async ({ dispatch, getState, timerGateway }, query: string) => {
  if (searchTimeout) {
    timerGateway.clearTimeout(searchTimeout);
  }

  if (!selectIsFetchingComments(getState())) {
    dispatch(setFetchingComments(true));
  }

  searchTimeout = timerGateway.setTimeout(async () => {
    if (query === '') {
      await dispatch(clearSearch());
    } else {
      await dispatch(setSearch(query));
    }
  }, SEARCH_DEBOUNCE_TIMEOUT);
});

const setSearch = createThunk(async ({ dispatch }, query: string) => {
  await dispatch(fetchComments(query));

  dispatch(setCommentsSearchQuery(query));
});

const clearSearch = createThunk(async ({ dispatch }) => {
  dispatch(setCommentsSearchQuery(undefined));

  await dispatch(fetchComments(undefined));
});
