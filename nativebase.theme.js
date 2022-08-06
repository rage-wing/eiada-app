import {extendTheme} from 'native-base';

const theme = extendTheme({
  colors: {
    primary: {
      50: '#fff6f6',
      100: '#eef6f6',
      200: '#cde3e4',
      300: '#acd0d2',
      400: '#8bbdc0',
      500: '#6aaaae',
      600: '#519095',
      700: '#3f7074',
      800: '#2d5053',
      900: '#1b3032',
    },
    secondary: {
      50: '#fffce9',
      100: '#fafce9',
      200: '#f1f5bd',
      300: '#e8ee90',
      400: '#dfe864',
      500: '#d6e138',
      600: '#bdc71e',
      700: '#939b17',
      800: '#696f11',
      900: '#3f420a',
    },
    state: {
      success: {
        light: '#e6fffa',
        dark: '#00b894',
      },
      error: {
        light: '#fdd0d0',
        dark: '#e53e3e',
      },
      warning: {
        light: '#fff5db',
        dark: '#ffb300',
      },
      info: {
        light: '#dbe6f6',
        dark: '#00b0ff',
      },
    },
  },
  config: {
    useSystemColorMode: false,
    initialColorMode: 'light',
  },
});

export default theme;
