import {getMemberMarket} from '@/apis/Member';
import {MarketType} from '@/types/Market';
import {useCallback, useEffect} from 'react';
import {create} from 'zustand';

type MarketStore = {
  market: Pick<MarketType, 'id' | 'name'>[];

  getMarketMember: () => Promise<void>;
};

const useMarketStore = create<MarketStore>(set => ({
  market: [],
  getMarketMember: async () => {
    const marketRes = await getMemberMarket();
    if (!marketRes) {
      return;
    }
    set({market: marketRes.map(({marketId: id, name}) => ({id, name}))});
  },
}));

const useMarket = () => {
  const {market, getMarketMember} = useMarketStore();

  const refresh = useCallback(async () => {
    await getMarketMember();
  }, [getMarketMember]);

  useEffect(() => {
    getMarketMember();
  }, [getMarketMember]);

  return {market, refresh};
};

export default useMarket;
