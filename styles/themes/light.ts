import { extendTheme } from 'native-base';
import globalTheme from './global';

const theme = extendTheme({
  ...globalTheme,
  colors: {
    background: {
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