import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#78d851',
      dark: '#007600',
      main: '#41a61d',
      contrastText: 'white',
    },
    secondary:{
      light: '#f75d46',
      main: '#e4472f',
      dark: '#bf2f19',
      contrastText: 'white',
    },
    background: {
      default: '#f9f9f9',
    }
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
  }
});

export default theme;