import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';

import useProfile from '@/hooks/useProfile';

import HeaderTitle from '@/components/common/Appbar/HeaderTitle';
import {TabBar} from '@components/common';

import MarketInfoScreen from '@/screens/MarketInfoScreen';
import MenuManageScreen from '@/screens/MenuManageScreen';
import MyPageScreen from '@/screens/MyPageScreen';

import {HomeStackParamList} from '@/types/StackNavigationType';

import OrderNavigator from './OrderNavigator';
import ReviewNavigator from './ReviewNavigator';

const Tab = createBottomTabNavigator<HomeStackParamList>();

const defaultScreenOptions: BottomTabNavigationOptions = {
  headerShown: true,
  headerTitleAlign: 'left' as const,
};

const orderScreenOptions: BottomTabNavigationOptions = {
  ...defaultScreenOptions,
  headerTitle: () => <HeaderTitle title="주문 관리" />,
};

const marketInfoScreenOptions: BottomTabNavigationOptions = {
  ...defaultScreenOptions,
  headerTitle: () => <HeaderTitle title="가게 정보" />,
};

const menuManageScreenOptions: BottomTabNavigationOptions = {
  ...defaultScreenOptions,
  headerTitle: () => <HeaderTitle title="메뉴 관리" />,
};

const reviewScreenOptions: BottomTabNavigationOptions = {
  ...defaultScreenOptions,
  headerTitle: () => <HeaderTitle title="리뷰 관리" />,
};

const myPageScreenOptions: BottomTabNavigationOptions = {
  ...defaultScreenOptions,
  headerTitle: () => <HeaderTitle title="마이페이지" />,
};

const HomeNavigator = () => {
  const {fetch: fetchProfile} = useProfile();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

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
        name="MenuManage"
        component={MenuManageScreen}
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
