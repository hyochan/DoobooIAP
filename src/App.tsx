import React, { useEffect } from 'react';

import RootNavigator from './components/navigation/RootStackNavigator';
import RootProvider from './providers';
import SplashScreen from 'react-native-splash-screen';

function App(): React.ReactElement {
  return <RootNavigator />;
}

function ProviderWrapper(): React.ReactElement {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <RootProvider>
      <App />
    </RootProvider>
  );
}

export default ProviderWrapper;
