import {getProfile as getProfileApi} from '@/apis/Login';
import {UserType} from '@/types/UserType';
import {useCallback, useEffect} from 'react';

import {create} from 'zustand';

type MarketStore = {
  profile: UserType | null;
  getProfile: () => Promise<void>;
};

const useProfileStore = create<MarketStore>(set => ({
  profile: null,
  getProfile: async () => {
    const profileRes = await getProfileApi();
    set({profile: profileRes});
  },
}));

const useProfile = () => {
  const {profile, getProfile} = useProfileStore();
  const refresh = useCallback(async () => {
    await getProfile();
  }, [getProfile]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return {profile, refresh};
};

export default useProfile;
