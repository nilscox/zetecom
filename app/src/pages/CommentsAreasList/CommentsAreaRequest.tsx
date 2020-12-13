import React, { useEffect, useState } from 'react';

import { Collapse, Fade, makeStyles, Typography } from '@material-ui/core';

import Button from 'src/components/Button';
import CommentsAreaForm from 'src/components/CommentsAreaForm';
import createCommentsAreaErrorsHandlers from 'src/components/CommentsAreaForm/createCommentsAreaErrorsHandlers';
import { CreateCommentsAreaFormState } from 'src/components/CommentsAreaForm/useCommentsAreaForm';
import { useTrackEvent } from 'src/contexts/TrackingContext';
import useFormErrors from 'src/hooks/use-form-errors';
import useCommentsAreaRequest from 'src/pages/CommentsAreasList/useCreateCommentsArea';
import track from 'src/utils/track';

const SUCCESS_MESSAGE_TIMEOUT = 5000;

const useStyles = makeStyles(({ spacing, palette }) => ({
  container: {
    position: 'relative',
    minHeight: spacing(8),
  },
  openCommentsAreaButton: {
    position: 'absolute',
    margin: spacing(2, 0),
  },
  successMessage: {
    position: 'absolute',
    margin: spacing(2, 0),
    color: palette.success.dark,
    fontWeight: 'bold',
  },
  commentsAreaForm: {
    margin: spacing(2, 0),
  },
}));

const CommentsAreaRequest: React.FC = () => {
  const trackEvent = useTrackEvent();

  const [displayForm, setDisplayForm] = useState(false);
  const [clearForm, setClearForm] = useState(false);
  const [requested, setRequested] = useState(false);
  const classes = useStyles();

  const [{ status, loading, error, data }, request] = useCommentsAreaRequest();
  const [[fieldsErrors]] = useFormErrors(createCommentsAreaErrorsHandlers, error);

  useEffect(() => {
    if (status(201)) {
      setClearForm(true);
      setDisplayForm(false);
      setRequested(true);
      trackEvent(track.requestCommentsArea(''));
    }
  }, [status, trackEvent, data]);

  useEffect(() => {
    if (clearForm) {
      setClearForm(false);
    }
  }, [clearForm]);

  useEffect(() => {
    const timeout = setTimeout(() => setRequested(false), SUCCESS_MESSAGE_TIMEOUT);
    return () => clearTimeout(timeout);
  }, [requested]);

  const handleSubmit = (data: CreateCommentsAreaFormState) => {
    request({ data }).catch(() => {});
  };

  return (
    <div className={classes.container}>
      <Fade in={!displayForm && !requested}>
        <Button className={classes.openCommentsAreaButton} onClick={() => setDisplayForm(true)}>
          Ouvrir une zone de commentaires
        </Button>
      </Fade>
      <Fade in={requested}>
        <Typography className={classes.successMessage}>
          L'ouverture a bien été prise en compte, les modérateurs vont traiter votre demande.
        </Typography>
      </Fade>
      <Collapse in={displayForm}>
        <CommentsAreaForm
          className={classes.commentsAreaForm}
          requiredFields={['informationUrl']}
          fieldsErrors={fieldsErrors}
          clear={clearForm}
          onSubmit={handleSubmit}
        >
          <Button onClick={() => setDisplayForm(false)}>Annuler</Button>
          <Button loading={loading} type="submit">
            Valider
          </Button>
        </CommentsAreaForm>
      </Collapse>
    </div>
  );
};

export default CommentsAreaRequest;
