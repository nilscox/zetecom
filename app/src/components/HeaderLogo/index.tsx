import React from 'react';

import { makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';

import logo from './logo.png';

const useStyles = makeStyles(({ breakpoints, spacing, palette }) => ({
  image: {
    width: 54,
    marginRight: spacing(6),
    [breakpoints.down('xs')]: {
      width: 42,
      marginRight: spacing(4),
    },
    [breakpoints.down(360)]: {
      width: 36,
      marginRight: spacing(2),
    },
  },
  title: {
    fontFamily: '"Noticia Text", serif',
    fontWeight: 'bold',
    fontSize: 28,
    letterSpacing: 3,
    lineHeight: 1,
    color: palette.secondary.main,
    [breakpoints.down('xs')]: {
      fontSize: 20,
      letterSpacing: 2,
    },
    [breakpoints.down(360)]: {
      fontSize: 16,
      letterSpacing: 1,
    },
  },
  subtitleContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: spacing(4),
  },
  subTitle: {
    color: palette.text.secondary,
    fontSize: 18,
    lineHeight: 1,
    [breakpoints.down('xs')]: {
      fontSize: 16,
    },
    [breakpoints.down(360)]: {
      fontSize: 14,
    },
  },
  subtitleTop: {
    alignSelf: 'flex-end',
  },
}));

type HeaderLogoProps = {
  className?: string;
};

const HeaderLogo: React.FC<HeaderLogoProps> = ({ className }) => {
  const classes = useStyles();

  return (
    <div
      style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}
      className={className}
    >
      <img src={logo} alt="Logo de Zétécom" className={classes.image} />

      <Typography variant="h1" className={classes.title}>
        Zétécom
      </Typography>

      <div className={classes.subtitleContainer}>
        <Typography
          variant="h2"
          className={clsx(classes.subTitle, classes.subtitleTop)}
        >
          L'information
        </Typography>
        <Typography variant="h2" className={classes.subTitle}>
          avec esprit critique
        </Typography>
      </div>
    </div>
  );
};

export default HeaderLogo;
