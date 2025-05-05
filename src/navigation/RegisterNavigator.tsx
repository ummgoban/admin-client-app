import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React from 'react';

import LoginScreen from '@/screens/RegisterScreen/LoginScreen';
import SignupScreen from '@/screens/RegisterScreen/SignupScreen';

import HeaderTitle from '@/components/common/Appbar/HeaderTitle';

import {RootStackParamList} from '@/types/StackNavigationType';

import {defaultOptions} from '@/components/common/Appbar/AppbarOptions';

const Stack = createStackNavigator<RootStackParamList>();

const loginScreenOptions: StackNavigationOptions = {
  ...defaultOptions,
  headerTitle: () => <HeaderTitle title="로그인" />,
};

const signupScreenOptions: StackNavigationOptions = {
  ...defaultOptions,
  headerTitle: () => <HeaderTitle title="회원가입" />,
};

const RegistrationNavigaitor = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={loginScreenOptions}
      />
      <Stack.Screen
        name="SignUp"
        component={SignupScreen}
        options={signupScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default RegistrationNavigaitor;
