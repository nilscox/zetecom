import '@openfonts/domine_latin';
import '@openfonts/nunito-sans_all';
import primary from '@material-ui/core/colors/amber';
import pink from '@material-ui/core/colors/pink';
import { createMuiTheme, responsiveFontSizes, Theme } from '@material-ui/core/styles';

const createDefaultTheme = (): Theme => {
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
      background: { default: 'white' },
    },

    typography: {
      fontFamily: [
        '"Nunito Sans"',
        'sans-serif',
      ].join(', '),
    },

  });

  return responsiveFontSizes(defaultTheme);
};

export default createDefaultTheme;
