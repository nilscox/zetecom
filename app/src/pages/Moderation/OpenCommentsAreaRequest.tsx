/* eslint-disable max-lines */
import React, { useEffect, useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { ExpandMore, Launch } from '@material-ui/icons';
import { useFormState } from 'react-use-form-state';

import Button from 'src/components/Button';
import useAxios from 'src/hooks/use-axios';

const getDefaultValues = (identifier: string) => {
  const match = /^youtube:(.*)/.exec(identifier);

  if (match) {
    const youtubeId = match[1];

    return {
      informationUrl: 'https://www.youtube.com/watch?v=' + youtubeId,
      imageUrl: 'https://i.ytimg.com/vi/' + youtubeId + '/hqdefault.jpg',
    };
  }
};

const useStyles = makeStyles<Theme, { processed: boolean }>(({ spacing, palette }) => ({
  accordionSummary: ({ processed }) => ({
    ...(processed && {
      opacity: 0.5,
    }),
  }),
  identifierLabel: {
    fontWeight: 'bold',
  },
  field: {
    margin: spacing(2, 0),
  },
  approveButton: {
    margin: spacing(2, 0),
  },
  rejectButton: {
    margin: spacing(2, 0),
    color: palette.error.dark,
  },
}));

type CreateCommentsAreaFormState = {
  imageUrl: string;
  informationUrl: string;
  informationTitle: string;
  informationAuthor: string;
  published: string;
};

const useCreateCommentsAreaForm = (identifier: string) => {
  const [{ values }, form] = useFormState<CreateCommentsAreaFormState>({
    imageUrl: '',
    informationUrl: '',
    informationTitle: '',
    informationAuthor: '',
    published: '',
    ...getDefaultValues(identifier),
  });

  const [{ loading, status }, create] = useAxios({
    method: 'POST',
    url: '/api/comments-area',
  }, undefined, { manual: true });

  const handleCreate = () => {
    create({
      data: {
        identifier,
        imageUrl: values.imageUrl,
        informationUrl: values.informationUrl,
        informationTitle: values.informationTitle,
        informationAuthor: values.informationAuthor,
        published: new Date(values.published),
      },
    });
  };

  return {
    form,
    loading,
    created: status(201),
    handleCreate,
  };
};

const useRejectOpenCommentsArea = (requestId: number) => {
  const [{ loading, status }, reject] = useAxios({
    method: 'POST',
    url: `/api/comments-area/requests/${requestId}/reject`,
  }, undefined, { manual: true });

  return {
    loading,
    rejected: status(200),
    handleReject: () => reject(),
  };
};

const OpenCommentsAreaRequest: React.FC<{ id: number; identifier: string }> = ({ id, identifier }) => {
  const [expanded, setExpanded] = useState(false);

  const { form: { text }, loading: createLoading, created, handleCreate } = useCreateCommentsAreaForm(identifier);
  const { loading: rejectLoading, rejected, handleReject } = useRejectOpenCommentsArea(id);
  const defaultValues = getDefaultValues(identifier);

  const loading = createLoading || rejectLoading;
  const classes = useStyles({ processed: created || rejected });

  useEffect(() => {
    if (created || rejected)
      setExpanded(false);
  }, [created, rejected]);

  return (
    <Accordion
      expanded={expanded}
      onChange={(_event, isExpanded) => setExpanded(isExpanded)}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        className={classes.accordionSummary}
      >
        <Typography className={classes.identifierLabel}>{identifier}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container dir="column">

          <Grid container direction="row">
            <Grid item style={{ flex: 2, marginRight: 6 }}>
              <TextField
                fullWidth
                disabled
                className={classes.field}
                label="identifiant"
                value={identifier}
              />
            </Grid>

            <Grid item style={{ flex: 1, marginLeft: 6 }}>
              <TextField
                fullWidth
                disabled={loading}
                type="date"
                className={classes.field}
                label="date de publication"
                InputLabelProps={{ shrink: true }}
                {...text('published')}
              />
            </Grid>
          </Grid>

          <Grid container direction="row">
            <Grid item style={{ flex: 2, marginRight: 6 }}>
              <TextField
                fullWidth
                disabled={loading}
                className={classes.field}
                label="title de l'information"
                {...text('informationTitle')}
              />
            </Grid>

            <Grid item style={{ flex: 1, marginLeft: 6 }}>
              <TextField
                fullWidth
                disabled={loading}
                className={classes.field}
                label="auteur de l'information"
                {...text('informationAuthor')}
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            disabled={loading}
            className={classes.field}
            label="URL de l'information"
            InputProps={{
              endAdornment: (
                <a href={defaultValues.informationUrl} style={{ color: 'inherit' }}>
                  <Launch />
                </a>
              ),
            }}
            {...text('informationUrl')}
          />

          <TextField
            fullWidth
            disabled={loading}
            className={classes.field}
            label="URL de l'image de la zone de commentaires"
            {...text('imageUrl')}
          />

          <Grid item container dir="row" justify="space-evenly">
            <Button
              loading={loading}
              size="large"
              className={classes.approveButton}
              onClick={handleCreate}
            >
              Ouvrir
            </Button>

            <Button
              loading={loading}
              size="large"
              className={classes.rejectButton}
              onClick={handleReject}
            >
              Refuser l'ouverture
            </Button>
          </Grid>

        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default OpenCommentsAreaRequest;
