import createDefaultTheme from '../../utils/createDefaultTheme';

export const createTheme = () => {
  const theme = createDefaultTheme();

  theme.typography.body1 = {
    fontSize: '1rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
    },
  };

  theme.typography.caption = {
    fontSize: '0.7rem',
    color: theme.palette.secondary.light,
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.6rem',
    },
  };

  theme.typography.button = {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.7rem',
    },
  };

  theme.overrides = {
    MuiButton: {
      root: {
        minWidth: 0,
        transition: 'color 200ms ease-in-out',
      },
      text: {
        color: theme.palette.secondary.light,
        padding: 0,
      },
    },
  };

  return theme;
};
