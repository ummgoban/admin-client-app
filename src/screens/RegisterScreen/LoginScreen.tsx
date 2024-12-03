import React, {useEffect} from 'react';
import {Platform} from 'react-native';

import {RootStackParamList} from '@/types/StackNavigationType';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import useProfile from '@/hooks/useProfile';
import S from './LoginScreen.style';

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
      <S.LoginButtonContainer>
        <S.LogoImg source={require('../../assets/logo.png')} />
        <S.LoginButtonContainer>
          <S.LoginButtonWrapper>
            <S.KakaoButton
              onPress={async () => {
                const res = await login('KAKAO');
                if (res) {
                  navigation.navigate('Home', {screen: 'Home'});
                }
              }}>
              <S.KakaoButtonText>카카오 로그인 시작하기</S.KakaoButtonText>
            </S.KakaoButton>
          </S.LoginButtonWrapper>
          <S.LoginButtonWrapper>
            <S.NaverButton
              onPress={async () => {
                const res = await login('NAVER');
                if (res) {
                  navigation.navigate('Home', {screen: 'Home'});
                }
              }}>
              <S.NaverButtonText>네이버 로그인 시작하기</S.NaverButtonText>
            </S.NaverButton>
          </S.LoginButtonWrapper>
          {/* iOS 기기에서만 애플 로그인 버튼 표시 */}
          {Platform.OS === 'ios' && (
            <S.LoginButtonWrapper>
              <S.AppleButton
                onPress={async () => {
                  const res = await login('APPLE');
                  if (res) {
                    navigation.navigate('Home', {screen: 'Home'});
                  }
                }}>
                <S.KakaoButtonText>애플 로그인 시작하기</S.KakaoButtonText>
              </S.AppleButton>
            </S.LoginButtonWrapper>
          )}
        </S.LoginButtonContainer>
      </S.LoginButtonContainer>
    </S.LoginPageContainer>
  );
};

export default LoginScreen;
