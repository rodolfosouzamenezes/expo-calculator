import { extendTheme } from 'native-base';
import globalTheme from './global';

const theme = extendTheme({
  ...globalTheme,
  colors: {
    primary: {
      800: '#56a405',
      900: '#427e04',
    },
    background: {
      600: '#444444',
      800: '#161719',
      900: '#010101',
    },
    text: {
      900: '#ffffff',
      800: '#a8a8a8',
    },
  },
});

export default { theme }