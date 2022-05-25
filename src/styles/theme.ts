// @packages
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const defaultTheme = {
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
};

export const lightTheme = createTheme({
  ...defaultTheme,
  palette: {
    mode: 'light',
    ...defaultTheme,
  },
});

export const darkTheme = createTheme({
  ...defaultTheme,
  palette: {
    mode: 'dark',
    ...defaultTheme,
  },
});

export default lightTheme;
