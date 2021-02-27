import React from 'react';

import { RouteComponentProps } from 'react-router';

import Box from 'src/components/elements/Box/Box';
import Fallback from 'src/components/layout/Fallback/Fallback';
import CommentsAreaContainer from 'src/containers/CommentsAreaContainer/CommentsAreaContainer';

const CommentsAreaClosedFallback: React.FC = () => (
  <Fallback
    when
    fallback={<>Cette page fait référence à une zone de commentaires qui n'existe pas ou qui a été supprimée.</>}
  />
);

const CommentsAreaPage: React.FC<RouteComponentProps<{ commentsAreaId: string }>> = ({ match }) => {
  const commentsAreaId = Number(match.params.commentsAreaId);

  return (
    <Box mt={4}>
      <CommentsAreaContainer
        displayOutline
        commentsAreaId={commentsAreaId}
        notFoundFallback={<CommentsAreaClosedFallback />}
      />
    </Box>
  );
};

export default CommentsAreaPage;
