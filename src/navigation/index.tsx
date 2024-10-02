import {RootStackParamList} from '@/types/StackNavigationType';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HomeNavigator from './HomeNavigator';
import ResgitrationMarketNavigator from './RegisterMarketNavigator';

// Create a stack navigator
const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeNavigator} />
      <Stack.Screen
        name="RegisterMarketHome"
        component={ResgitrationMarketNavigator}
      />

      {/* Add more screens here */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
