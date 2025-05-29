import React from 'react';

import {StackNavigationOptions} from '@react-navigation/stack';

import ChevronLeft from '@/assets/icons/chevron-left.svg';

import theme from '@/context/theme';

export const defaultOptions: StackNavigationOptions = {
  headerShown: true,
  headerTitleAlign: 'left' as const,
  headerBackTitleVisible: false,
  headerTintColor: theme.colors.dark,

  headerBackImage: ({tintColor}) => (
    <ChevronLeft color={tintColor} width={24} height={24} />
  ),
};
