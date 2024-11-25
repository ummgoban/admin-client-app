import React from 'react';
import './gesture-handler';

import RootProvider from './src/context';
import AppNavigator from './src/navigation';

function App(): React.JSX.Element {
  return (
    <RootProvider>
      <AppNavigator />
    </RootProvider>
  );
}

export default App;
