import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import EmotionProvider from './EmotionProvider';
import NavigationProvider from './NavigationProvider';
import ReactNativePaperProvider from './ReactNativePaperProvider';
import ReactQueryProvider from './ReactQueryProvider';

const RootProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <SafeAreaProvider>
      <NavigationProvider>
        <ReactQueryProvider>
          <EmotionProvider>
            <ReactNativePaperProvider>{children}</ReactNativePaperProvider>
          </EmotionProvider>
        </ReactQueryProvider>
      </NavigationProvider>
    </SafeAreaProvider>
  );
};

export default RootProvider;
