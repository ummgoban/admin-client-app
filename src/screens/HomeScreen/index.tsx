import {RootStackParamList} from '@/types/StackNavigationType';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Alert} from 'react-native';
import {Button} from 'react-native-paper';
import {View, Text} from 'react-native';
//import MenuManageScreen from '../MarketManageScreen';

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View>
      <Text>{'HomeScreen'}</Text>

      {/* TODO: 메뉴 관리 */}
      <Button onPress={() => Alert.alert('메뉴 관리')}>메뉴 관리</Button>
      <Button
        onPress={() => navigation.navigate('Home', {screen: 'MarketInfo'})}>
        가게 관리
      </Button>
      {/* <MenuManageScreen /> */}
    </View>
  );
};

export default HomeScreen;
