import { api } from './api';
import { User } from './seed';

export const getCommentsAreaRequests = () => {
  return api('/api/comments-area/request');
};

export const createCommentsAreaRequest = (body: {
  informationTitle?: string;
  informationUrl: string;
  informationAuthor?: string;
  informationPublicationDate?: string;
  integrationIdentifier?: string;
}) => {
  return api('/api/comments-area/request', {
    method: 'POST',
    body,
  });
};

export const getCommentsAreaByIdentifier = (identifier: string) => {
  return api(`/api/comments-area/by-identifier/${identifier}`);
};

export const getCommentsAreas = () => {
  return api('/api/comments-area');
};
