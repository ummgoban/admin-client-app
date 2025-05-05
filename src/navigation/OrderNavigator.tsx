import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React from 'react';

import HeaderTitle from '@/components/common/Appbar/HeaderTitle';

import OrderDetailScreen from '@/screens/OrderDetailScreen';
import OrderHistoryScreen from '@/screens/OrderHistoryScreen';

import {OrderStackParamList} from '@/types/StackNavigationType';
import {defaultOptions} from '@/components/common/Appbar/AppbarOptions';
const Stack = createStackNavigator<OrderStackParamList>();

const orderScreenOptions: StackNavigationOptions = {
  ...defaultOptions,
  headerTitle: () => <HeaderTitle title="주문 내역" />,
};

const orderDetailScreenOptions: StackNavigationOptions = {
  ...defaultOptions,
  headerTitle: () => <HeaderTitle title="주문 상세" />,
};

const OrderNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={orderScreenOptions}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={orderDetailScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default OrderNavigator;
