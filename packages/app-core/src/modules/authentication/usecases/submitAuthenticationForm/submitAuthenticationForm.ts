import { AuthenticationField } from '../../../../entities';
import { createThunk } from '../../../../store/createThunk';
import { selectAuthenticationField } from '../../selectors';
import { login, requestAuthenticationLink, signup } from '../index';

export const submitAuthenticationForm = createThunk(({ dispatch, getState, routerGateway }) => {
  const { pathname } = routerGateway;

  const email = selectAuthenticationField(getState(), AuthenticationField.email);
  const password = selectAuthenticationField(getState(), AuthenticationField.password);
  const nick = selectAuthenticationField(getState(), AuthenticationField.nick);

  if (pathname.endsWith('/lien-de-connexion')) {
    return dispatch(requestAuthenticationLink(email));
  } else if (pathname.endsWith('/connexion')) {
    return dispatch(login(email, password));
  } else if (pathname.endsWith('/inscription')) {
    return dispatch(signup(email, password, nick));
  }
});
