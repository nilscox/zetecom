import React from 'react';

import styled from '@emotion/styled';
import clsx from 'clsx';

import { color, spacing } from 'src/theme';

import defaultAvatar from './default-avatar.png';

const StyledAvatarImage = styled.img`
  width: ${spacing(5)};
  height: ${spacing(5)};
  border-radius: ${spacing(5)};
  border: 1px solid ${color('border')};

  &.small {
    width: ${spacing(4)};
    height: ${spacing(4)};
    border-radius: ${spacing(4)};
  }
`;

type AvatarImageProps = Omit<React.ComponentProps<typeof StyledAvatarImage>, 'src'> & {
  small?: boolean;
  src?: string | null;
};

const AvatarImage: React.FC<AvatarImageProps> = ({ small, src, ...props }) => (
  <StyledAvatarImage
    {...props}
    src={src ? `/avatars/${src}` : defaultAvatar}
    className={clsx(small && 'small', props.className)}
  />
);

export default AvatarImage;
