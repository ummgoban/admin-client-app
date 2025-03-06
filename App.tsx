import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

import './gesture-handler';

import RootProvider from './src/context';
import AppNavigator from './src/navigation';

import {
  requestNotificationPermission,
  setUpPushNotificationHandlers,
} from './src/utils/notification';

function App(): React.JSX.Element {
  useEffect(() => {
    const initializeSplash = async () => {
      await requestNotificationPermission();
      setUpPushNotificationHandlers();
      SplashScreen.hide();
    };
    initializeSplash();
  }, []);

  return (
    <RootProvider>
      <AppNavigator />
    </RootProvider>
  );
}

export default App;
