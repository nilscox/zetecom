import React from 'react';

import { RouteComponentProps } from 'react-router-dom';

import CommentsArea from 'src/components/CommentsArea';

const CommentsAreaPage: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  return (
    <CommentsArea
      commentsAreaId={Number(match.params.id)}
    />
  );
};

export default CommentsAreaPage;
