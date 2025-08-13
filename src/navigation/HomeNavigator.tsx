import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';

import HeaderTitle from '@/components/common/Appbar/HeaderTitle';
import {TabBar} from '@components/common';

import MarketInfoScreen from '@/screens/MarketInfoScreen';
import MenuManageScreen from '@/screens/MenuManageScreen';
import MyPageScreen from '@/screens/MyPageScreen';

import {HomeStackParamList} from '@/types/StackNavigationType';

import MenuNavigator from './MenuNavigator';
import OrderNavigator from './OrderNavigator';
import ReviewNavigator from './ReviewNavigator';
import theme from '@/context/theme';

const Tab = createBottomTabNavigator<HomeStackParamList>();

const defaultScreenOptions: BottomTabNavigationOptions = {
  headerShown: true,
  headerTitleAlign: 'left' as const,
  headerTintColor: theme.colors.dark,
};

const orderScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
};

const marketInfoScreenOptions: BottomTabNavigationOptions = {
  ...defaultScreenOptions,
  headerTitle: () => <HeaderTitle title="가게 정보" />,
};

const menuManageScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
};

const reviewScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
};

const myPageScreenOptions: BottomTabNavigationOptions = {
  ...defaultScreenOptions,
  headerTitle: () => <HeaderTitle title="마이페이지" />,
};

const HomeNavigator = () => {
  return (
    <Tab.Navigator tabBar={TabBar}>
      <Tab.Screen
        name="Order"
        component={OrderNavigator}
        options={orderScreenOptions}
      />
      <Tab.Screen
        name="MarketInfo"
        component={MarketInfoScreen}
        options={marketInfoScreenOptions}
      />
      <Tab.Screen
        name="Menu"
        component={MenuNavigator}
        options={menuManageScreenOptions}
      />
      <Tab.Screen
        name="Review"
        component={ReviewNavigator}
        options={reviewScreenOptions}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={myPageScreenOptions}
      />
      {/* Add more screens here */}
    </Tab.Navigator>
  );
};

export default HomeNavigator;
