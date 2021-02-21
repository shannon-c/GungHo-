import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#8B6AFC',
    },
    secondary: {
      main: '#08BFAF',
    },
    warning: {
      main: red[500],
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 8,
      },
    },
  },
});