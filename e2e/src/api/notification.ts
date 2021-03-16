import { api } from './api';

export const getNotifications = () => {
  return api(`/api/notification/me`);
};
