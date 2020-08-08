import React from 'react';

import dayjs from 'dayjs';

import { Information } from 'src/types/Information';

import defaultInfo from './default-info.png';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

type StylesProps = {
  inline?: boolean;
};

const useStyles = makeStyles<Theme, StylesProps>(({ breakpoints, spacing }) => ({
  container: ({ inline }) => ({
    height: inline ? 30 : 140,
    transition: 'height 180ms ease-in-out',
  }),
  image: ({ inline }) => ({
    margin: spacing(0, inline ? 1 : 4),
    height: '100%',
    objectFit: 'cover',
  }),
  text: ({ inline }) => ({
    flex: 1,
    fontSize: inline ? '0.7rem' : '1rem',
    paddingLeft: spacing(4),
    [breakpoints.down('sm')]: {
      paddingLeft: spacing(2),
    },
  }),
  title: ({ inline }) => ({
    '&&': {
      fontSize: inline ? '1rem' : '1.6rem',
    },
    fontWeight: 'bold',
    [breakpoints.down('lg')]: {
      fontSize: '1.5rem',
    },
    [breakpoints.down('md')]: {
      fontSize: '1.5rem',
    },
    [breakpoints.down('sm')]: {
      fontSize: '1.2rem',
    },
  }),
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

          <Typography>
            { information.published && dayjs(information.published).format('[Publiée le] D MMMM YYYY') }
          </Typography>

          <div>
            { information.commentsCount } commentaire{ information.commentsCount !== 1 && 's' }
          </div>

        </Grid>
      </Grid>

    </Grid>
  );
};

export default InformationOverview;
