import React from 'react';

import styled from '@emotion/styled';
import clsx from 'clsx';
import { useDebounce } from 'use-debounce/lib';

import { color, spacing } from 'src/theme';

import LoadingIndicator from './LoadingIndicator';

import defaultAvatar from './default-avatar.png';

const Container = styled.div`
  width: ${spacing(5)};
  height: ${spacing(5)};
  border-radius: 50%;
  position: relative;
  display: inline-block;

  &.small {
    width: ${spacing(4)};
    height: ${spacing(4)};
  }
`;

const StyledAvatarImage = styled.img`
  width: inherit;
  height: inherit;
  border-radius: 50%;
  border: 1px solid ${color('border')};
  box-sizing: border-box;
`;

type AvatarImageProps = {
  className?: string;
  loading?: boolean;
  small?: boolean;
  src?: string | null;
};

const AvatarImage: React.FC<AvatarImageProps> = ({ className, loading, small, src }) => {
  const [loadingDebounced] = useDebounce(loading, 400);

  return (
    <Container className={clsx(small && 'small')}>
      <StyledAvatarImage src={src ? `/avatars/${src}` : defaultAvatar} className={clsx(small && 'small', className)} />
      {loadingDebounced && <LoadingIndicator />}
    </Container>
  );
};

export default AvatarImage;
