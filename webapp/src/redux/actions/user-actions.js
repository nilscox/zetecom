import { FetchAction, createFetchActionTypes } from 'redux-fetch';

export const USER_SIGNUP = createFetchActionTypes('USER_SIGNUP');
export const userSignup = ({ email, password, nick }) => new FetchAction('USER_SIGNUP')
  .post('/api/auth/signup')
  .body({ email, password, nick })
  .expect([201, 403]);

export const USER_LOGIN = createFetchActionTypes('USER_LOGIN');
export const userLogin = ({ email, password }) => new FetchAction('USER_LOGIN')
  .post('/api/auth/login')
  .body({ email, password })
  .expect([200, 403]);

export const USER_LOGOUT = createFetchActionTypes('USER_LOGOUT');
export const userLogout = () => new FetchAction('USER_LOGOUT')
  .post('/api/auth/logout')
  .expect(204);

export const USER_FETCH_ME = createFetchActionTypes('USER_FETCH_ME');
export const userFetchMe = () => new FetchAction('USER_FETCH_ME')
  .get('/api/auth/me')
  .expect([200, 403]);
