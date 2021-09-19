import { CommentsArea, commentsAreaDtoToEntity } from '../../../../entities';
import { createThunk } from '../../../../store/createThunk';
import { setCommentsArea } from '../../../../store/normalize';
import {
  setCommentsAreaIdentifier,
  setCommentsAreaNotFound,
  setCurrentCommentsArea,
  setFetchingCommentsArea,
} from '../../actions';
import { selectCommentsArea } from '../../selectors';
import { fetchComments } from '../index';

export const fetchCommentsAreaById = createThunk(async ({ getState, dispatch }, commentsAreaId: string) => {
  let commentsArea: CommentsArea | undefined = selectCommentsArea(getState(), commentsAreaId);

  if (!commentsArea) {
    commentsArea = await dispatch(fetchCommentsArea({ commentsAreaId }));
  }

  if (commentsArea) {
    await dispatch(fetchComments());
  }

  return commentsArea;
});

export const fetchCommentsAreaByIdentifier = createThunk(async ({ dispatch }, commentsAreaIdentifier: string) => {
  const commentsArea = await dispatch(fetchCommentsArea({ commentsAreaIdentifier }));

  if (commentsArea) {
    dispatch(setCommentsAreaIdentifier(commentsAreaIdentifier, commentsArea));
    await dispatch(fetchComments());
  }

  return commentsArea;
});

type FetchBy = { commentsAreaId: string } | { commentsAreaIdentifier: string };

const fetchCommentsArea = createThunk(async ({ dispatch, commentsAreaGateway }, fetchBy: FetchBy) => {
  dispatch(setFetchingCommentsArea(true));
  dispatch(setCommentsAreaNotFound(false));

  try {
    const commentsAreaDto =
      'commentsAreaId' in fetchBy
        ? await commentsAreaGateway.fetchCommentsArea(fetchBy.commentsAreaId)
        : await commentsAreaGateway.fetchCommentsAreaByIdentifier(fetchBy.commentsAreaIdentifier);

    if (!commentsAreaDto) {
      dispatch(setCommentsAreaNotFound(true));
      return;
    }

    const commentsArea = commentsAreaDtoToEntity(commentsAreaDto);

    dispatch(setCommentsArea(commentsArea));
    dispatch(setCurrentCommentsArea(commentsArea));

    return commentsArea;
  } finally {
    dispatch(setFetchingCommentsArea(false));
  }
});
