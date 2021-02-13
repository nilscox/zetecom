import React from 'react';

import styled from '@emotion/styled';

import Icon from 'src/components-v2/elements/Icon/Icon';
import Link from 'src/components-v2/elements/Link/Link';
import { Comment } from 'src/components-v2/icons';
import { spacing } from 'src/theme';
import { CommentsArea } from 'src/types/CommentsArea';

import CommentsAreaDescription from './CommentsAreaDescription/CommentsAreaDescription';
import MediaImage from './MediaImage/MediaImage';

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
    <Container as={LinkComponent} {...linkProps}>
      <MediaImage media={commentsArea.information.media} />
      <CommentsAreaDescription {...commentsArea.information} />
      <CommentsCount>
        <Icon size="small" as={Comment}></Icon>
        {commentsArea.commentsCount}
      </CommentsCount>
    </Container>
  );
};

export default CommentsAreaOutline;
