import React from 'react';

import { makeStyles, Theme, Typography } from '@material-ui/core';
import clsx from 'clsx';

import logo from './logo.png';

const useStyles = makeStyles<Theme, { small?: boolean }>(({ breakpoints, spacing, palette }) => ({
  image: ({ small }) => ({
    width: small ? 42 : 54,
    marginRight: spacing(6),
    [breakpoints.down('xs')]: {
      width: small ? 36 : 42,
      marginRight: spacing(4),
    },
    [breakpoints.down(360)]: {
      width: 36,
      marginRight: spacing(2),
    },
  }),
  title: ({ small }) => ({
    fontFamily: '"Noticia Text", serif',
    fontWeight: 'bold',
    fontSize: small ? 22 : 28,
    letterSpacing: 3,
    lineHeight: 1,
    color: palette.secondary.main,
    [breakpoints.down('xs')]: {
      fontSize: small ? 18 : 20,
      letterSpacing: 2,
    },
    [breakpoints.down(360)]: {
      fontSize: 16,
      letterSpacing: 1,
    },
  }),
  subtitleContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: spacing(4),
  },
  subTitle: ({ small }) => ({
    color: palette.text.secondary,
    fontSize: small ? 14 : 18,
    lineHeight: 1,
    [breakpoints.down('xs')]: {
      fontSize: small ? 14 : 16,
    },
    [breakpoints.down(360)]: {
      fontSize: 14,
    },
  }),
  subtitleTop: {
    alignSelf: 'flex-end',
  },
}));

type HeaderLogoProps = {
  small?: boolean;
  className?: string;
};

const HeaderLogo: React.FC<HeaderLogoProps> = ({ small, className }) => {
  const classes = useStyles({ small });

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
