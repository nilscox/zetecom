import axios, { AxiosRequestConfig } from 'axios';

import { findOrCreateCommentsArea } from './comments-area';
import { Dataset } from './dtos/Dataset';
import { AuthenticatedUser, loginOrSignup } from './user';

const API_URL = process.env.API_URL || 'http://localhost:3000';

export type FindUser = (nick: string) => AuthenticatedUser;

const logRequest = (findUser: (cookie: string) => AuthenticatedUser | undefined) => (request: AxiosRequestConfig) => {
  const log = [
    request.method.toUpperCase(),
    request.baseURL + request.url,
  ];

  if (request.data)
    log.push(JSON.stringify(request.data));

  const user = findUser(request.headers.cookie);

  if (user)
    log.push(`[${user.nick}]`);

  // tslint:disable-next-line: no-console
  console.log(log.join(' '));

  return request;
};

export const main = async (dataset: Dataset) => {
  let users: AuthenticatedUser[] = [];

  axios.defaults.baseURL = API_URL;
  axios.interceptors.request.use(logRequest(cookie => users.find(u => u.cookie === cookie)));

  users = await Promise.all(dataset.users.map(loginOrSignup));

  const findUser: FindUser = (nick: string) => {
    const user = users.find(u => u.nick === nick);

    if (!user)
      throw new Error('Cannot find user with nick: ' + nick);

    return user;
  };

  await Promise.all(dataset.commentsAreas.map(i => findOrCreateCommentsArea(i, findUser)));
};
