import primary from '@material-ui/core/colors/amber';
import pink from '@material-ui/core/colors/pink';
import { createMuiTheme } from '@material-ui/core/styles';

export const createTheme = () => createMuiTheme({
  palette: {
    primary,
    secondary: { main: '#446' },
    highlight: { main: pink[500] },
  },
});
