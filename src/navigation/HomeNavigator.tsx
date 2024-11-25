import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect} from 'react';

import useMarket from '@/hooks/useMarket';
import useProfile from '@/hooks/useProfile';
import MarketInfoScreen from '@/screens/MarketInfoScreen';
import MenuManageScreen from '@/screens/MenuManageScreen';
import MyPageScreen from '@/screens/MyPageScreen';
import {
  HomeStackParamList,
  RootStackParamList,
} from '@/types/StackNavigationType';
import {TabBar} from '@components/common';
import OrderNavigator from './OrderNavigator';

function getInitialRouteName(
  profile: boolean,
  market: boolean,
): keyof RootStackParamList {
  if (!profile) {
    return 'Register';
  }
  if (!market) {
    return 'RegisterMarketRoot';
  }
  return 'Home';
}

const Tab = createBottomTabNavigator<HomeStackParamList>();

const HomeNavigator = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {profile, fetch: fetchProfile} = useProfile();
  const {market, fetch: fetchMarketList} = useMarket();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    fetchMarketList();
  }, [fetchMarketList]);

  useEffect(() => {
    const initialRouteName = getInitialRouteName(
      Boolean(profile),
      Boolean(market.length),
    );

    if (initialRouteName === 'Register') {
      navigation.navigate(initialRouteName, {screen: 'Login'});
    } else if (initialRouteName === 'RegisterMarketRoot') {
      navigation.navigate(initialRouteName, {screen: 'RegisterMarket'});
    }
  }, [market.length, navigation, profile]);

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
