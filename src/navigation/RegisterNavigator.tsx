import LoginScreen from '@/screens/RegisterScreen/LoginScreen';
import SignupScreen from '@/screens/RegisterScreen/SignupScreen';
import {RootStackParamList} from '@/types/StackNavigationType';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

const Stack = createStackNavigator<RootStackParamList>();

const RegistrationNavigaitor = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{title: '로그인'}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignupScreen}
        options={{headerTitle: '회원가입'}}
      />
    </Stack.Navigator>
  );
};

export default RegistrationNavigaitor;
