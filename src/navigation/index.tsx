import {RootStackParamList} from '@/types/StackNavigationType';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React from 'react';
import HomeNavigator from './HomeNavigator';
import ResgitrationMarketNavigator from './RegisterMarketNavigator';
import RegistrationNavigaitor from './RegisterNavigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, StyleSheet} from 'react-native';
import MyPageNavigator from './MypageNavigator';
import {defaultOptions} from '@/components/common/Appbar/AppbarOptions';
import theme from '@/context/theme';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const inset = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        {paddingBottom: inset.bottom, backgroundColor: 'white'},
      ]}>
      <Stack.Navigator
        initialRouteName={'Home'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeNavigator} />
        <Stack.Screen
          name="RegisterMarketRoot"
          component={ResgitrationMarketNavigator}
        />
        <Stack.Screen name="Register" component={RegistrationNavigaitor} />
        <Stack.Screen name="MyPageRoot" component={MyPageNavigator} />
        {/* Add more screens here */}
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppNavigator;
