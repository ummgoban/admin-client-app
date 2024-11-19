import MarketInfoScreen from '@/screens/MarketInfoScreen';
import MenuManageScreen from '@/screens/MenuManageScreen';
import MyPageScreen from '@/screens/MyPageScreen';
import {HomeStackParamList} from '@/types/StackNavigationType';
import {TabBar} from '@components/common';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import OrderNavigator from './OrderNavigator';

const Tab = createBottomTabNavigator<HomeStackParamList>();

const HomeNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: true}} tabBar={TabBar}>
      <Tab.Screen name="Order" component={OrderNavigator} />
      <Tab.Screen name="MarketInfo" component={MarketInfoScreen} />
      <Tab.Screen name="MenuManage" component={MenuManageScreen} />
      <Tab.Screen name="MyPage" component={MyPageScreen} />
      {/* Add more screens here */}
    </Tab.Navigator>
  );
};

export default HomeNavigator;
