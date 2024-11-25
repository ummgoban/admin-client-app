import React, {useEffect, useMemo} from 'react';
import './gesture-handler';

import RootProvider from './src/context';
import AppNavigator from './src/navigation';

import useMarket from '@/hooks/useMarket';
import useProfile from '@/hooks/useProfile';
import {RootStackParamList} from '@/types/StackNavigationType';

function getInitialRouteName(
  profile: boolean,
  market: boolean,
): keyof RootStackParamList {
  if (!profile) {
    return 'Register';
  }
  if (!market) {
    return 'RegisterMarketRoot';
  }
  return 'Home';
}

function App(): React.JSX.Element {
  const {profile, fetch: fetchProfile} = useProfile();
  const {market, fetch: fetchMarketList} = useMarket();

  const initialRouteName = useMemo(
    () => getInitialRouteName(Boolean(profile), Boolean(market.length)),
    [profile, market],
  );

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    fetchMarketList();
  }, [fetchMarketList]);

  return (
    <RootProvider>
      <AppNavigator initialRouteName={initialRouteName} />
    </RootProvider>
  );
}

export default App;
