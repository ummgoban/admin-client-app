import styled from '@emotion/native';

const LoginPageContainer = styled.View`
  flex: 1;
  background-color: white;
`;

const LogoImg = styled.Image`
  margin-top: 100px;
  width: 82px;
  height: 102px;
`;
const LoginButton = styled.TouchableOpacity``;

const TitleText = styled.Text`
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
`;

const Description = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 234px;
  height: 57px;
  gap: 5px;
`;

const LoginButtonContainer = styled.View`
margin-top: 24px;
  display: flex;
  align-items: center;
  gap: 15px;
  marign: 45px;
  width: 300px
  height: 200px;
`;

const LoginButtonWrapper = styled.View`
  display: flex;
  width: 300px;
  height: 55px;
  align-items: center;
  justify-content: center;
`;

const OauthLoginButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;

const KakaoButton = styled(OauthLoginButton)`
  background-color: #fee500;
`;

const NaverButton = styled(OauthLoginButton)`
  background-color: #03c75a;
`;
const AppleButton = styled(OauthLoginButton)`
  background-color: #e2e2e2;
`;
const OauthLoginButtonText = styled.Text`
  font-size: 16px;
`;

const KakaoButtonText = styled(OauthLoginButtonText)`
  color: #000;
`;
const NaverButtonText = styled(OauthLoginButtonText)`
  color: #fff;
`;

const S = {
  LoginButtonContainer,
  LoginButtonWrapper,
  KakaoButton,
  NaverButton,
  NaverButtonText,
  KakaoButtonText,
  Description,
  TitleText,
  LogoImg,
  LoginButton,
  LoginPageContainer,
  AppleButton,
};

export default S;
