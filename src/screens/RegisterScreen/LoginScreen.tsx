import React, {useEffect} from 'react';

import {RootStackParamList} from '@/types/StackNavigationType';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import AppleLogin from '@/components/login/AppleLogin';
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
        {/* <S.Description>
          <S.TitleText>마감 세일 상품을</S.TitleText>
          <S.TitleText>서프라이즈 백으로 만나보세요</S.TitleText>
        </S.Description> */}
        <S.LoginButtonContainer>
          <S.LoginButtonWrapper>
            {/* TODO: 애플 로그인 적용 시 props로 분기 필요 */}
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
          <S.LoginButtonWrapper>
            <S.NaverButton
              onPress={async () => {
                const res = await login('APPLE');
                if (res) {
                  navigation.navigate('Home', {screen: 'Home'});
                }
              }}>
              <S.NaverButtonText>네이버 로그인 시작하기</S.NaverButtonText>
            </S.NaverButton>
          </S.LoginButtonWrapper>
        </S.LoginButtonContainer>
      </S.LoginButtonContainer>
    </S.LoginPageContainer>
  );
};

export default LoginScreen;
