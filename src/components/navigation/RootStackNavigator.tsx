import React, { ReactElement, useEffect } from 'react';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';

import Main from '../screen/Main';
import { NavigationContainer } from '@react-navigation/native';
import SignIn from '../screen/SignIn';
import { useThemeContext } from '@dooboo-ui/native-theme';

export type RootStackParamList = {
  default: undefined;
  SignIn: undefined;
  Main: {
    userId: string;
  };
}

export type RootStackNavigationProps<
  T extends keyof RootStackParamList = 'default'
> = StackNavigationProp<RootStackParamList, T>;

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator(): React.ReactElement {
  const { theme } = useThemeContext();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTitleStyle: { color: theme.fontColor },
          headerTitle: '',
          headerBackTitle: '',
        }}
      >
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
