import axios, { AxiosRequestConfig } from 'axios';

import { Dataset } from './dtos/Dataset';
import { findOrCreateInformation } from './information';
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

  await Promise.all(dataset.informations.map(i => findOrCreateInformation(i, findUser)));

  // const createReactionRec = async (informationId: number, subjectId: number | null, reaction: any, parentId?: number) => {
  //   const created = await createReaction(informationId, subjectId, reaction, findUser(users, reaction.author), parentId);

  //   if (reaction.quickReactions) {
  //     const { approve, refute, skeptic } = reaction.quickReactions;

  //     await Promise.all([
  //       Promise.all(approve.map(u => createQuickReaction(created.id, 'APPROVE', findUser(users, u)))),
  //       Promise.all(refute.map(u => createQuickReaction(created.id, 'REFUTE', findUser(users, u)))),
  //       Promise.all(skeptic.map(u => createQuickReaction(created.id, 'SKEPTIC', findUser(users, u)))),
  //     ]);
  //   }

  //   for (const reply of reaction.replies || [])
  //     await createReactionRec(informationId, subjectId, reply, created.id);
  // };

  // for (const infoData of data.informations || []) {
  //   const info = findInformation(infos, infoData.url);

  //   for (const reaction of infoData.reactions || [])
  //     await createReactionRec(info.id, null, reaction);

  //   for (const subjectData of infoData.subjects || []) {
  //     const subject = await createSubject(info.id, subjectData, findUser(users, subjectData.author));

  //     for (const reaction of subjectData.reactions)
  //       await createReactionRec(info.id, subject.id, reaction);
  //   }
  // }
};
