import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import S from './CustomCheckbox.style';

type CustomCheckboxProps = {
  checked: boolean;
  onPress: () => void;
  size?: number;
  color?: string;
};

const CustomCheckbox = ({
  checked,
  onPress,
  size = 18,
  color = 'black',
}: CustomCheckboxProps) => {
  return (
    <S.Container>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        {checked && <Icon name="check" size={size} color={color} />}
      </TouchableOpacity>
    </S.Container>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomCheckbox;
