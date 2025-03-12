import {useMarketList} from '@/apis/markets';

const useMemberMarket = () => {
  const {data: markets, isLoading, refetch} = useMarketList();

  const marketList = markets
    ? markets.map(({marketId, marketName, marketRole}) => ({
        id: marketId,
        name: marketName,
        role: marketRole,
      }))
    : [];

  return {
    loading: isLoading,
    marketList,
    getMemberMarkets: refetch,
  };
};

export default useMemberMarket;
