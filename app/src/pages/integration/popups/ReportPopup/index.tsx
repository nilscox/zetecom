/* eslint-disable max-lines */

import React, { useEffect, useState } from 'react';

import { Box, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { RouteComponentProps } from 'react-router';

import CommentBody from 'src/components/Comment/CommentBody';
import { WebsiteLink } from 'src/components/Link';
import Loader from 'src/components/Loader';
import { useTrackPageview } from 'src/components/TrackPageView';
import useAxios from 'src/hooks/use-axios';
import { parseComment } from 'src/types/Comment';
import { trackReportComment } from 'src/utils/track';

import Indented from '../../../../components/Comment/CommentContainer/Indented';

import ReportButton from './ReportButton';
import ReportSuccess from './ReportSuccess';

const POPUP_CLOSE_AFTER_SUCCESS_TIMEOUT = 3000;

const useStyles = makeStyles(({ spacing, palette }) => ({
  container: {
    padding: spacing(12),
  },
  warningMessage: {
    color: palette.textWarning.main,
    fontWeight: 'bold',
    '& > p': {
      margin: spacing(4, 0),
    },
  },
  commentBody: {
    margin: spacing(8, 0, 8),
  },
  reportButtonContainer: {
    marginTop: spacing(8),
  },
  alreadyReported: {
    marginTop: spacing(4),
  },
}));

type ReportPopupProps = RouteComponentProps<{ id: string }>;

const ReportPopup: React.FC<ReportPopupProps> = ({ match }) => {
  useTrackPageview();

  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [alreadyReported, setArleadyReported] = useState(false);
  const classes = useStyles();

  const [{ data: comment, loading, error }] = useAxios('/api/comment/' + match.params.id, parseComment);

  const requestConfig = { method: 'POST', validateStatus: (status: number) => [201, 400].includes(status) } as const;
  const [{
    loading: reportLoading,
    error: reportError,
    raw: rawReportData,
    status,
  }, report] = useAxios(requestConfig, () => undefined, { manual: true });

  if (error) {
    throw error;
  }

  if (reportError) {
    throw reportError;
  }

  useEffect(() => {
    if (status(400)) {
      if (rawReportData && rawReportData.message === 'COMMENT_ALREADY_REPORTED') {
        setArleadyReported(true);
      } else {
        throw error;
      }
    }
  }, [status, setArleadyReported, error, rawReportData]);

  useEffect(() => {
    if (status(201)) {
      trackReportComment();
      setSuccess(true);
      setTimeout(window.close, POPUP_CLOSE_AFTER_SUCCESS_TIMEOUT);
    }
  }, [status, setSuccess]);

  const onSubmit = () => {
    if (comment) {
      report({
        url: `/api/comment/${comment.id}/report`,
        data: {
          commentId: comment.id,
          message: message !== '' ? message : undefined,
        },
      });
    }
  };

  if (loading) {
    return <Loader size="big" />;
  }

  if (success) {
    return <ReportSuccess />;
  }

  return (
    <div className={classes.container}>

      <Typography variant="h1">
        Signaler le commentaire de {comment.author.nick}
      </Typography>

      <div className={classes.warningMessage}>
        <Typography>
            Vous êtes sur le point de signaler un commentaire.
        </Typography>

        <Typography>
          {/* eslint-disable-next-line max-len */}
          Il est important de signaler les commentaires qui dérogent à <WebsiteLink to="/charte.html">la charte</WebsiteLink> : cela en informera les modérateurs qui pourront entreprendre une action en fonction de la situation.
        </Typography>

        <Typography>
          {/* eslint-disable-next-line max-len */}
          Cependant, être en désaccord avec un message n'est pas un motif valable pour la signaler, et abuser de la fonction de signalement de manière répété et sans raison valable peut entrainer une suspension de votre compte.
        </Typography>
      </div>

      <Indented className={classes.commentBody}>
        <CommentBody text={comment.text} />
      </Indented>

      <TextField
        multiline
        fullWidth
        variant="outlined"
        rows={4}
        placeholder="Précisez en quelques mots le motif du signalement si nécessaire"
        style={{ resize: 'vertical' }}
        onChange={e => setMessage(e.currentTarget.value)}
      />

      { alreadyReported && (
        <Grid container justify="center" className={classes.alreadyReported}>
          <Typography>Vous avez déjà signalé ce commentaire</Typography>
        </Grid>
      ) }

      <Grid container justify="center" className={classes.reportButtonContainer}>
        <ReportButton loading={reportLoading} onClick={onSubmit} />
      </Grid>

    </div>
  );
};

export default ReportPopup;
