<<<<<<< HEAD
import {RootStackParamList} from '@/types/StackNavigationType';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Alert, Text, View} from 'react-native';
import {Button} from 'react-native-paper';

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
=======
import React from 'react';
import {Text, View} from 'react-native';
<<<<<<< HEAD
import TagSelector from '@/components/common/TagSelector';
=======

>>>>>>> b070643 (chore: install deps (#12))
const HomeScreen = () => {
  return (
    <View>
      <Text>{'HomeScreen'}</Text>
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 2bf2560 (chore: install deps)
=======
      <TagSelector />
>>>>>>> ba3ef1b (feat: 태그 드랍다운 컴포넌트 구현)
=======
      <TagSelector />
=======
>>>>>>> b070643 (chore: install deps (#12))
>>>>>>> b5e02ba (chore: install deps (#12))
    </View>
  );
};

export default HomeScreen;
