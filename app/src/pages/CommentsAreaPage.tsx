import React from 'react';

import { RouteComponentProps } from 'react-router-dom';

import CommentsArea from 'src/components/CommentsArea';

import AsyncContent from '../components/AsyncContent';
import useFetchCommentsArea from '../components/CommentsArea/useFetchCommentsArea';

const CommentsAreaPage: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const [{ data: commentsArea, loading }] = useFetchCommentsArea({ id: Number(match.params.id) });

  return (
    <AsyncContent
      loading={loading}
      render={() => <CommentsArea commentsArea={commentsArea} />}
    />
  );
};

export default CommentsAreaPage;
