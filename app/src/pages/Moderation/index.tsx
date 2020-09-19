import React from 'react';

import {
  makeStyles,
  Typography,
} from '@material-ui/core';

import AsyncContent from 'src/components/AsyncContent';
import Authenticated from 'src/components/Authenticated';
import Fallback from 'src/components/Fallback';
import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import { parseOpenCommentsAreaRequest } from 'src/types/CommentsArea';

import OpenCommentsAreaRequest from './OpenCommentsAreaRequest';

const useStyles = makeStyles(({ spacing }) => ({
  section: {
    margin: spacing(12, 0),
  },
}));

const OpenCommentsAreaRequests: React.FC = () => {
  const [{ loading, data: pendingRequests }] = useAxiosPaginated(
    '/api/comments-area/requests',
    parseOpenCommentsAreaRequest,
  );

  const classes = useStyles();

  return (
    <div className={classes.section}>
      <Typography variant="h3">
        Demandes d'ouverture de nouvelles zones de commentaires
      </Typography>
      <AsyncContent loading={loading}>
        {() => (
          <Fallback
            minHeight={100}
            when={pendingRequests?.length === 0}
            fallback="Toutes les demandes d'ouvertures de zones de commentaires ont été traitées."
          >
            {() => pendingRequests.map(({ id, identifier }, n) => (
              <OpenCommentsAreaRequest key={n} id={id} identifier={identifier} />
            ))}
          </Fallback>
        )}
      </AsyncContent>
    </div>
  );
};

const ReportedComments: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <Typography variant="h3">
        Commentaires en attente de modération
      </Typography>
      <AsyncContent loading={false}>
        {() => (
          <Fallback minHeight={100} when={true} fallback="Aucun commentaire n'est en attente de modération.">
            {() => <></>}
          </Fallback>
        )}
      </AsyncContent>
    </div>
  );
};

const Moderation: React.FC = () => {

  return (
    <Authenticated>
      <Typography variant="h1" style={{ margin: '16px 0 32px 0' }}>
        Espace modération
      </Typography>
      <OpenCommentsAreaRequests />
      <ReportedComments />
    </Authenticated>
  );
};

export default Moderation;
