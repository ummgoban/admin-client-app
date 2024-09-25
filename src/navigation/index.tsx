import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/StackNavigationType';
import HomeNavigator from './HomeNavigator';

// Create a stack navigator
const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeNavigator} />
      {/* Add more screens here */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
