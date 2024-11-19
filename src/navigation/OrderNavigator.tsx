import OrderDetailScreen from '@/screens/OrderDetailScreen';
import OrderHistoryScreen from '@/screens/OrderHistoryScreen';
import {OrderStackParamList} from '@/types/StackNavigationType';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

const Stack = createStackNavigator<OrderStackParamList>();

const OrderNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Order">
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{title: '주문 내역'}}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={{title: '주문 상세'}}
      />
    </Stack.Navigator>
  );
};

export default OrderNavigator;
