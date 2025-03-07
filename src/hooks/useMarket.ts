import {useCallback} from 'react';
import {create} from 'zustand';

import {getMarket as getMarketAPI} from '@/apis/Market';
import {getMemberMarkets as getMemberMarketsAPI} from '@/apis/Member';
import {MarketType} from '@/types/Market';

import useProfile from './useProfile';

type MarketStore = {
  loading: boolean;
  market: Array<Pick<MarketType, 'id' | 'name'> & {role: string}> | null;
  getMemberMarkets: () => Promise<Array<
    Pick<MarketType, 'id' | 'name'> & {role: string}
  > | null>;
  marketInfo: MarketType | null;
  setMarketInfo: (marketInfo: MarketType) => void;
};

const useMarketStore = create<MarketStore>(set => ({
  loading: true,
  market: [],
  marketInfo: null,
  getMemberMarkets: async () => {
    set({loading: true});

    const marketRes = await getMemberMarketsAPI();

    if (!marketRes) {
      set({loading: false});
      return null;
    }
    const ret = marketRes.map(
      ({marketId: id, marketName: name, marketRole: role}) => ({
        id,
        name,
        role,
      }),
    );

    set({market: ret, loading: false});

    return ret;
  },
  setMarketInfo: marketInfo => {
    set({marketInfo: marketInfo});
  },
}));

const useMarket = () => {
  const {market, getMemberMarkets, marketInfo, setMarketInfo, loading} =
    useMarketStore();

  const {profile, selectMarket} = useProfile();

  const fetchMemberMarkets = useCallback(async () => {
    if (!profile) {
      return;
    }

    const res = await getMemberMarkets();

    if (!res || !res.length) {
      return;
    }
    if (!profile.marketId) {
      selectMarket(res[0].id);
    }
  }, [getMemberMarkets, profile, selectMarket]);

  const refresh = useCallback(async () => {
    await getMemberMarkets();
  }, [getMemberMarkets]);

  const fetchMarket = useCallback(async () => {
    if (!profile || !profile?.marketId) {
      return;
    }
    const res = await getMarketAPI(profile.marketId);

    if (!res) {
      return;
    }

    setMarketInfo(res);
  }, [profile, setMarketInfo]);

  return {
    market,
    marketInfo,
    refresh,
    fetch: fetchMemberMarkets,
    fetchMarket,
    loading,
  };
};

export default useMarket;
