import React from 'react';

import styled from '@emotion/styled';

import { medias } from 'src/domain/medias/medias';
import { color, domain, size } from 'src/theme';
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
  media: MediaType;
};

const MediaImage: React.FC<MediaImageProps> = ({ className, media }) => {
  return <StyledImage className={className} src={medias[media]?.image || defaultCommentsArea} />;
};

export default MediaImage;
