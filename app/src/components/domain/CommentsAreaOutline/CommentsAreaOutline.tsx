import React from 'react';

import styled from '@emotion/styled';

import Icon from 'src/components/elements/Icon/Icon';
import Link from 'src/components/elements/Link/Link';
import { Comment } from 'src/components/icons';
import { fontSize, spacing, textColor } from 'src/theme';
import { CommentsArea } from 'src/types/CommentsArea';

import MediaImage from '../MediaImage/MediaImage';

import CommentsAreaDescription from './CommentsAreaDescription/CommentsAreaDescription';

const Container = styled.a`
  display: flex;
  flex-direction: row;
  text-decoration: none;
`;

const CommentsCount = styled.div`
  margin-left: ${spacing(4)};
  display: flex;
  flex-direction: row;
  font-weight: bold;
  font-size: ${fontSize('large')};
  color: ${textColor('light')};

  & > svg {
    margin-right: ${spacing(1)};
  }
`;

type CommentsAreaOutlineProps = {
  commentsArea: CommentsArea;
  link: 'commentsArea' | 'external';
};

const CommentsAreaOutline: React.FC<CommentsAreaOutlineProps> = ({ commentsArea, link }) => {
  const [LinkComponent, linkProps] = {
    commentsArea: [Link, { to: `/commentaires/${commentsArea.id}` }] as const,
    external: ['a', { href: commentsArea.information.url }] as const,
  }[link];

  return (
    <Container as={LinkComponent} data-testid="comments-area" {...linkProps}>
      <MediaImage media={commentsArea.information.media} />
      <CommentsAreaDescription {...commentsArea.information} />
      <CommentsCount data-testid="comments-count">
        <Icon as={Comment}></Icon>
        {commentsArea.commentsCount}
      </CommentsCount>
    </Container>
  );
};

export default CommentsAreaOutline;
