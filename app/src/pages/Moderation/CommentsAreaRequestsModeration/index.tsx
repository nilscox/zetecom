import React from 'react';

import { Box, Typography } from '@material-ui/core';

import AsyncContent from '../../../components/AsyncContent';
import Fallback from '../../../components/Fallback';

import CommentsAreaRequestModeration from './CommentsAreaRequestModeration';
import useFetchCommentsAreaRequests from './useFetchCommentsAreaRequests';

const CommentsAreaRequestsModeration: React.FC = () => {
  const [{ loading, data: pendingRequests, error }] = useFetchCommentsAreaRequests();

  if (error) {
    throw error;
  }

  return (
    <>
      <Box my={4}>
        <Typography variant="h2">Ouverture de nouvelles zones de commentaires</Typography>
      </Box>

      <AsyncContent
        loading={loading}
        render={() => (
          <Fallback
            minHeight={100}
            when={pendingRequests?.length === 0}
            fallback="Toutes les demandes d'ouvertures de zones de commentaires ont été traitées."
            render={() => (
              <>
                {pendingRequests?.map(request => (
                  <CommentsAreaRequestModeration key={request.id} request={request} />
                ))}
              </>
            )}
          />
        )}
      ></AsyncContent>
    </>
  );
};

export default CommentsAreaRequestsModeration;
