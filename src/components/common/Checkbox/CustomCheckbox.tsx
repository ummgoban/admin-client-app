import React from 'react';
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
      <S.TouchWrapper onPress={onPress}>
        {checked && <Icon name="check" size={size} color={color} />}
      </S.TouchWrapper>
    </S.Container>
  );
};

export default CustomCheckbox;
