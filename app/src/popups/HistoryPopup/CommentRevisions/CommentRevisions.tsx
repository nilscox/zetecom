import React, { useState } from 'react';

import styled from '@emotion/styled';

import Box from 'src/components/elements/Box/Box';
import Diff from 'src/components/elements/Diff/Diff';
import useDateFormat, { DATE_FORMAT_DAY_HOUR } from 'src/hooks/useDateFormat';
import { spacing } from 'src/theme';
import { Message } from 'src/types/Comment';

import RevisionSelection from '../RevisionSelection/RevisionSelection';

const Dates = styled.div`
  display: flex;
  flex-direction: row;
`;

const Date = styled.div`
  flex: 1;
  text-align: center;
  margin: ${spacing(2, 0)};
`;

const DiffContainer = styled.div`
  padding: ${spacing(1)};
  background-color: #fafafa;
  font-family: monospace;

  & ins {
    text-decoration: none;
    background-color: #4ddf5933;
  }

  & del {
    text-decoration: none;
    background-color: #df4d4d33;
  }
`;

type CommentRevisionsProps = {
  history: Message[];
};

const CommentRevisions: React.FC<CommentRevisionsProps> = ({ history }) => {
  const revisionsCount = history.length - 1;
  const [revision, setRevision] = useState(revisionsCount);
  const formatDate = useDateFormat(DATE_FORMAT_DAY_HOUR);

  const before = history[history.length - revision];
  const after = history[history.length - revision - 1];

  if (revisionsCount === 0) {
    return null;
  }

  return (
    <>
      <Dates>
        <Date>{formatDate(before.date)}</Date>
        <Date>{formatDate(after.date)}</Date>
      </Dates>

      <DiffContainer>
        <Diff before={before.text} after={after.text} />
      </DiffContainer>

      <Box mt={4}>
        <RevisionSelection revisionsCount={revisionsCount} revision={revision} setRevision={setRevision} />
      </Box>
    </>
  );
};

export default CommentRevisions;
