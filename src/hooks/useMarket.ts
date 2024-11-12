import {getMemberMarket} from '@/apis/Member';
import {MarketType} from '@/types/Market';
import {useEffect, useState} from 'react';

const useMarket = () => {
  const [marketList, setMarketList] = useState<
    Pick<MarketType, 'id' | 'name'>[]
  >([]);

  useEffect(() => {
    const fetchMarket = async () => {
      const marketRes = await getMemberMarket();

      console.log(marketRes);
      if (!marketRes) {
        return;
      }
      setMarketList(marketRes.map(({marketId: id, name}) => ({id, name})));
    };

    fetchMarket();
  }, []);

  return marketList;
};

export default useMarket;
