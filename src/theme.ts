import { createMuiTheme } from '@material-ui/core';

// https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=90CAF9&secondary.color=607D8B&secondary.text.color=ffffff
export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#c3fdff',
      main: '#90caf9',
      dark: '#5d99c6',
      contrastText: '#000',
    },
    secondary: {
      light: '#8eacbb',
      main: '#607d8b',
      dark: '#34515e',
      contrastText: '#fff',
    },
  },
});
