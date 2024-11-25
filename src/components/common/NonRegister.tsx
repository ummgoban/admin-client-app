import React from 'react';
import {RootStackParamList} from '@/types/StackNavigationType';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text} from 'react-native';
import {Button} from 'react-native-paper';

import S from './EmptyMarket.style';

const NonRegister = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <S.Container>
      <Text>{'회원이 아니신가요?'}</Text>
      <Button
        onPress={() => {
          navigation.navigate('Register', {
            screen: 'Login',
          });
        }}>
        {'회원가입 및 로그인 하러   가기'}
      </Button>
    </S.Container>
  );
};

export default NonRegister;
