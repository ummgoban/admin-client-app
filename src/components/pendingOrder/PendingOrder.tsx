import {OrderDetailInfoType} from '@/types/OrderDetailType';
import S from './PendingOrder.style';
import {Text} from 'react-native';
import React from 'react';
type Props = {
  order: OrderDetailInfoType;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const period = hours >= 12 ? '오후' : '오전';
  const formattedHours = hours % 12 || 12;

  return `${period} ${formattedHours}시 ${minutes}분`;
};

const PendingOrder = ({order}: Props) => {
  console.log('현재주문:', order);
  return (
    <S.PendingMenuContainer>
      <S.TimeInfoContainer>
        <S.TimeInfo>
          <Text>주문시간</Text>
          <Text>{formatDate(order.createdAt)}</Text>
        </S.TimeInfo>
        <S.Divider />
        <S.TimeInfo>
          <Text>픽업시간</Text>
          <Text>{formatDate(order.pickupReservedAt)}</Text>
        </S.TimeInfo>
      </S.TimeInfoContainer>
      <S.DetailContainer>
        <S.TextStyled>주문자명: {order.orderMemberName}</S.TextStyled>
        <S.RequestText>요청사항</S.RequestText>
        <S.RequestText numberOfLines={3} ellipsizeMode="tail">
          {order.customerRequset}
        </S.RequestText>
        <S.TextStyled numberOfLines={3} ellipsizeMode="tail">
          {order.products
            .map(product => `${product.name} ${product.count}개`)
            .join(', ')}{' '}
        </S.TextStyled>
        <S.PriceText>{order.ordersPrice}원</S.PriceText>
      </S.DetailContainer>
    </S.PendingMenuContainer>
  );
};

export default PendingOrder;
