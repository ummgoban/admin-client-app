import React from 'react';
import RegisterMarketScreen from '@/screens/RegisterMarketScreen';
import {RootStackParamList} from '@/types/StackNavigationType';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator<RootStackParamList>();

const ResgitrationMarketNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RegisterMarket"
        component={RegisterMarketScreen}
        options={{title: '매장 등록'}}
      />
    </Stack.Navigator>
  );
};

export default ResgitrationMarketNavigator;
