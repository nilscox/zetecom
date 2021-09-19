/** @jsx jsx */
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { Information, selectCommentsArea } from '@zetecom/app-core';

import IconComment from '~/components/icons/Comment.svg';

import { Icon } from '~/components/elements/Icon/Icon';
import { ExternalLink, Link } from '~/components/elements/Link/Link';
import { Text } from '~/components/elements/Text/Text';
import { Box } from '~/components/layout/Box/Box';
import { Flex } from '~/components/layout/Flex/Flex';
import { useAppSelector } from '~/hooks/useAppSelector';
import useDateFormat from '~/hooks/useFormatDate';
import { medias } from '~/medias/medias';

type CommentsAreaOutlineProps = {
  commentsAreaId: string;
  link: string;
  externalLink?: boolean;
};

export const CommentsAreaOutline: React.FC<CommentsAreaOutlineProps> = ({ commentsAreaId, link, externalLink }) => {
  const { information, commentsCount } = useAppSelector(selectCommentsArea, commentsAreaId);

  const LinkComponent: React.FC = ({ children }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const LinkComponent = (externalLink ? ExternalLink : Link) as React.FC<any>;
    const props = externalLink ? { href: link } : { to: link };

    return (
      <LinkComponent css={{ textDecoration: 'none' }} {...props}>
        {children}
      </LinkComponent>
    );
  };

  return (
    <Flex direction="row" data-testid="comments-area">
      <LinkComponent>
        <MediaImage src={medias[information.media]?.image} />
      </LinkComponent>
      <Description information={information} commentsCount={commentsCount} LinkComponent={LinkComponent} />
    </Flex>
  );
};

const MediaImage = styled.img`
  width: 149px;
  height: 92px;
  background-color: #f6f6f6;
  border: 1px solid #eeeeee;
`;

type DescriptionProps = {
  information: Information;
  commentsCount: number;
  LinkComponent: React.FC<unknown>;
};

const Description: React.FC<DescriptionProps> = ({ information, commentsCount, LinkComponent }) => {
  return (
    <Box marginLeft={4}>
      <Box marginBottom={3}>
        <LinkComponent>
          <InformationTitle>{information.title}</InformationTitle>
        </LinkComponent>
      </Box>

      <Flex direction="row" alignItems="flex-end">
        <Box marginRight={5}>
          <CommentsCount count={commentsCount} />
          <PublicationDate date={information.publicationDate} />
        </Box>

        <Box marginX={5}>
          <Text as="div">{medias[information.media]?.label}</Text>
          <InformationAuthor author={information.author} />
        </Box>
      </Flex>
    </Box>
  );
};

const InformationTitle: React.FC = ({ children }) => (
  <Text fontSize={4} fontWeight="medium" color="text">
    {children}
  </Text>
);

const CommentsCount: React.FC<{ count: number }> = ({ count }) => (
  <span>
    <Icon as={IconComment} css={{ verticalAlign: 'middle' }} />
    <Text fontWeight="medium" marginLeft={3}>
      {count} commentaire{count === 1 ? '' : 's'}
    </Text>
  </span>
);

const PublicationDate: React.FC<{ date?: Date }> = ({ date }) => {
  const formatDate = useDateFormat('DD MMMM YYYY');

  if (!date) {
    return null;
  }

  return (
    <Text as="div" color="textLight" marginTop={2}>
      {formatDate(date)}
    </Text>
  );
};

const InformationAuthor: React.FC<{ author?: string }> = ({ author }) => {
  if (!author) {
    return null;
  }

  return (
    <Text as="div" color="textLight" marginTop={2}>
      {author}
    </Text>
  );
};
