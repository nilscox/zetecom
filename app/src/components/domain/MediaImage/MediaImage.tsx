import React from 'react';

import styled from '@emotion/styled';

import { medias } from 'src/domain/medias/medias';
import { color, domain } from 'src/theme';
import { MediaType } from 'src/types/CommentsArea';

import defaultCommentsArea from './default-comments-area.png';

const StyledImage = styled.img`
  width: ${domain('mediaImageWidth')};
  height: ${domain('mediaImageHeight')};
  object-fit: cover;
  background-color: ${color('light')};
`;

type MediaImageProps = {
  className?: string;
  media?: MediaType;
};

const MediaImage: React.FC<MediaImageProps> = ({ className, media }) => {
  const src = media ? medias[media].image : defaultCommentsArea;

  return <StyledImage className={className} src={src} />;
};

export default MediaImage;
