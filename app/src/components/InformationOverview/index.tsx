import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import dayjs from 'dayjs';

import { Information } from 'src/types/Information';

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
    margin: spacing(0, inline ? 1 : 2),
    height: '100%',
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
    color: palette.textLight.dark,
  },
}));

type InformationOverviewProps = {
  information: Information;
  title?: React.ReactNode;
  inline?: boolean;
};

const InformationOverview: React.FC<InformationOverviewProps> = ({ information, title, inline }) => {
  const classes = useStyles({ inline });

  return (
    <Grid container className={classes.container}>

      <img className={classes.image} src={information.imageUrl || defaultInfo} />

      <Grid item className={classes.text}>
        <Grid container direction="column">

          <Typography variant="h3" className={classes.title}>
            { title || information.title }
          </Typography>

          <Typography className={classes.dateAndCommentsCount}>
            { information.published && dayjs(information.published).format('D MMMM YYYY') }
            {' - '}
            { information.commentsCount } commentaire{ information.commentsCount !== 1 && 's' }
          </Typography>

          <Typography className={classes.author}>
            { information.author }
          </Typography>

          <div>
          </div>

        </Grid>
      </Grid>

    </Grid>
  );
};

export default InformationOverview;
