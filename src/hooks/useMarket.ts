import {getMarket as getMarketAPI} from '@/apis/Market';
import {getMemberMarkets as getMemberMarketsAPI} from '@/apis/Member';
import {MarketType} from '@/types/Market';
import {useCallback} from 'react';
import {create} from 'zustand';
import useProfile from './useProfile';

type MarketStore = {
  market: Pick<MarketType, 'id' | 'name'>[];
  getMemberMarkets: () => Promise<Pick<MarketType, 'id' | 'name'>[] | null>;
  marketInfo: MarketType | null;
  setMarketInfo: (marketInfo: MarketType) => void;
};

const useMarketStore = create<MarketStore>(set => ({
  market: [],
  marketInfo: null,
  getMemberMarkets: async () => {
    const marketRes = await getMemberMarketsAPI();

    if (!marketRes) {
      return null;
    }
    const ret = marketRes.map(({marketId: id, name}) => ({id, name}));
    set({market: ret});

    return ret;
  },
  setMarketInfo: marketInfo => {
    set({marketInfo: marketInfo});
  },
}));

const useMarket = () => {
  const {market, getMemberMarkets, marketInfo, setMarketInfo} =
    useMarketStore();

  const {profile, selectMarket, fetch: fetchProfile} = useProfile();

  const fetchMemberMarkets = useCallback(async () => {
    if (!profile) {
      await fetchProfile();
    }

    const res = await getMemberMarkets();

    if (!res || !res.length) {
      return;
    }

    if (profile && !profile.marketId) {
      selectMarket(res[0].id);
    }
  }, [fetchProfile, getMemberMarkets, profile, selectMarket]);

  const refresh = useCallback(async () => {
    await getMemberMarkets();
  }, [getMemberMarkets]);

  const fetchMarket = useCallback(async () => {
    if (!market || !market.length) {
      await fetchMemberMarkets();
    }

    if (!profile || !profile?.marketId) {
      return;
    }

    const res = await getMarketAPI(profile.marketId);

    if (!res) {
      return;
    }
    setMarketInfo(res);
  }, [fetchMemberMarkets, market, profile, setMarketInfo]);

  return {market, marketInfo, refresh, fetch: fetchMemberMarkets, fetchMarket};
};

export default useMarket;
