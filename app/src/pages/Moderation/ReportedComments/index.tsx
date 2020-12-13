import React from 'react';

import { Box, Typography } from '@material-ui/core';

import AsyncContent from 'src/components/AsyncContent';
import Fallback from 'src/components/Fallback';
import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import { ReportedComment as ReportedCommentType } from 'src/types/Report';

import ReportedComment from './ReportedComment';

const ReportedComments: React.FC = () => {
  const [{ data: reportedComments, loading, error }] = useAxiosPaginated(
    '/api/moderation/reports',
    undefined,
    ReportedCommentType,
  );

  if (error) {
    throw error;
  }

  return (
    <>
      <Box my={4}>
        <Typography variant="h2">Commentaires signalés</Typography>
      </Box>

      <AsyncContent
        loading={loading}
        render={() => (
          <Fallback
            minHeight={100}
            when={reportedComments?.length === 0}
            fallback="Aucun commentaire n'est en attente de modération."
            render={() => (
              <>
                {reportedComments?.map(comment => (
                  <ReportedComment key={comment.id} comment={comment} reports={comment.reports} />
                ))}
              </>
            )}
          />
        )}
      />
    </>
  );
};

export default ReportedComments;
