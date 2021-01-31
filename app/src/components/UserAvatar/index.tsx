import React, { useCallback, useEffect } from 'react';

import { AxiosRequestConfig } from 'axios';

import { useUser } from 'src/contexts/UserContext';
import useAxios from 'src/hooks/use-axios';
import { User, UserLight } from 'src/types/User';

import ImageUpload from '../ImageUpload';

import CircleAvatarImage from './CircleAvatarImage';

import defaultAvatar from './default-avatar.png';

export { default as UserAvatarNick } from './UserAvatarNick';

const getAvatarUrl = (user: UserLight) => {
  if (user.avatar) {
    return '/avatars/' + user.avatar;
  }

  return defaultAvatar;
};

type UserAvatarProps = {
  small?: boolean;
  editable?: boolean;
  user: UserLight;
};

const UserAvatar: React.FC<UserAvatarProps> = ({ small = false, editable = false, user }) => {
  const [currentUser, setUser] = useUser();

  const opts: AxiosRequestConfig = {
    method: 'PUT',
    url: '/api/user/avatar',
    headers: { 'Content-Type': 'multipart/form-data' },
  };

  const [{ data: updatedUser, loading, error, status }, upload] = useAxios(opts, { manual: true }, User);

  if (error) {
    throw error;
  }

  useEffect(() => {
    if (status(200) && updatedUser) {
      setUser(updatedUser);
    }
  }, [status, setUser, updatedUser]);

  const onUpload = useCallback(
    (file: File) => {
      const formData = new FormData();

      formData.append('image', file);

      upload({ data: formData });
    },
    [upload],
  );

  const avatarImg = <CircleAvatarImage loading={loading} small={small} src={getAvatarUrl(user)} />;

  if (!editable || !currentUser || user.id !== currentUser.id) {
    return avatarImg;
  }

  return (
    <ImageUpload allowedTypes={['png', 'jpeg', 'bmp']} onUpload={onUpload}>
      {avatarImg}
    </ImageUpload>
  );
};

export default UserAvatar;
