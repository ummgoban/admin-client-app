import React from 'react';
import EmotionProvider from './EmotionProvider';
import NavigationProvider from './NavigationProvider';
import ReactNativePaperProvider from './ReactNativePaperProvider';
import ReactQueryProvider from './ReactQueryProvider';

const RootProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <NavigationProvider>
      <ReactQueryProvider>
        <EmotionProvider>
          <ReactNativePaperProvider>{children}</ReactNativePaperProvider>
        </EmotionProvider>
      </ReactQueryProvider>
    </NavigationProvider>
  );
};

export default RootProvider;
