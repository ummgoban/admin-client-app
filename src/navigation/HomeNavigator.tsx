import MarketInfoScreen from '@/screens/MarketInfoScreen';
<<<<<<< HEAD
import OrderHistoryScreen from '@/screens/OrderHistoryScreen';
=======
>>>>>>> b6cdbb1 (feat: 네비게이션 및 타입 작성)
import OrderDetailScreen from '@/screens/OrderDetailScreen';
import {HomeStackParamList} from '@/types/StackNavigationType';
import {TabBar} from '@components/common';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/HomeScreen';
import MyPageScreen from '@screens/MyPageScreen';
import React from 'react';

const Tab = createBottomTabNavigator<HomeStackParamList>();

const HomeNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: true}} tabBar={TabBar}>
      <Tab.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Tab.Screen name="MarketInfo" component={MarketInfoScreen} />
      <Tab.Screen name="OrderDetail" component={OrderDetailScreen} />
      <Tab.Screen name="Feed" component={HomeScreen} />
      <Tab.Screen name="MyPage" component={MyPageScreen} />
      <Tab.Screen name="OrderDetail" component={OrderDetailScreen} />
      {/* <Tab.Screen name="Favorite" component={FavoriteScreen} /> */}
      {/* Add more screens here */}
    </Tab.Navigator>
  );
};

export default HomeNavigator;
