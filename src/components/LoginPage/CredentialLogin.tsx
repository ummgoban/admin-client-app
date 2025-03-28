import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Alert} from 'react-native';

import TextInput from '../common/TextInput/TextInput';

import useProfile from '@/hooks/useProfile';

import {RootStackParamList} from '@/types/StackNavigationType';

import S from './CredentialLogin.style';

const CredentialLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {login} = useProfile();

  return (
    <S.LoginFormWrapper>
      <TextInput
        placeholder={'아이디'}
        value={email}
        onChange={e => setEmail(e.nativeEvent.text)}
      />
      <TextInput
        placeholder={'비밀번호'}
        value={password}
        onChange={e => setPassword(e.nativeEvent.text)}
        secureTextEntry
      />
      <S.SubmitButton
        mode="contained"
        disabled={!email || !password}
        onPress={() => {
          login(
            {email, password},
            {
              onSuccess: () => {
                navigation.navigate('Home', {screen: 'MyPage'});
              },
              onError: error => {
                Alert.alert('로그인에 실패했습니다.', error.errorMessage);
              },
            },
          );
        }}>
        로그인
      </S.SubmitButton>
      <S.SignUpButton
        mode="text"
        onPress={() => {
          navigation.navigate('Register', {screen: 'SignUp'});
        }}>
        회원가입
      </S.SignUpButton>
      <S.HorizontalLine />
    </S.LoginFormWrapper>
  );
};

export default CredentialLogin;
