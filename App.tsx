import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

import './gesture-handler';

import RootProvider from './src/context';
import AppNavigator from './src/navigation';

function App(): React.JSX.Element {
  useEffect(() => {
    const initializeSplash = async () => {
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
