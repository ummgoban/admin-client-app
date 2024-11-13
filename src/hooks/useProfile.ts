import {getProfile as getProfileApi} from '@/apis/Login';
import {UserType} from '@/types/UserType';
import {useCallback} from 'react';

import {create} from 'zustand';

type ProfileStore = {
  profile: UserType | null;
  getProfile: () => Promise<void>;
};

const useProfileStore = create<ProfileStore>(set => ({
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

  return {profile, refresh, fetch: getProfile};
};

export default useProfile;
