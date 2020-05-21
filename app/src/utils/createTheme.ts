import '@openfonts/domine_latin';
import '@openfonts/nunito-sans_all';
import primary from '@material-ui/core/colors/amber';
import pink from '@material-ui/core/colors/pink';
import { createMuiTheme, responsiveFontSizes, Theme } from '@material-ui/core/styles';

export const createTheme = (): Theme => {
  const defaultTheme = createMuiTheme({
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
      primary,
      secondary: { main: '#446' },
      highlight: { main: pink[500] },
      border: { main: '#ccc', light: '#ddd', veryLight: '#eee' },
      selected: { main: '#ffeeaa' },
      textLight: { main: '#666666', light: '#999999' },
      textWarning: { main: '#ab6565' },
    },
    typography: {
      fontFamily: [
        '"Nunito Sans"',
        'sans-serif',
      ].join(', '),
    },
  });

  const theme = responsiveFontSizes(defaultTheme);

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
