import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import S from './SquareCheckbox.style';

type SquareCheckboxProps = {
  checked: boolean;
  onPress: () => void;
  size?: number;
  color?: string;
};

const SquareCheckbox = ({
  checked,
  onPress,
  size = 18,
  color = 'black',
}: SquareCheckboxProps) => {
  return (
    <S.Container>
      <S.TouchWrapper onPress={onPress}>
        {checked && <Icon name="check" size={size} color={color} />}
      </S.TouchWrapper>
    </S.Container>
  );
};

export default SquareCheckbox;
