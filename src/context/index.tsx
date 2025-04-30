import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import EmotionProvider from './EmotionProvider';
import NavigationProvider from './NavigationProvider';
import ReactNativePaperProvider from './ReactNativePaperProvider';
import ReactQueryProvider from './ReactQueryProvider';
import NotificationProvider from './NotificationProvider';

const RootProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <SafeAreaProvider>
      <NavigationProvider>
        <NotificationProvider>
          <ReactQueryProvider>
            <EmotionProvider>
              <ReactNativePaperProvider>{children}</ReactNativePaperProvider>
            </EmotionProvider>
          </ReactQueryProvider>
        </NotificationProvider>
      </NavigationProvider>
    </SafeAreaProvider>
  );
};

export default RootProvider;
