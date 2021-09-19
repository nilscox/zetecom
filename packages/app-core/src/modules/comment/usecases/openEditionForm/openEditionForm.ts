import { createThunk } from '../../../../store/createThunk';
import { setIsEditing } from '../../actions';

export const openEditionForm = createThunk(async ({ dispatch }, commentId: string) => {
  dispatch(setIsEditing(commentId, true));
});

export const closeEditionForm = createThunk(async ({ dispatch }, commentId: string) => {
  dispatch(setIsEditing(commentId, false));
});
