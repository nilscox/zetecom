import { User } from './seed';

export const api = async (endpoint: string, init?: Omit<RequestInit, 'body'> & { body?: any; as?: User }) => {
  const response = await fetch('http://localhost:3000' + endpoint, {
    ...init,
    headers: {
      'content-type': 'application/json',
      ...init?.headers,
    },
    ...(init?.body && {
      body: JSON.stringify(init.body),
    }),
  });

  if (response.status !== 204) {
    return response.json();
  }
};
