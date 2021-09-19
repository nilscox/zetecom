import React, { useState } from 'react';

import styled from '@emotion/styled';
import { selectComment } from '@zetecom/app-core';

import { AvatarNick } from '~/components/elements/Avatar/Avatar';
import { Diff } from '~/components/elements/Diff/Diff';
import { IconButton } from '~/components/elements/IconButton/IconButton';
import { Select } from '~/components/elements/Select/Select';
import { Text } from '~/components/elements/Text/Text';
import { Next, Prev } from '~/components/icons';
import { Box } from '~/components/layout/Box/Box';
import { Flex } from '~/components/layout/Flex/Flex';
import { useAppSelector } from '~/hooks/useAppSelector';
import useDateFormat, { DATE_FORMAT_DAY_HOUR } from '~/hooks/useFormatDate';
import { color, fontSize, spacing } from '~/theme';

type CommentHistoryProps = {
  commentId: string;
};

export const CommentHistory: React.FC<CommentHistoryProps> = ({ commentId }) => {
  const { author, history } = useAppSelector(selectComment, commentId);

  if (!history) {
    throw new Error('Expected comment.history to be defined');
  }

  const formatDate = useDateFormat(DATE_FORMAT_DAY_HOUR);
  const [revision, setRevision] = useState(history.length);

  return (
    <>
      <Text as="h1" fontSize={4} fontWeight="bold" marginY={5}>
        Historique d'éditions
      </Text>

      <Flex direction="row" alignItems="center" marginY={5}>
        <AvatarNick user={author} />
        <Box marginLeft={5} paddingLeft={5} borderLeft>
          <RevisionSelection revision={revision} revisionsCount={history.length} setRevision={setRevision} />
        </Box>
      </Flex>

      <Box marginTop={5}>
        <Flex direction="row" marginBottom={2}>
          <RevisionDate>{formatDate(history[revision - 2].date)}</RevisionDate>
          <RevisionDate>{formatDate(history[revision - 1].date)}</RevisionDate>
        </Flex>
        <StyledDiff before={history[revision - 2].text} after={history[revision - 1].text} />
      </Box>
    </>
  );
};

const RevisionDate = styled(Text)`
  flex: 1;
  text-align: center;
  font-size: ${fontSize(1)};
  color: ${color('textLight')};
`;

const StyledDiff = styled(Diff)`
  background-color: ${color('backgroundLight')};
  padding: ${spacing(3)};
`;

const StyledIconButton = styled(IconButton)`
  margin: ${spacing(0, 2)};
`;

type RevisionSelectionProps = {
  revisionsCount: number;
  revision: number;
  setRevision: (revision: number) => void;
};

const RevisionSelection: React.FC<RevisionSelectionProps> = ({ revisionsCount, revision, setRevision }) => {
  const prevRevision = () => setRevision(revision - 1);
  const nextRevision = () => setRevision(revision + 1);

  return (
    <Flex alignItems="center">
      <label htmlFor="version">Version</label>

      <StyledIconButton as={Prev} size={5} disabled={revision <= 2} onClick={prevRevision} title="Version précédente" />

      <Select id="version" value={revision} onChange={(e) => setRevision(Number(e.currentTarget.value))}>
        {Array(revisionsCount - 1)
          .fill(null)
          .map((_, n) => n + 1)
          .map((n) => (
            <option key={n} value={n + 1}>
              {n} {'->'} {n + 1}
            </option>
          ))}
      </Select>

      <StyledIconButton
        as={Next}
        size={5}
        disabled={revision >= revisionsCount}
        onClick={nextRevision}
        title="Version suivante"
      />
    </Flex>
  );
};
