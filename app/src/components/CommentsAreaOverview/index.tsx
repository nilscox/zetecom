import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import dayjs from 'dayjs';

import { CommentsArea } from 'src/types/CommentsArea';

import defaultInfo from './default-info.png';

type StylesProps = {
  inline?: boolean;
};

const useStyles = makeStyles<Theme, StylesProps>(({ breakpoints, spacing, palette }) => ({
  container: ({ inline }) => ({
    height: inline ? 30 : 140,
    transition: 'height 180ms ease-in-out',
  }),
  image: ({ inline }) => ({
    width: 180,
    height: '100%',
    margin: spacing(0, inline ? 1 : 2),
    objectFit: 'cover',
  }),
  text: ({ inline }) => ({
    flex: 1,
    fontSize: inline ? '0.7rem' : '1rem',
    paddingLeft: spacing(4),
    Bottom: spacing(2),
    [breakpoints.down('sm')]: {
      paddingLeft: spacing(2),
    },
  }),
  title: ({ inline }) => ({
    marginBottom: spacing(1),
    '&&': {
      fontSize: inline ? '1rem' : '1.4rem',
    },
    fontWeight: 'bold',
    [breakpoints.down('lg')]: {
      fontSize: '1.3rem',
    },
    [breakpoints.down('md')]: {
      fontSize: '1.3rem',
    },
    [breakpoints.down('sm')]: {
      fontSize: '1.2rem',
    },
  }),
  dateAndCommentsCount: {
    marginBottom: spacing(1),
  },
  author: {
    fontWeight: 'bold',
    color: palette.text.secondary,
  },
}));

type CommentsAreaOverviewProps = {
  commentsArea: CommentsArea;
  title?: React.ReactNode;
  inline?: boolean;
};

const CommentsAreaOverview: React.FC<CommentsAreaOverviewProps> = ({ commentsArea, title, inline }) => {
  const classes = useStyles({ inline });

  return (
    <Grid container className={classes.container}>

      <img className={classes.image} src={commentsArea.imageUrl || defaultInfo} />

      <Grid item className={classes.text}>
        <Grid container direction="column">

          <Typography variant="h3" className={classes.title}>
            { title || commentsArea.informationTitle }
          </Typography>

          <Typography className={classes.dateAndCommentsCount}>
            { commentsArea.published && dayjs(commentsArea.published).format('D MMMM YYYY') }
            {' - '}
            { commentsArea.commentsCount } commentaire{ commentsArea.commentsCount !== 1 && 's' }
          </Typography>

          <Typography className={classes.author}>
            { commentsArea.informationAuthor }
          </Typography>

          <div>
          </div>

        </Grid>
      </Grid>

    </Grid>
  );
};

export default CommentsAreaOverview;
