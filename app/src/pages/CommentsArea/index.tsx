import React from 'react';

import { RouteComponentProps } from 'react-router-dom';

import Fallback from 'src/components/Fallback';
import { CommentsAreaProvider } from 'src/contexts/CommentsAreaContext';
import useAxios from 'src/hooks/use-axios';
import { CommentsArea, parseCommentsArea } from 'src/types/CommentsArea';

import AsyncContent from '../../components/AsyncContent';
import CommentsAreaOverview from '../../components/CommentsAreaOverview';
import { Link } from '../../components/Link';
import Padding from '../../components/Padding';
import CommentsAreaComponent from '../integration/CommentsArea';

const useFetchCommentsArea = (id: number) => {
  return useAxios<CommentsArea>(`/api/comments-area/${id}`, parseCommentsArea);
};

const CommentsAreaPage: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const commentsAreaId = Number(match.params.id);

  const [{ loading, data: commentsArea, error }] = useFetchCommentsArea(commentsAreaId);

  if (error)
    throw error;

  return (
    <AsyncContent loading={loading}>
      {() => (
        <Fallback when={!commentsArea} fallback={<>oeuoeu</>}>
          {() => (
            <CommentsAreaProvider value={commentsArea}>

              <Padding bottom>
                <CommentsAreaOverview
                  commentsArea={commentsArea}
                  title={(
                    <Link color={false} openInNewTab href={commentsArea.informationUrl}>
                      { commentsArea.informationTitle }
                    </Link>
                  )}
                />
              </Padding>

              <CommentsAreaComponent />

            </CommentsAreaProvider>
          )}
        </Fallback>
      )}
    </AsyncContent>
  );
};

export default CommentsAreaPage;
