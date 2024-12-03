import {OrderDetailInfoType} from '@/types/OrderDetailType';
import {RootStackParamList} from '@/types/StackNavigationType';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Button, Text} from 'react-native';
import S from './PendingOrder.style';

type Props = {
  order: OrderDetailInfoType;
  onStatusChange: (
    orderId: number,
    newStatus:
      | 'ORDERED'
      | 'ACCEPTED'
      | 'PICKEDUP_OR_CANCELED'
      | 'PICKEDUP'
      | 'NO_SHOW'
      | 'CANCELED',
  ) => void;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const hours = date.getUTCHours() + 9;
  const minutes = date.getUTCMinutes();
  const period = hours >= 12 ? '오후' : '오전';
  const formattedHours = hours % 12 || 12;

  return `${period} ${formattedHours}시 ${minutes}분`;
};

const PendingOrder = ({order, onStatusChange}: Props) => {
  const handleAccept = () => {
    onStatusChange(order.id, 'ACCEPTED');
  };

  const handleReject = () => {
    onStatusChange(order.id, 'CANCELED');
  };
  const handleNoShow = () => {
    onStatusChange(order.id, 'NO_SHOW');
  };

  const handlePickup = () => {
    onStatusChange(order.id, 'PICKEDUP');
  };

  const renderButtons = () => {
    switch (order.ordersStatus) {
      case 'ORDERED':
        return (
          <S.ButtonContainer>
            <Button title="수락" onPress={handleAccept} />
            <Button title="거절" onPress={handleReject} />
          </S.ButtonContainer>
        );
      case 'ACCEPTED':
        return (
          <S.ButtonContainer>
            <Button title="픽업" onPress={handlePickup} />
            <Button title="노쇼" onPress={handleNoShow} />
          </S.ButtonContainer>
        );
      default:
        return <Text>{order.ordersStatus}</Text>;
    }
  };

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const navigatePage = () => {
    navigation.navigate('Order', {
      screen: 'OrderDetail',
      params: {order},
    });
  };

  return (
    <S.PendingMenuContainer onPress={navigatePage}>
      <S.TimeInfoContainer>
        <S.TimeInfo>
          <Text>주문시간</Text>
          <Text>{formatDate(order.createdAt)}</Text>
        </S.TimeInfo>
        <S.Divider />
        <S.TimeInfo>
          <Text>픽업예약</Text>
          <Text>{formatDate(order.pickupReservedAt)}</Text>
        </S.TimeInfo>
      </S.TimeInfoContainer>
      <S.DetailContainer>
        <S.TextStyled>주문자명: {order.orderMemberName}</S.TextStyled>
        <S.RequestText>요청사항</S.RequestText>
        <S.RequestText numberOfLines={3} ellipsizeMode="tail">
          {order.customerRequest}
        </S.RequestText>
        <S.TextStyled numberOfLines={3} ellipsizeMode="tail">
          {order.products
            .map(product => `${product.name} ${product.count}개`)
            .join(', ')}
        </S.TextStyled>
        <S.PriceText>{order.ordersPrice}원</S.PriceText>
        {renderButtons()}
      </S.DetailContainer>
    </S.PendingMenuContainer>
  );
};

export default PendingOrder;
