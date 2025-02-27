import ReviewScreen from '@/screens/ReviewScreen';
import ReviewReplyScreen from '@/screens/ReviewReplyScreen';
import {ReviewStackParamList} from '@/types/StackNavigationType';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

const Stack = createStackNavigator<ReviewStackParamList>();

const ReviewNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Review"
      screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="Review"
        component={ReviewScreen}
        options={{title: '리뷰 관리'}}
      />
      <Stack.Screen
        name="ReviewReply"
        component={ReviewReplyScreen}
        options={{title: '댓글 달기'}}
      />
    </Stack.Navigator>
  );
};

export default ReviewNavigator;
