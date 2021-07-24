import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import Home from '../pages/Home';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useTheme} from 'dooboo-ui';

export type RootStackParamList = {
  Home: undefined;
};

export type RootStackNavigationProps<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

const Stack = createStackNavigator<RootStackParamList>();

function RootStack(): React.ReactElement {
  const {theme, themeType} = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTitleStyle: {color: theme.text},
          headerTintColor: theme.primary,
        }}
        headerMode={themeType === 'dark' ? 'screen' : 'float'}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
