import { FetchAction, createFetchActionTypes } from 'redux-fetch';

export const FETCH_USER = createFetchActionTypes('FETCH_USER');
export const fetchUser = new FetchAction('FETCH_USER')
  .get('/api/auth/me')
  .expect([200, 403]);
