/* eslint-disable max-lines */

import React, { useState } from 'react';

import { Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { RouteComponentProps } from 'react-router';

import CommentBody from 'src/components/Comment/CommentBody';
import { WebsiteLink } from 'src/components/Link';
import Loader from 'src/components/Loader';
import useAxios from 'src/hooks/use-axios';
import useReportComment from 'src/pages/integration/popups/ReportPopup/useReportComment';
import { Comment } from 'src/types/Comment';

import Indented from '../../../../components/Comment/CommentContainer/Indented';

import ReportButton from './ReportButton';
import ReportSuccess from './ReportSuccess';

const POPUP_CLOSE_AFTER_SUCCESS_TIMEOUT = 3000;

const useStyles = makeStyles(({ spacing, palette }) => ({
  container: {
    padding: spacing(12),
  },
  textWarning: {
    color: palette.text.warning,
    fontWeight: 'bold',
  },
  warningMessage: {
    color: palette.text.warning,
    margin: spacing(4, 0),
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
  const [message, setMessage] = useState('');
  const classes = useStyles();

  const [{ data: comment, loading, error }] = useAxios('/api/comment/' + match.params.id, undefined, Comment);

  if (error) {
    throw error;
  }

  const [{ reported, alreadyReported }, { loading: reportLoading }, report] = useReportComment(() =>
    setTimeout(window.close, POPUP_CLOSE_AFTER_SUCCESS_TIMEOUT),
  );

  // TODO: use <AsyncContent />
  if (loading || !comment) {
    return <Loader size="big" />;
  }

  if (reported) {
    return <ReportSuccess />;
  }

  const onSubmit = () => {
    if (comment) {
      report(comment, message || undefined);
    }
  };

  return (
    <div className={classes.container}>
      <Typography variant="h1">Signaler le commentaire de {comment.author.nick}</Typography>

      <div className={classes.warningMessage}>
        <Typography className={classes.textWarning}>Vous êtes sur le point de signaler un commentaire.</Typography>
      </div>

      <Typography className={classes.warningMessage}>
        Il est important de signaler les commentaires qui dérogent à{' '}
        <WebsiteLink to="/charte.html">la charte</WebsiteLink> : cela en informera les modérateurs qui pourront
        entreprendre une action en fonction de la situation.
      </Typography>

      <Typography className={classes.warningMessage}>
        Cependant, être en désaccord avec un message n'est pas un motif valable pour la signaler, et abuser de la
        fonction de signalement de manière répété et sans raison valable peut entrainer une suspension de votre compte.
      </Typography>

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

      {alreadyReported && (
        <Grid container justify="center" className={classes.alreadyReported}>
          <Typography color="error">Vous avez déjà signalé ce commentaire</Typography>
        </Grid>
      )}

      <Grid container justify="center" className={classes.reportButtonContainer}>
        <ReportButton loading={reportLoading} onClick={onSubmit} />
      </Grid>
    </div>
  );
};

export default ReportPopup;
