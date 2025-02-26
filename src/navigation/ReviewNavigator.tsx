import ReviewScreen from '@/screens/ReviewScreen/Index';
import ReviewReplyScreen from '@/screens/ReviewReplyScreen/Index';
import {
  ReviewStackParamList,
  RootStackParamList,
} from '@/types/StackNavigationType';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

const Stack = createStackNavigator<ReviewStackParamList>();

const ReviewNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Review" component={ReviewScreen} />
      <Stack.Screen name="ReviewReply" component={ReviewReplyScreen} />
    </Stack.Navigator>
  );
};

export default ReviewNavigator;
