import React from 'react';

import styled from '@emotion/styled';

import useDateFormat from 'src/hooks/useDateFormat';
import { fontSize, fontWeight, spacing } from 'src/theme';
import { MediaType } from 'src/types/CommentsArea';
import { medias } from 'src/utils/medias';

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
        <Media>{medias[media]?.label}</Media>
        <PublicationDate>{formatDate(publicationDate)}</PublicationDate>
        <Author>{author}</Author>
      </div>
    </Container>
  );
};

export default CommentsAreaDescription;
