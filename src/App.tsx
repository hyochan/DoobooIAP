import React, { useEffect } from 'react';

import RootNavigator from './components/navigation/RootStackNavigator';
import RootProvider from './providers';
import SplashScreen from 'react-native-splash-screen';
import { ThemeType } from '@dooboo-ui/native-theme';
import { useDarkMode } from 'react-native-dark-mode';

function App(): React.ReactElement {
  return <RootNavigator />;
}

function ProviderWrapper(): React.ReactElement {
  const isDarkMode = useDarkMode();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <RootProvider
      initialThemeType={
        isDarkMode ? ThemeType.DARK : ThemeType.LIGHT
      }
    >
      <App />
    </RootProvider>
  );
}

export default ProviderWrapper;
