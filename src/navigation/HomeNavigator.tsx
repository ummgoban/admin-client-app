<<<<<<< HEAD
<<<<<<< HEAD
import MarketInfoScreen from '@/screens/MarketInfoScreen';
import {HomeStackParamList} from '@/types/StackNavigationType';
import {TabBar} from '@components/common';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/HomeScreen';
import MyPageScreen from '@screens/MyPageScreen';
import React from 'react';
=======
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
=======
import MarketInfoScreen from '@/screens/MarketInfoScreen';
import {HomeStackParamList} from '@/types/StackNavigationType';
>>>>>>> d2fbfb4 (feat: 가게 상세 편집 페이지 제작합니다. (#13))
import {TabBar} from '@components/common';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/HomeScreen';
import MyPageScreen from '@screens/MyPageScreen';
<<<<<<< HEAD
import {HomeStackParamList} from '@/types/StackNavigationType';
>>>>>>> 2bf2560 (chore: install deps)
=======
import React from 'react';
>>>>>>> d2fbfb4 (feat: 가게 상세 편집 페이지 제작합니다. (#13))

const Tab = createBottomTabNavigator<HomeStackParamList>();

const HomeNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: true}} tabBar={TabBar}>
      <Tab.Screen name="Feed" component={HomeScreen} />
<<<<<<< HEAD
<<<<<<< HEAD
      <Tab.Screen name="MarketInfo" component={MarketInfoScreen} />
=======
>>>>>>> 2bf2560 (chore: install deps)
=======
      <Tab.Screen name="MarketInfo" component={MarketInfoScreen} />
>>>>>>> d2fbfb4 (feat: 가게 상세 편집 페이지 제작합니다. (#13))
      <Tab.Screen name="MyPage" component={MyPageScreen} />
      {/* <Tab.Screen name="Favorite" component={FavoriteScreen} /> */}
      {/* Add more screens here */}
    </Tab.Navigator>
  );
};

export default HomeNavigator;
