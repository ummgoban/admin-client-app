import MarketInfoScreen from '@/screens/MarketInfoScreen';
import OrderHistoryScreen from '@/screens/OrderHistoryScreen';
import OrderDetailScreen from '@/screens/OrderDetailScreen';
import {HomeStackParamList} from '@/types/StackNavigationType';
import {TabBar} from '@components/common';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import MyPageScreen from '@/screens/MyPageScreen';
import MenuManageScreen from '@/screens/MenuManageScreen';
const Tab = createBottomTabNavigator<HomeStackParamList>();

const HomeNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: true}} tabBar={TabBar}>
      <Tab.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Tab.Screen name="MarketInfo" component={MarketInfoScreen} />
      <Tab.Screen name="OrderDetail" component={OrderDetailScreen} />
      <Tab.Screen name="MenuManage" component={MenuManageScreen} />
      <Tab.Screen name="MyPage" component={MyPageScreen} />
      {/* <Tab.Screen name="Favorite" component={FavoriteScreen} /> */}
      {/* Add more screens here */}
    </Tab.Navigator>
  );
};

export default HomeNavigator;
