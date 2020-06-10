import React from 'react';

import dayjs from 'dayjs';

import { Information } from '../types/Information';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ breakpoints, spacing }: Theme) => ({
  image: {
    width: 240,
    height: 160,
    objectFit: 'cover',
  },
  text: {
    flex: 1,
    paddingLeft: spacing(4),
    [breakpoints.down('sm')]: {
      paddingLeft: spacing(2),
    },
  },
  title: {
    fontSize: '1.6rem',
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
  },
}));

type InformationOverviewProps = {
  information: Information;
  title?: React.ReactNode;
};

const InformationOverview: React.FC<InformationOverviewProps> = ({ information, title }) => {
  const classes = useStyles({});

  return (
    <Grid container>

      {/* TODO: default image */}
      <img className={classes.image} src={information.imageUrl || ''} />

      <Grid item className={classes.text}>
        <Grid container direction="column">

          <Typography variant="h3" className={classes.title}>
            { title || information.title }
          </Typography>

          <Typography>
            { information.published && dayjs(information.published).format('[Publiée le] D MMMM YYYY') }
          </Typography>

          <div>
            { information.reactionsCount } commentaire{ information.reactionsCount !== 1 && 's' }
          </div>

        </Grid>
      </Grid>

    </Grid>
  );
};

export default InformationOverview;
