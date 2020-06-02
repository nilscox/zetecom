import React, { ElementType } from 'react';

import dayjs from 'dayjs';

import { Link } from 'src/components/Link';

import { Information } from '../types/Information';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ breakpoints, spacing, palette }: Theme) => ({
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
    color: palette.secondary.dark,
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
  link?: boolean;
  information: Information;
};

const InformationOverview: React.FC<InformationOverviewProps> = ({ link, information }) => {
  const classes = useStyles({});
  const LinkElement: ElementType = link ? Link : 'div';
  const linkProps = link ? { openInNewTab: true, href: information.url } : {};

  return (
    <Grid container>

      {/* TODO: default image */}
      <img className={classes.image} src={information.imageUrl || ''} />

      <Grid item className={classes.text}>
        <Grid container direction="column">

          <Typography variant="h3" className={classes.title}>
            <LinkElement {...linkProps}>{ information.title }</LinkElement>
          </Typography>

          <Typography>
            {/* TODO: store the information publication date in the API */}
            { dayjs().format('[Publiée le] DD.MM.YYYY') }
          </Typography>

          <div>
            { information.reactionsCount } réaction{ information.reactionsCount !== 1 && 's' }
          </div>

        </Grid>
      </Grid>

    </Grid>
  );
};

export default InformationOverview;
