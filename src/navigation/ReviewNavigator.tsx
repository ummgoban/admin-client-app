import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import ReviewScreen from '@/screens/ReviewScreen';
import ReviewReplyScreen from '@/screens/ReviewReplyScreen';

import HeaderTitle from '@/components/common/Appbar/HeaderTitle';

import {ReviewStackParamList} from '@/types/StackNavigationType';
import {defaultScreenOptions} from '.';

const Stack = createStackNavigator<ReviewStackParamList>();

const reviewScreenOptions: StackNavigationOptions = {
  ...defaultScreenOptions,
  headerTitle: () => <HeaderTitle title="리뷰 관리" />,
};

const reviewReplyScreenOptions: StackNavigationOptions = {
  ...defaultScreenOptions,
  headerTitle: () => <HeaderTitle title="댓글 달기" />,
};

const ReviewNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ReviewManagement"
      screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="ReviewManagement"
        component={ReviewScreen}
        options={reviewScreenOptions}
      />
      <Stack.Screen
        name="ReviewReply"
        component={ReviewReplyScreen}
        options={reviewReplyScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default ReviewNavigator;
