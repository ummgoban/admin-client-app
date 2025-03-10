import {useCallback} from 'react';
import {useEffect, useState} from 'react';
import useProfile from './useProfile';
import useMemberMarket from './useMemberMarket';
import {useGetMarket} from '@/apis/markets';

const useMarket = () => {
  const {
    marketList,
    getMemberMarkets,
    loading: isMarketListLoading,
  } = useMemberMarket();
  const {profile, selectMarket} = useProfile();

  const {
    data: marketDetail,
    isLoading: isMarketDetailLoading,
    refetch: refetchMarket,
  } = useGetMarket(profile?.marketId);
  const loading = isMarketListLoading || isMarketDetailLoading;

  const fetchMarket = useCallback(async () => {
    if (!profile || !profile?.marketId || !marketDetail) {
      return;
    }
    refetchMarket();
  }, [profile, refetchMarket, marketDetail]);

  useEffect(() => {
    if (profile && marketList && marketList.length > 0 && !profile.marketId) {
      selectMarket(marketList[0].id);
      refetchMarket();
    }
  }, [profile, marketList, selectMarket, refetchMarket]);

  return {
    marketList,
    marketInfo: marketDetail,
    refresh: getMemberMarkets,
    fetchMarket,
    loading,
  };
};

export default useMarket;
