import React from 'react';

import styled from '@emotion/styled';

import { size } from 'src/theme';
import { MediaType } from 'src/types/CommentsArea';

import defaultCommentsArea from './images/default-comments-area.png';

const images: Record<MediaType, string> = {
  '20minutes': defaultCommentsArea,
  francesoir: defaultCommentsArea,
  lefigaro: defaultCommentsArea,
  lemonde: defaultCommentsArea,
  leparisien: defaultCommentsArea,
  lepoint: defaultCommentsArea,
  lesechos: defaultCommentsArea,
  liberation: defaultCommentsArea,
  scienceetvie: defaultCommentsArea,
  skeptikon: defaultCommentsArea,
  unknown: defaultCommentsArea,
  youtube: defaultCommentsArea,
};

const StyledImage = styled.img`
  width: ${size('small')};
  height: ${size('xsmall')};
  object-fit: cover;
`;

type MediaImageProps = {
  media: MediaType;
};

const MediaImage: React.FC<MediaImageProps> = ({ media }) => {
  return <StyledImage src={images[media] || defaultCommentsArea} />;
};

export default MediaImage;
