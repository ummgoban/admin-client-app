import {RootStackParamList} from '@/types/StackNavigationType';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HomeNavigator from './HomeNavigator';
import ResgitrationMarketNavigator from './RegisterMarketNavigator';
import RegistrationNavigaitor from './RegisterNavigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View} from 'react-native';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const inset = useSafeAreaInsets();
  return (
    <View style={{paddingBottom: inset.bottom, flex: 1}}>
      <Stack.Navigator
        initialRouteName={'Home'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeNavigator} />
        <Stack.Screen
          name="RegisterMarketRoot"
          component={ResgitrationMarketNavigator}
        />
        <Stack.Screen name="Register" component={RegistrationNavigaitor} />
        {/* Add more screens here */}
      </Stack.Navigator>
    </View>
  );
};

export default AppNavigator;
