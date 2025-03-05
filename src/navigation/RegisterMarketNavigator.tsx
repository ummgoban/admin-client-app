import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import RegisterMarketScreen from '@/screens/RegisterMarketScreen';

import {defaultOptions} from '@/components/common/Appbar/AppbarOptions';
import HeaderTitle from '@/components/common/Appbar/HeaderTitle';

import {RootStackParamList} from '@/types/StackNavigationType';

const Stack = createStackNavigator<RootStackParamList>();

const registerMarketScreenOptions: StackNavigationOptions = {
  ...defaultOptions,
  headerTitle: () => <HeaderTitle title="매장 등록" />,
};

const ResgitrationMarketNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RegisterMarket"
        component={RegisterMarketScreen}
        options={registerMarketScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default ResgitrationMarketNavigator;
