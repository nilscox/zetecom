import React from 'react';

import { RouteComponentProps } from 'react-router-dom';

import { CommentsAreaProvider } from 'src/contexts/CommentsAreaContext';
import useAxios from 'src/hooks/use-axios';
import { CommentsArea, parseCommentsArea } from 'src/types/CommentsArea';

import AsyncContent from '../../components/AsyncContent';
import CommentsAreaOverview from '../../components/CommentsAreaOverview';
import { Link } from '../../components/Link';
import Padding from '../../components/Padding';
import CommentsAreaComponent from '../integration/CommentsArea';

const useFetchCommentsArea = (id: number) => {
  const result = useAxios<CommentsArea>(`/api/comments-area/${id}`, parseCommentsArea);
  const [{ error }] = result;

  if (error) {
    throw error;
  }

  return result;
};

const CommentsAreaPage: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const commentsAreaId = Number(match.params.id);
  const [{ loading, data: commentsArea }] = useFetchCommentsArea(commentsAreaId);

  return (
    <AsyncContent
      loading={loading}
      render={() => (
        <CommentsAreaProvider value={commentsArea}>
          <Padding bottom>
            <CommentsAreaOverview
              commentsArea={commentsArea}
              title={
                <Link color={false} openInNewTab href={commentsArea.informationUrl}>
                  {commentsArea.informationTitle}
                </Link>
              }
            />
          </Padding>
          <CommentsAreaComponent />
        </CommentsAreaProvider>
      )}
    />
  );
};

export default CommentsAreaPage;
