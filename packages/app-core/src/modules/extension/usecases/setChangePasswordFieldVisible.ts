import { createThunk } from '../../../store/createThunk';
import { setChangePasswordFieldVisible as setChangePasswordFieldVisibleAction } from '../actions';

export const setChangePasswordFieldVisible = createThunk(({ dispatch }, visible: boolean) => {
  dispatch(setChangePasswordFieldVisibleAction(visible));
});
