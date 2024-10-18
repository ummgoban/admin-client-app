import React from 'react';
import {Text} from 'react-native';
import {MenuType} from '@/types/MenuType';
import S from './Menu.style';
type Props = {
  menu: MenuType;
  onEdit: () => void;
  onIncreaseStock: () => void;
  onDecreaseStock: () => void;
};
const Menu = ({menu, onEdit, onIncreaseStock, onDecreaseStock}: Props) => {
  return (
    <S.MenuWrapper>
      <S.MenuImage source={{uri: menu.image}} />
      <S.MenuInfoWrapper>
        <S.MenuNameText>{menu.name}</S.MenuNameText>
        <S.DicountInfoWrapper>
          <S.DiscountRateText>{menu.discountRate} %</S.DiscountRateText>
          <S.DiscountPriceText>
            {menu.originalPrice.toLocaleString()}원
          </S.DiscountPriceText>
        </S.DicountInfoWrapper>
        <S.CurrentInfoWrapper>
          <Text>{menu.discountPrice.toLocaleString()}원</Text>
          <S.CurrentStatusText>{menu.status}</S.CurrentStatusText>
        </S.CurrentInfoWrapper>
        <S.CurrentInfoWrapper>
          <S.MenuCounter>
            <S.MenuCounterButtonWrapper onPress={onDecreaseStock}>
              <S.MenuCounterButton>-</S.MenuCounterButton>
            </S.MenuCounterButtonWrapper>
            <S.MenuCounterButton>{menu.stock} 개</S.MenuCounterButton>
            <S.MenuCounterButtonWrapper>
              <S.MenuCounterButton onPress={onIncreaseStock}>
                +
              </S.MenuCounterButton>
            </S.MenuCounterButtonWrapper>
          </S.MenuCounter>
        </S.CurrentInfoWrapper>
      </S.MenuInfoWrapper>

      <S.ModifyButtonWrapper onPress={onEdit}>
        <S.ModifyButtonText>수정</S.ModifyButtonText>
      </S.ModifyButtonWrapper>
    </S.MenuWrapper>
  );
};
export default Menu;
