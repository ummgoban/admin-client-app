import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import './gesture-handler';

import RootProvider from './src/context';
import AppNavigator from './src/navigation';
import SplashScreen from 'react-native-splash-screen';
import {
  setUpPushNotificationHandlers,
  requestNotificationPermission,
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
