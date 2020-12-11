import React, { useEffect, useState } from 'react';

import { makeStyles, Typography } from '@material-ui/core';

import Button from 'src/components/Button';
import { useTrackEvent } from 'src/contexts/TrackingContext';
import { useCurrentUser } from 'src/contexts/UserContext';
import useAxios from 'src/hooks/use-axios';
import useQueryString from 'src/hooks/use-query-string';
import track from 'src/utils/track';

const useStyles = makeStyles(({ palette, spacing }) => ({
  message: {
    fontSize: '1.4em',
    color: palette.text.secondary,
    marginBottom: spacing(4),
  },
  requestSuccess: {
    color: palette.success.dark,
    fontWeight: 'bold',
  },
}));

const CommentAreaClosed: React.FC = () => {
  const classes = useStyles();
  const [requested, setRequested] = useState(false);
  const [, setAlreadyRequested] = useState(false);
  const { identifier } = useQueryString();
  const user = useCurrentUser();
  const trackEvent = useTrackEvent();

  const [{ status, loading, error }, request] = useAxios(
    {
      method: 'POST',
      url: '/api/comments-area/request',
      data: { identifier: decodeURIComponent(identifier as string) },
    },
    { manual: true },
  );

  useEffect(() => {
    if (status(201)) {
      setRequested(true);
      trackEvent(track.requestCommentsArea(identifier as string));
    }

    if (status(400) && error?.response?.data.message === 'REQUEST_ALREADY_REGISTERED') {
      setRequested(true);
      setAlreadyRequested(true);
      trackEvent(track.requestCommentsArea(identifier as string, true));
    }
  }, [status, error, trackEvent, identifier]);

  return (
    <>
      <Typography variant="body2" className={classes.message}>
        L'espace de commentaires n'est pas ouvert sur cette page.
      </Typography>

      {!user && (
        <Typography variant="body2">
          Connectez-vous pour demander l'ouverture d'une nouvelle zone de commentaire.
        </Typography>
      )}

      {user && !requested && (
        <Button loading={loading} size="large" onClick={() => request().catch(() => {})}>
          Demander l'ouverture
        </Button>
      )}

      {requested && (
        <>
          <Typography variant="body2" className={classes.requestSuccess}>
            L'ouverture a bien été prise en compte !
          </Typography>
          <>Les modérateurs traiteront votre demande au plus vite.</>
        </>
      )}
    </>
  );
};

export default CommentAreaClosed;
