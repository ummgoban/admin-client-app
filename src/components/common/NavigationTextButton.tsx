import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import S from './NavigationTextButton.style';

type NavigationTextButtonProps = {
  text?: string;
  onPress?: () => void;
  fontColor?: string;
  fontSize?: string;
  iconSize?: number;
  isNotice?: boolean;
};

const NavigationTextButton = ({
  text,
  onPress,
  fontColor = '#000',
  fontSize = '16px',
  iconSize = 16,
  isNotice = true,
}: NavigationTextButtonProps) => {
  return (
    <S.TouchableButtonContainer onPress={onPress} disabled={!onPress}>
      <S.TouchableWrapper>
        {text && (
          <S.NoticeText fontColor={fontColor} fontSize={fontSize}>
            {text}
          </S.NoticeText>
        )}
        {isNotice && (
          <Icon name="chevron-thin-right" size={iconSize} color={fontColor} />
        )}
      </S.TouchableWrapper>
    </S.TouchableButtonContainer>
  );
};

export default NavigationTextButton;
