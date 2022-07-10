import {extendTheme} from 'native-base';

const theme = extendTheme({
  colors: {
    primary: {
      50: '#eef6f6',
      100: '#cde3e4',
      200: '#acd0d2',
      300: '#8bbdc0',
      400: '#6aaaae',
      500: '#519095',
      600: '#3f7074',
      700: '#2d5053',
      800: '#1b3032',
      900: '#091011',
    },
    secondary: {
      50: '#fafce9',
      100: '#f1f5bd',
      200: '#e8ee90',
      300: '#dfe864',
      400: '#d6e138',
      500: '#bdc71e',
      600: '#939b17',
      700: '#696f11',
      800: '#3f420a',
      900: '#151603',
    },
  },
  config: {
    useSystemColorMode: false,
    initialColorMode: 'light',
  },
});

export default theme;
