import DropDownSelectorComponent from '@/components/common/DropDown';
import {RootStackParamList} from '@/types/StackNavigationType';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Button} from 'react-native-paper';
import MenuManageScreen from '../MenuManageScreen';
import {View} from 'react-native';

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View>
      <DropDownSelectorComponent />
      <MenuManageScreen />
      <Button
        onPress={() => navigation.navigate('Home', {screen: 'MarketInfo'})}>
        가게 관리
      </Button>
    </View>
  );
};

export default HomeScreen;
