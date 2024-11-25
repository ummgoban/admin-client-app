import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Text} from 'react-native';
import {Button} from 'react-native-paper';

import {RootStackParamList} from '@/types/StackNavigationType';

import S from './EmptyMarket.style';

const EmptyMarket = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <S.Container>
      <Text>{'등록된 매장이 없습니다.'}</Text>
      <Button
        onPress={() => {
          navigation.navigate('RegisterMarketRoot', {
            screen: 'RegisterMarket',
          });
        }}>
        {'매장 등록하러 가기'}
      </Button>
    </S.Container>
  );
};

export default EmptyMarket;
