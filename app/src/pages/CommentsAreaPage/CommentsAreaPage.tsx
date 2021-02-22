import React from 'react';

import { RouteComponentProps } from 'react-router';

import Box from 'src/components/elements/Box/Box';
import CommentsAreaContainer from 'src/containers/CommentsAreaContainer/CommentsAreaContainer';

const CommentsAreaPage: React.FC<RouteComponentProps<{ commentsAreaId: string }>> = ({ match }) => {
  const commentsAreaId = Number(match.params.commentsAreaId);

  return (
    <Box mt={4}>
      <CommentsAreaContainer displayOutline commentsAreaId={commentsAreaId} />
    </Box>
  );
};

export default CommentsAreaPage;
