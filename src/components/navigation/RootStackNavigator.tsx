import React, { ReactElement, useEffect, useState } from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import { Button } from '@dooboo-ui/native';
import FindPw from '../screen/FindPw';
import Main from '../screen/Main';
import { NavigationContainer } from '@react-navigation/native';
import { Platform } from 'react-native';
import SignIn from '../screen/SignIn';
import SignUp from '../screen/SignUp';
import WebView from '../screen/WebView';
import firebase from 'firebase';
import { getString } from '../../../STRINGS';
import { useAppContext } from '../../providers/AppProvider';
import { useThemeContext } from '@dooboo-ui/native-theme';

export type RootStackParamList = {
  default: undefined;
  SignIn: undefined;
  SignUp: undefined;
  FindPw: undefined;
  WebView: {
    uri: string;
  };
  Main: undefined;
};

export type RootStackNavigationProps<
  T extends keyof RootStackParamList = 'default'
> = StackNavigationProp<RootStackParamList, T>;

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator(): ReactElement {
  const { theme } = useThemeContext();
  const {
    resetUser,
    setUser,
    state: { user },
  } = useAppContext();
  const [authInitiated, setAuthInitiated] = useState<boolean>(false);
  const [loggingOut, setLoggingOut] = useState<boolean>(false);

  useEffect(() => {
    if (authInitiated) {
      return;
    }

    setAuthInitiated(true);
    firebase.auth().onAuthStateChanged(function(user) {
      console.log('onAuthStateChanged', user);
      user ? setUser(user) : resetUser();
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTitleStyle: { color: theme.font },
          headerTitle: '',
          headerBackTitle: '',
        }}
      >
        {user && user.emailVerified ? (
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              headerTransparent: true,
              gestureDirection: Platform.select({
                ios: !user ? 'horizontal-inverted' : 'horizontal',
                default: !user ? 'vertical-inverted' : 'vertical',
              }),
              headerRight: (): ReactElement => (
                <Button
                  onPress={async (): Promise<void> => {
                    setLoggingOut(true);
                    await firebase.auth().signOut();
                    setLoggingOut(false);
                  }}
                  containerStyle={{
                    width: 84,
                    height: 44,
                    backgroundColor: theme.background,
                    borderWidth: 1,
                    borderColor: theme.primary,
                    justifyContent: 'center',
                    borderRadius: 10,
                    marginTop: 28,
                    marginRight: 12,
                  }}
                  textStyle={{
                    color: theme.primary,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}
                  isLoading={loggingOut}
                  text={getString('LOGOUT')}
                />
              ),
            }}
          />
        ) : (
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              headerShown: false,
              gestureDirection: Platform.select({
                ios: !user ? 'horizontal-inverted' : 'horizontal',
                default: !user ? 'vertical-inverted' : 'vertical',
              }),
            }}
          />
        )}
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="FindPw" component={FindPw} />
        <Stack.Screen name="WebView" component={WebView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
