import { createMuiTheme } from '@material-ui/core';

// https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=9FA8DA&secondary.color=78909C
export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#d1d9ff',
      main: '#9fa8da',
      dark: '#6f79a8',
      contrastText: '#000',
    },
    secondary: {
      light: '#a7c0cd',
      main: '#78909c',
      dark: '#4b636e',
      contrastText: '#fff',
    },
  },
});
