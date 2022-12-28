import { extendTheme } from 'native-base';
import globalTheme from './global';

const theme = extendTheme({
  ...globalTheme,
  primary: {
    800: '#56a405',
    900: '#427e04',
  },
  colors: {
    background: {
      600: '#c7c7c7',
      800: '#f8f8f8',
      900: '#fcfcfc',
    },
    text: {
      900: '#515151',
      800: '#a8a8a8',
    },
  },
});

export default { theme }