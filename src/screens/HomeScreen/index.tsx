import {RootStackParamList} from '@/types/StackNavigationType';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button} from 'react-native-paper';
import React from 'react';
import {View} from 'react-native';

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View>
      <Button
        onPress={() => navigation.navigate('Home', {screen: 'MarketInfo'})}>
        가게 관리
      </Button>
    </View>
  );
};

export default HomeScreen;
