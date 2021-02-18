import React from 'react';

import styled from '@emotion/styled';

import CommentsAreaOutline from 'src/components/domain/CommentsAreaOutline/CommentsAreaOutline';
import { spacing } from 'src/theme';
import { CommentsArea } from 'src/types/CommentsArea';

const Container = styled.div`
  display: grid;
  grid-template-columns: 100%;
  row-gap: ${spacing(5)};
`;

type CommentsAreasListProps = {
  commentsAreas: CommentsArea[];
};

const CommentsAreasList: React.FC<CommentsAreasListProps> = ({ commentsAreas }) => (
  <Container>
    {commentsAreas.map(commentsArea => (
      <CommentsAreaOutline key={commentsArea.id} commentsArea={commentsArea} link="commentsArea" />
    ))}
  </Container>
);

export default CommentsAreasList;
