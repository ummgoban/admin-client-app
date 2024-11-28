import React, {useEffect} from 'react';
import './gesture-handler';

import RootProvider from './src/context';
import AppNavigator from './src/navigation';
import SplashScreen from 'react-native-splash-screen';
function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
    console.log('Splash screen hide');
  }, []);
  return (
    <RootProvider>
      <AppNavigator />
    </RootProvider>
  );
}

export default App;
