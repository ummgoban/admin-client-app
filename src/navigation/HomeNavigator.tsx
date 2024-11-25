import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect} from 'react';

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

const Tab = createBottomTabNavigator<HomeStackParamList>();

const HomeNavigator = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {profile, fetch: fetchProfile, loading} = useProfile();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (!profile && !loading) {
      navigation.replace('Register', {screen: 'Login'});
    }
  }, [loading, navigation, profile]);

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
