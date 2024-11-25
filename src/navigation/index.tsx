import {RootStackParamList} from '@/types/StackNavigationType';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HomeNavigator from './HomeNavigator';
import ResgitrationMarketNavigator from './RegisterMarketNavigator';
import RegistrationNavigaitor from './RegisterNavigator';

type AppNavigatorProps = {
  initialRouteName?: keyof RootStackParamList;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = ({initialRouteName}: AppNavigatorProps) => {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName as string | undefined}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeNavigator} />
      <Stack.Screen
        name="RegisterMarketRoot"
        component={ResgitrationMarketNavigator}
      />
      <Stack.Screen name="Register" component={RegistrationNavigaitor} />
      {/* Add more screens here */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
