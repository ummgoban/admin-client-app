import React from 'react';

import {MenuType} from '@/types/ProductType';

import S from './Menu.style';
type Props = {
  menu: MenuType;
  onEdit: () => void;
  onIncreaseStock: () => void;
  onDecreaseStock: () => void;
};
const statusMap: Record<MenuType['productStatus'], string> = {
  IN_STOCK: '판매중',
  OUT_OF_STOCK: '품절',
  HIDDEN: '숨김',
};
const Menu = ({menu, onEdit, onIncreaseStock, onDecreaseStock}: Props) => {
  return (
    <S.MenuWrapper>
      <S.MenuImage source={{uri: menu.image}} />
      <S.MenuInfoWrapper>
        <S.MenuNameText>{menu.name}</S.MenuNameText>
        <S.DicountInfoWrapper>
          <S.DiscountRateText>{menu.discountRate} %</S.DiscountRateText>
          <S.OriginPriceText>
            {menu.originPrice.toLocaleString()}원
          </S.OriginPriceText>
        </S.DicountInfoWrapper>
        <S.CurrentInfoWrapper>
          <S.DiscountPriceText>
            {menu.discountPrice.toLocaleString()}원
          </S.DiscountPriceText>
          <S.CurrentStatusText>
            {statusMap[menu.productStatus]}
          </S.CurrentStatusText>
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
