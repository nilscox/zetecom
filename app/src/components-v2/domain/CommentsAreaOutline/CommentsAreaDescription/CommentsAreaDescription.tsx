import React from 'react';

import styled from '@emotion/styled';

import useDateFormat from 'src/hooks/useDateFormat';
import { fontSize, fontWeight, spacing } from 'src/theme';
import { MediaType } from 'src/types/CommentsArea';

const Container = styled.div`
  margin-left: ${spacing(2)};
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: ${fontSize('large')};
  font-weight: ${fontWeight('bold')};
`;

const InfoItem = styled.span`
  margin: ${spacing(0, 2)};

  &:first-of-type {
    margin-left: 0;
  }
`;

const PublicationDate = InfoItem;
const Media = InfoItem;
const Author = InfoItem;

const mediaLabels = {
  '20minutes': '20minutes',
  francesoir: 'FranceSoir',
  lefigaro: 'Le Figaro',
  lemonde: 'Le Monde',
  leparisien: 'Le Parisien',
  lepoint: 'Le Point',
  lesechos: 'Les Echos',
  liberation: 'Liberation',
  scienceetvie: 'Science & vie',
  skeptikon: 'Skeptikon',
  unknown: 'Média inconnu',
  youtube: 'YouTube',
};

type CommentsAreaDescriptionProps = {
  title: string;
  media: MediaType;
  author: string;
  publicationDate?: Date;
};

const CommentsAreaDescription: React.FC<CommentsAreaDescriptionProps> = ({ title, media, author, publicationDate }) => {
  const formatDate = useDateFormat('DD MMMM YYYY', false);

  return (
    <Container>
      <Title>{title}</Title>

      <div>
        <Media>{mediaLabels[media]}</Media>
        <PublicationDate>{formatDate(publicationDate)}</PublicationDate>
        <Author>{author}</Author>
      </div>
    </Container>
  );
};

export default CommentsAreaDescription;
