import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';

import useMarket from '@/hooks/useMarket';
import useProfile from '@/hooks/useProfile';
import MarketInfoScreen from '@/screens/MarketInfoScreen';
import MenuManageScreen from '@/screens/MenuManageScreen';
import MyPageScreen from '@/screens/MyPageScreen';
import {HomeStackParamList} from '@/types/StackNavigationType';
import {TabBar} from '@components/common';
import OrderNavigator from './OrderNavigator';

const Tab = createBottomTabNavigator<HomeStackParamList>();

const HomeNavigator = () => {
  const {fetch: fetchProfile} = useProfile();
  const {fetch: fetchMarketList, fetchMarket} = useMarket();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    fetchMarketList();
  }, [fetchMarketList]);

  useEffect(() => {
    fetchMarket();
  }, [fetchMarket]);

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
          title: '가게관리',
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
