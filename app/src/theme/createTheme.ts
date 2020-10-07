import amber from '@material-ui/core/colors/amber';
import blueGrey from '@material-ui/core/colors/blueGrey';
import grey from '@material-ui/core/colors/grey';
import orange from '@material-ui/core/colors/orange';
import { createMuiTheme, Theme } from '@material-ui/core/styles';

import '@openfonts/noticia-text_all/index.css';
import '@openfonts/nunito-sans_all/index.css';

const createTheme = (): Theme => {
  const theme = createMuiTheme({

    spacing: 4,

    // breakpoints: {
    //   values: {
    //     xxs: 0,
    //     xs: 330,
    //     sm: 600,
    //     md: 960,
    //     lg: 1280,
    //     xl: 1920,
    //   },
    // },

    palette: {
      primary: { main: amber[800] },
      secondary: { main: '#446' },
      border: { main: blueGrey[100] },
      selected: { main: amber[200] },
      background: { default: 'white' },
      text: {
        primary: '#222',
        secondary: '#556',
        disabled: grey[500],
        link: '#44C',
        linkFocus: '#55A',
        warning: orange[900],
      },
    },

    typography: {
      fontFamily: [
        '"Nunito Sans"',
        'sans-serif',
      ].join(', '),
    },

  });

  theme.typography.h1 = {
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
    fontSize: '1.75rem',
    fontWeight: 'normal',
  };

  theme.typography.h2 = {
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
    fontSize: '1.25rem',
    fontWeight: 'normal',
  };

  theme.typography.body1 = {
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
    fontSize: '1rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
    },
  };

  theme.typography.body2 = {
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamily,
    fontSize: '1rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
    },
  };

  theme.typography.caption = {
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamily,
    fontSize: '0.7rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.6rem',
    },
  };

  theme.typography.button = {
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.7rem',
    },
  };

  theme.overrides = {
    MuiButton: {
      root: {
        color: theme.palette.text.secondary,
        transition: 'color 200ms ease-in-out',
        '&.Mui-disabled': {
          pointerEvents: 'auto',
        },
      },
    },
    MuiMenuItem: {
      root: {
        [theme.breakpoints.down('xs')]: {
          minHeight: 0,
        },
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: theme.spacing(10),
      },
    },
  };

  return theme;
};

export default createTheme;
