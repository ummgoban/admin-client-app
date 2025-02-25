import ReviewScreen from '@/screens/ReviewScreen/Index';
import {RootStackParamList} from '@/types/StackNavigationType';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

const Stack = createStackNavigator<RootStackParamList>();

const ReviewNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Review"
        component={ReviewScreen}
        options={{title: '리뷰 관리'}}
      />
      {/* <Stack.Screen
        name="SignUp"
        component={SignupScreen}
        options={{headerTitle: '회원가입'}}
      /> */}
    </Stack.Navigator>
  );
};

export default ReviewNavigator;
