import React from 'react';

import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(({ breakpoints, spacing, palette: { textLight } }) => ({
  image: {
    width: 36,
    height: 36,
    opacity: 0.8,
    marginRight: spacing(6),
    [breakpoints.down(360)]: {
      width: 24,
      height: 24,
    },
  },
  title: {
    fontFamily: 'Domine',
    fontSize: 24,
    [breakpoints.down('xs')]: {
      fontSize: 20,
    },
    [breakpoints.down(360)]: {
      fontSize: 16,
    },
  },
  subTitle: {
    color: textLight.main,
    letterSpacing: 4,
    fontSize: 20,
    [breakpoints.down('xs')]: {
      fontSize: 16,
      letterSpacing: 3,
    },
    [breakpoints.down(360)]: {
      fontSize: 14,
      letterSpacing: 2,
    },
  },
}));

type HeaderLogoProps = {
  className?: string;
};

const HeaderLogo: React.FC<HeaderLogoProps> = ({ className }) => {
  const classes = useStyles();

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }} className={className}>

      <img src="/assets/images/logo.png" alt="Logo de Réagir à l'information" className={classes.image} />

      <div>
        <Typography variant="h1" className={classes.title}>
          Réagir à l'information
        </Typography>
        <Typography variant="h2" className={classes.subTitle}>
          Avec esprit critique !
        </Typography>
      </div>

    </div>
  );
};

export default HeaderLogo;
