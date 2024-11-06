import {getProfile} from '@/apis/Login';
import {UserType} from '@/types/UserType';
import {useEffect, useState} from 'react';

const useProfile = () => {
  const [profile, setProfile] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const profileRes = await getProfile();
      setProfile(profileRes);
    };

    fetchProfile();
  }, []);

  return profile;
};

export default useProfile;
