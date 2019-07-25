import React, { useCallback, useContext } from 'react';

import { UserLight } from 'src/types/User';
import { setUserAvatar } from 'src/api/user';
import UserContext from 'src/utils/UserContext';
import { useTheme } from 'src/utils/Theme';

type ImageUploadProps = {
  allowedTypes: string[];
  onUpload: (file: File) => any;
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
      <span
        style={{ cursor: 'pointer' }}
        onClick={() => fileInputRef.current.click()}
      >
        {children}
      </span>
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

  const avatarImg = (
    <img
      style={{
        width: 32,
        height: 32,
        borderRadius: 16,
        border: `1px solid ${borderImage}`,
      }}
      src={user.getAvatarUrl()}
    />
  );

  const onUpload = useCallback(async (file: File) => {
    const updatedUser = await setUserAvatar(file);
    setUser(updatedUser);
  }, [setUser]);

  if (!editable || !currentUser || user.id !== currentUser.id)
    return avatarImg;

  return (
    <ImageUpload allowedTypes={['png', 'jpg', 'bmp', 'svg']} onUpload={onUpload}>
      {avatarImg}
    </ImageUpload>
  );
};

export default UserAvatar;
