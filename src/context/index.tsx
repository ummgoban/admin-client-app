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
      <ReactQueryProvider>
        <NavigationProvider>
          <NotificationProvider>
            <EmotionProvider>
              <ReactNativePaperProvider>{children}</ReactNativePaperProvider>
            </EmotionProvider>
          </NotificationProvider>
        </NavigationProvider>
      </ReactQueryProvider>
    </SafeAreaProvider>
  );
};

export default RootProvider;
