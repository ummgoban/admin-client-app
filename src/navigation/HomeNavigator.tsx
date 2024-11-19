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
    <Tab.Navigator tabBar={TabBar}>
      <Tab.Screen
        name="Order"
        component={OrderNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="MarketInfo"
        component={MarketInfoScreen}
        options={{
          title: '매장정보',
        }}
      />
      <Tab.Screen
        name="MenuManage"
        component={MenuManageScreen}
        options={{
          title: '메뉴관리',
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{
          title: '마이페이지',
        }}
      />
      {/* Add more screens here */}
    </Tab.Navigator>
  );
};

export default HomeNavigator;
