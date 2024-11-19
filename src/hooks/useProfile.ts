import {useCallback} from 'react';
import {create} from 'zustand';

import {getProfile as getProfileApi} from '@/apis/Login';
import {getMemberMarkets} from '@/apis/Member';

import {UserType} from '@/types/UserType';

type AdminUserType = UserType & {
  marketId: number | null;
};

type ProfileStore = {
  profile: AdminUserType | null;
  getProfile: () => Promise<void>;
  setCurrentMarketId: (marketId: number) => void;
};

const useProfileStore = create<ProfileStore>(set => ({
  profile: null,
  getProfile: async () => {
    const profileRes = await getProfileApi();
    if (!profileRes) {
      return;
    }
    set({profile: {...profileRes, marketId: null}});
  },
  setCurrentMarketId: marketId => {
    set(state => {
      if (!state.profile) {
        return state;
      }
      return {profile: {...state.profile, marketId}};
    });
  },
}));

const useProfile = () => {
  const {profile, getProfile, setCurrentMarketId} = useProfileStore();

  const fetchProfile = useCallback(async () => {
    if (!profile) {
      await getProfile();
    }
    if (!profile?.marketId) {
      const res = await getMemberMarkets();
      if (res && res.length) {
        setCurrentMarketId(res[0].marketId);
      }
    }
  }, [getProfile, profile, setCurrentMarketId]);

  const refresh = useCallback(async () => {
    await getProfile();
  }, [getProfile]);

  const selectMarket = useCallback(
    (marketId: number) => {
      setCurrentMarketId(marketId);
    },
    [setCurrentMarketId],
  );

  return {profile, refresh, fetch: fetchProfile, selectMarket};
};

export default useProfile;
