import { NativeBaseProvider, StatusBar } from 'native-base';
import { useColorScheme } from 'react-native';
import { Calculator } from './src/screens/Calculator';
import themes from './styles/themes';

export default function App() {
  const deviceTheme = useColorScheme();
  const theme = deviceTheme === 'light' ? themes.light.theme : themes.dark.theme;

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />

      <Calculator />
    </NativeBaseProvider>
  );
}
