import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import RegisterMarketScreen from '@/screens/RegisterMarketScreen';
import RegisterManagerScreen from '@/screens/RegisterManagerScreen';

import HeaderTitle from '@/components/common/Appbar/HeaderTitle';

import {RootStackParamList} from '@/types/StackNavigationType';
import {defaultOptions} from '@/components/common/Appbar/AppbarOptions';

const Stack = createStackNavigator<RootStackParamList>();

const registerMarketScreenOptions: StackNavigationOptions = {
  ...defaultOptions,
  headerTitle: () => <HeaderTitle title="매장 등록" />,
};
const registerManagerScreenOptions: StackNavigationOptions = {
  ...defaultOptions,
  headerTitle: () => <HeaderTitle title="직원 인증" />,
};

const ResgitrationMarketNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RegisterMarket"
        component={RegisterMarketScreen}
        options={registerMarketScreenOptions}
      />
      <Stack.Screen
        name="RegisterManager"
        component={RegisterManagerScreen}
        options={registerManagerScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default ResgitrationMarketNavigator;
