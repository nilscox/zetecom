import React from 'react';

import styled from '@emotion/styled';

import { size } from 'src/theme';
import { MediaType } from 'src/types/CommentsArea';
import { medias } from 'src/utils/medias';

import defaultCommentsArea from './default-comments-area.png';

const StyledImage = styled.img`
  width: ${size('small')};
  height: ${size('xsmall')};
  object-fit: cover;
`;

type MediaImageProps = {
  className?: string;
  media: MediaType;
};

const MediaImage: React.FC<MediaImageProps> = ({ className, media }) => {
  return <StyledImage className={className} src={medias[media]?.image || defaultCommentsArea} />;
};

export default MediaImage;
