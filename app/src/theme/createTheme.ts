import amber from '@material-ui/core/colors/amber';
import pink from '@material-ui/core/colors/pink';
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
      highlight: { main: pink[500] },
      border: { main: '#ccc', light: '#ddd', veryLight: '#eee' },
      selected: { main: '#ffeeaa' },
      textLight: { main: '#666666', light: '#999999' },
      textLink: { main: '#44C', light: '#55A', dark: '#446' },
      textWarning: { main: '#ee7700' },
      background: { default: 'white' },
      success: { main: '#81c784', light: '#a4d7a6' },
      warning: { main: '#decb81', light: '#e0d194' },
      error: { main: '#de8c5d', light: '#e3ae8f' },
    },

    typography: {
      fontFamily: [
        '"Nunito Sans"',
        'sans-serif',
      ].join(', '),
    },

  });

  theme.typography.h1.fontSize = '1.75rem';
  theme.typography.h2.fontSize = '1rem';

  theme.typography.h3.fontSize = '1.25rem';
  theme.typography.h3.fontWeight = 'bold';
  theme.typography.h3.color = theme.palette.textLight.main;
  theme.typography.h3.margin = theme.spacing(2, 0);

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
