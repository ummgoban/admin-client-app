import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React from 'react';
import {MyPageStackParamList} from '@/types/StackNavigationType';
import HeaderTitle from '@/components/common/Appbar/HeaderTitle';

import MyPageScreen from '@/screens/MyPageScreen';
import {defaultScreenOptions} from '.';

const Stack = createStackNavigator<MyPageStackParamList>();

const myPageScreenOptions: StackNavigationOptions = {
  ...defaultScreenOptions,
  headerTitle: () => <HeaderTitle title="마이페이지" />,
};

const MyPageNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyPageRoot"
      screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="MyPage"
        component={MyPageScreen}
        options={myPageScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default MyPageNavigator;
