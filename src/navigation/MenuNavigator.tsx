import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import MenuManageScreen from '@/screens/MenuManageScreen';
import DiscountReservationScreen from '@/screens/DiscountReservationScreen';
import {defaultOptions} from '@/components/common/Appbar/AppbarOptions';
import {MenuStackParamList} from '@/types/StackNavigationType';
import HeaderTitle from '@/components/common/Appbar/HeaderTitle';

const Stack = createStackNavigator<MenuStackParamList>();

const menuManageScreenOptions: StackNavigationOptions = {
  ...defaultOptions,
  headerTitle: () => <HeaderTitle title="메뉴 관리" />,
};

const menuDiscountManageScreenOptions: StackNavigationOptions = {
  ...defaultOptions,
  headerTitle: () => <HeaderTitle title="일괄 할인" />,
};

const MenuNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MenuManage"
      screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="MenuManage"
        component={MenuManageScreen}
        options={menuManageScreenOptions}
      />
      <Stack.Screen
        name="DiscountReservation"
        component={DiscountReservationScreen}
        options={menuDiscountManageScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default MenuNavigator;
