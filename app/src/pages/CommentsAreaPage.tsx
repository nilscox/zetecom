import React from 'react';

import { RouteComponentProps } from 'react-router-dom';

import CommentsArea from 'src/components/CommentsArea';

import AsyncContent from '../components/AsyncContent';
import useFetchCommentsArea from '../components/CommentsArea/useFetchCommentsArea';
import Fallback from '../components/Fallback';

const CommentsAreaPage: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const id = Number(match.params.id);
  const [{ data: commentsArea, loading, status }] = useFetchCommentsArea({ id });

  return (
    <AsyncContent
      loading={loading}
      render={() => (
        <Fallback
          when={isNaN(id) || status(404)}
          fallback={"Cette page fait référence à une zone de commentaires qui n'existe pas ou qui a été supprimée."}
          render={() => <CommentsArea commentsArea={commentsArea} linkToInformation />}
        />
      )}
    />
  );
};

export default CommentsAreaPage;
