import React from 'react';

import styled from '@emotion/styled';

import useDateFormat from 'src/hooks/useDateFormat';
import { domain, fontSize, fontWeight, size, spacing, textColor } from 'src/theme';
import { MediaType } from 'src/types/CommentsArea';
import { medias } from 'src/utils/medias';

const Container = styled.div`
  margin-left: ${spacing(4)};
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: ${fontSize('large')};
`;

const Title = styled.div`
  margin-bottom: ${spacing(2)};
  font-size: ${domain('commentsAreaTitleFontSize')};
  font-weight: ${fontWeight('bold')};
  line-height: 1.4;
`;

const PublicationDate = styled.div`
  color: ${textColor('light')};
`;

const Media = styled.div`
  width: ${size('medium')};
  display: inline-block;
  color: ${textColor('default')};
`;

const Author = styled.div`
  display: inline-block;
  color: ${textColor('default')};
`;

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

      <PublicationDate>{formatDate(publicationDate)}</PublicationDate>

      <div>
        <Media>{medias[media]?.label}</Media>
        <Author>{author}</Author>
      </div>
    </Container>
  );
};

export default CommentsAreaDescription;
