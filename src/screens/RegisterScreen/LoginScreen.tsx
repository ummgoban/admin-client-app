import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {RootStackParamList} from '@/types/StackNavigationType';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import useProfile from '@/hooks/useProfile';
import S from './LoginScreen.style';

import KakaoLoginButton from '@assets/KakaoLoginButton.svg';
import AppleLoginButton from '@assets/AppleLoginButton.svg';
import NaverLoginButton from '@assets/NaverLoginButton.svg';
import MomChanPickLogo from '@assets/MomChanPickLogo.svg';
const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {profile, login} = useProfile();

  useEffect(() => {
    if (profile) {
      navigation.navigate('Home', {screen: 'Home'});
    }
  }, [profile, navigation]);

  return (
    <S.LoginPageContainer>
      <S.MomChanPickLogoWrapper>
        <MomChanPickLogo width={160} height={160} />
      </S.MomChanPickLogoWrapper>
      <S.LoginButtonContainer>
        <S.LoginButtonWrapper
          onPress={async () => {
            const res = await login('KAKAO');
            if (res) {
              navigation.navigate('Home', {screen: 'Home'});
            }
          }}>
          <KakaoLoginButton />
        </S.LoginButtonWrapper>
        <S.LoginButtonWrapper
          onPress={async () => {
            const res = await login('NAVER');
            if (res) {
              navigation.navigate('Home', {screen: 'Home'});
            }
          }}>
          <NaverLoginButton />
        </S.LoginButtonWrapper>

        {Platform.OS === 'ios' && (
          <S.LoginButtonWrapper
            onPress={async () => {
              const res = await login('APPLE');
              if (res) {
                navigation.navigate('Home', {screen: 'Home'});
              }
            }}>
            <AppleLoginButton />
          </S.LoginButtonWrapper>
        )}
      </S.LoginButtonContainer>
    </S.LoginPageContainer>
  );
};

export default LoginScreen;
