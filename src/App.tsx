import 'firebase/firestore';
import 'firebase/auth';

import React, { useEffect } from 'react';

import Config from 'react-native-config';
import RootNavigator from './components/navigation/RootStackNavigator';
import RootProvider from './providers';
import SplashScreen from 'react-native-splash-screen';
import { ThemeType } from '@dooboo-ui/native-theme';
import firebase from 'firebase';
import { useDarkMode } from 'react-native-dark-mode';

const {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
} = Config;

const firebaseConfig = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};
!firebase.apps.length
  ? firebase.initializeApp(firebaseConfig).firestore()
  : firebase.app().firestore();

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
      initialThemeType={isDarkMode ? ThemeType.DARK : ThemeType.LIGHT}
    >
      <App />
    </RootProvider>
  );
}

export default ProviderWrapper;
