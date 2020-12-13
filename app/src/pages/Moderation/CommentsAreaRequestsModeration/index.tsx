import React from 'react';

import { Box, Typography } from '@material-ui/core';

import { CommentsAreaRequest } from 'src/types/CommentsArea';

import AsyncContent from '../../../components/AsyncContent';
import Fallback from '../../../components/Fallback';
import useAxiosPaginated from '../../../hooks/use-axios-paginated';

import CommentsAreaRequestModeration from './CommentsAreaRequestModeration';

const CommentsAreaRequestsModeration: React.FC = () => {
  const [{ loading, data: pendingRequests, error }] = useAxiosPaginated(
    '/api/comments-area-request',
    undefined,
    CommentsAreaRequest,
  );

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
