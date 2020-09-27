import React, { useEffect, useState } from 'react';

import { makeStyles, Typography } from '@material-ui/core';

import Button from 'src/components/Button';
import { useCurrentUser } from 'src/contexts/UserContext';
import useAxios from 'src/hooks/use-axios';
import useQueryString from 'src/hooks/use-query-string';

const useStyles = makeStyles(({ palette, spacing }) => ({
  message: {
    fontSize: '1.6em',
    color: palette.textLight.main,
    marginBottom: spacing(4),
  },
  requestSuccess: {
    color: palette.success.dark,
    fontWeight: 'bold',
  },
  alreadyRequested: {
    color: palette.textWarning.main,
    fontWeight: 'bold',
  },
}));

const CommentAreaClosed: React.FC = () => {
  const classes = useStyles();
  const [requested, setRequested] = useState(false);
  const [alreadyRequested, setAlreadyRequested] = useState(false);
  const { identifier } = useQueryString();
  const user = useCurrentUser();

  const [{ status, loading, error }, request] = useAxios({
    method: 'POST',
    url: '/api/comments-area-request',
    data: { identifier: decodeURIComponent(identifier as string) },
  }, undefined, { manual: true });

  useEffect(() => {
    if (status(201))
      setRequested(true);
    if (status(400) && error.response.data.message === 'REQUEST_ALREADY_REGISTERED') {
      setRequested(true);
      setAlreadyRequested(true);
    }
  }, [status, error]);

  return (
    <>
      <Typography className={classes.message}>
        L'espace de commentaires n'est pas ouvert sur cette page.
      </Typography>

      {!user && (
        <Typography>
          Connectez-vous pour demander l'ouverture d'une nouvelle zone de commentaire.
        </Typography>
      )}

      {user && !requested && (
        <Button loading={loading} size="large" onClick={() => request()}>
          Demander l'ouverture
        </Button>
      )}

      {requested && (
        <>
          <Typography className={classes.requestSuccess}>
            L'ouverture a bien été prise en compte !
          </Typography>
          <>
            Les modérateurs traiteront votre demande au plus vite.
          </>
        </>
      )}
    </>
  );
};

export default CommentAreaClosed;
