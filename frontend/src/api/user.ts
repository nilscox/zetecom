import { useCallback } from 'react';
import axios from 'axios';

import { User, parseUser } from 'src/types/User';

import { AxiosHookAsync, useAxiosMeta } from './use-axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ResponseData = any;

const fetchUser = async (): Promise<User | undefined> => {
  const { status, data } = await axios.get('/api/auth/me', {
    validateStatus: s => [200, 403].indexOf(s) >= 0,
    withCredentials: true,
  });

  if (status === 403)
    return;

  return parseUser(data);
};

export const useLoginUser: AxiosHookAsync<User> = () => {
  const url = '/api/auth/login';
  const [meta, setMeta] = useAxiosMeta();

  const login = useCallback(async ({ email, password }: { email: string; password: string }) => {
    const payload = { email, password };

    try {
      setMeta({ loading: true });

      const { data } = await axios.post(url, payload, {
        withCredentials: true,
      });

      return parseUser(data);
    } catch (error) {
      setMeta({ error });
      throw error;
    } finally {
      setMeta({ loading: false });
    }
  }, [url]);

  return [
    login,
    meta,
  ] as const;
};

type SignupUserParams = {
  email: string;
  password: string;
  nick: string;
  avatar?: string;
};

export const useSignupUser: AxiosHookAsync<User> = () => {
  const url = '/api/auth/signup';
  const [meta, setMeta] = useAxiosMeta();

  const signup = useCallback(async ({ email, password, nick, avatar }: SignupUserParams) => {
    const payload = { email, password, nick, avatar };

    try {
      setMeta({ loading: true });

      const { data } = await axios.post(url, payload, {
        withCredentials: true,
      });

      return parseUser(data);
    } catch (error) {
      setMeta({ error });
      throw error;
    } finally {
      setMeta({ loading: false });
    }
  }, [url]);

  return [
    signup,
    meta,
  ] as const;
};

export const useLogoutUser: AxiosHookAsync<void> = () => {
  const url = '/api/auth/logout';
  const [meta, setMeta] = useAxiosMeta();

  const logout = useCallback(async () => {
    try {
      setMeta({ loading: true });
      await axios.post(url, {}, { withCredentials: true });
    } catch (error) {
      setMeta({ error });
      throw error;
    } finally {
      setMeta({ loading: false });
    }
  }, [url]);

  return [
    logout,
    meta,
  ] as const;
};

export const setUserAvatar = async (image: File): Promise<User> => {
  const uploadData = new FormData();

  uploadData.append('image', image);

  const { data } = await axios.put('/api/user/avatar', uploadData, {
    withCredentials: true,
  });

  return parseUser(data);
};

export {
  fetchUser,
};
