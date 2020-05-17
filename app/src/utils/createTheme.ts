import primary from '@material-ui/core/colors/amber';
import pink from '@material-ui/core/colors/pink';
import { createMuiTheme, responsiveFontSizes, Theme } from '@material-ui/core/styles';

export const createTheme = (): Theme => {
  const defaultTheme = createMuiTheme({
    spacing: 4,
    palette: {
      primary,
      secondary: { main: '#446' },
      highlight: { main: pink[500] },
      border: { main: '#ccc', light: '#ddd' },
    },
    typography: {
      fontFamily: [
        'Nunito Sans',
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

  theme.typography.body2 = {
    fontSize: '1rem',
    fontWeight: 'bold',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
    },
  };

  theme.typography.caption = {
    fontSize: '0.8rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.6rem',
    },
  };

  return theme;
};
