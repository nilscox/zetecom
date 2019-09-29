import React, { useCallback, useContext, useEffect } from 'react';

import { UserLight, parseUser } from 'src/types/User';
import UserContext from 'src/utils/UserContext';
import { useTheme } from 'src/utils/Theme';
import useAxios from 'src/hooks/use-axios';

type ImageUploadProps = {
  allowedTypes: string[];
  onUpload: (file: File) => void;
  children: JSX.Element;
};

const ImageUpload: React.FC<ImageUploadProps> = ({ allowedTypes, onUpload, children }) => {
  const fileInputRef = React.createRef<HTMLInputElement>();

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files.length === 0)
      return;

    if (!allowedTypes.includes(files[0].type.split('/')[1]))
      return;

    onUpload(files[0]);
  }, [allowedTypes, onUpload]);

  return (
    <>
      <input
        ref={fileInputRef}
        accept="image/*"
        type="file"
        style={{ display: 'none' }}
        onChange={onFileChange}
      />
      <div
        style={{ display: 'inline-flex', cursor: 'pointer' }}
        onClick={() => fileInputRef.current.click()}
      >
        {children}
      </div>
    </>
  );
};

type UserAvatarProps = {
  editable?: boolean;
  user: UserLight;
};

const UserAvatar: React.FC<UserAvatarProps> = ({ editable = false, user }) => {
  const { user: currentUser, setUser } = useContext(UserContext);
  const { colors: { borderImage } } = useTheme();

  const opts = {
    method: 'PUT',
    url: '/api/user/avatar',
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  };
  const [{
    data: updatedUser,
    loading,
    error,
    status,
  }, upload] = useAxios(opts, parseUser, { manual: true });

  if (error)
    throw error;

  useEffect(() => {
    if (status(200))
      setUser(updatedUser);
  }, [status, setUser, updatedUser]);

  const onUpload = useCallback((file: File) => {
    const formData = new FormData();

    formData.append('image', file);

    upload({ data: formData });
  }, [upload]);

  const avatarImg = (
    <img
      style={{
        width: 32,
        height: 32,
        borderRadius: 16,
        border: `1px solid ${borderImage}`,
        opacity: loading ? 0.7 : 1,
      }}
      src={user.getAvatarUrl()}
    />
  );

  if (!editable || !currentUser || user.id !== currentUser.id)
    return avatarImg;

  return (
    <ImageUpload allowedTypes={['png', 'jpg', 'bmp', 'svg']} onUpload={onUpload}>
      {avatarImg}
    </ImageUpload>
  );
};

export default UserAvatar;
