import { User } from './seed';

class APIError extends Error {
  constructor(public readonly method: string, public readonly endpoint: string, message: string) {
    super([method, endpoint, message].join(' '));
  }
}

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

  if (!response.ok) {
    throw new APIError(init?.method || 'GET', endpoint, await response.text());
  }

  if (response.status !== 204) {
    return response.json();
  }
};
