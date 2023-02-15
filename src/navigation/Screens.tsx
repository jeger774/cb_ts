import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Auctions, Charts, Settings } from '../screens';
import { useScreenOptions } from '../hooks';

const Stack = createStackNavigator();

export default () => {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions.stack}>
      <Stack.Screen
        name="Auctions"
        component={Auctions}
        options={{ title: 'Auctions' }}
      />

      <Stack.Screen
        name="Charts"
        component={Charts}
        options={{ title: 'Charts' }}
      />

      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
