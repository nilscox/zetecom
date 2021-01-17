import * as auth from './auth';
import * as commentsArea from './comments-area';
import * as comment from './comment';
import * as notification from './notification';
import { User } from './seed';

const clearCookies = () => {
  const now = new Date().toUTCString();

  document.cookie.split(';').forEach(c => {
    document.cookie = c.replace(/^ +/, '').replace(/=.*/, `=;expires=${now};path=/`);
  });
};

const funcs = {
  ...auth,
  ...commentsArea,
  ...comment,
  ...notification,
};

export const as = (user: User) => {
  let cookie: string | null = null;

  const apiAs = (func: Function) => async (...args: any[]) => {
    const prevCookie = document.cookie;

    if (cookie) {
      document.cookie = cookie;
    } else {
      clearCookies();
      await auth.login(user);
      cookie = document.cookie;
    }

    const res = await func(...args);

    if (prevCookie === '') {
      clearCookies();
    } else {
      document.cookie = prevCookie;
    }

    return res;
  };

  return Object.entries(funcs).reduce(
    (obj, [name, func]) => ({
      ...obj,
      [name]: apiAs(func),
    }),
    {} as typeof funcs
  );
};
