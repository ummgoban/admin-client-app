import {OrderDetailInfoType} from '@/types/OrderDetailType';
import {RootStackParamList} from '@/types/StackNavigationType';
import {format} from '@/utils/date';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Text} from 'react-native';
import S from './PendingOrder.style';
import {to6DigitHash} from '@/utils/hash';

type Props = {
  order: OrderDetailInfoType;
  onStatusChange: (
    orderId: string,
    newStatus:
      | 'ORDERED'
      | 'ACCEPTED'
      | 'PICKEDUP_OR_CANCELED'
      | 'PICKEDUP'
      | 'NO_SHOW'
      | 'CANCELED',
  ) => void;
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
            <S.StatusButton onPress={handleAccept}>
              <S.StatusButtonText>{'수락'}</S.StatusButtonText>
            </S.StatusButton>
            <S.StatusButton onPress={handleReject}>
              <S.StatusButtonText>{'거절'}</S.StatusButtonText>
            </S.StatusButton>
          </S.ButtonContainer>
        );
      case 'ACCEPTED':
        return (
          <S.ButtonContainer>
            <S.StatusButton onPress={handlePickup}>
              <S.StatusButtonText>{'픽업'}</S.StatusButtonText>
            </S.StatusButton>
            <S.StatusButton onPress={handleNoShow}>
              <S.StatusButtonText>{'노쇼'}</S.StatusButtonText>
            </S.StatusButton>
          </S.ButtonContainer>
        );
      default:
        let text = '';
        switch (order.ordersStatus) {
          case 'PICKEDUP_OR_CANCELED':
            text = '픽업완료';
            break;
          case 'PICKEDUP':
            text = '픽업완료';
            break;
          case 'NO_SHOW':
            text = '노쇼';
            break;
          case 'CANCELED':
            text = '취소됨';
        }
        return <S.RequestText>{text}</S.RequestText>;
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
          <Text>{format(order.createdAt, 'YYYY.MM.DD (dd)')}</Text>
          <Text>{format(order.createdAt, 'HH:mm:ss')}</Text>
        </S.TimeInfo>
        <S.Divider />
        <S.TimeInfo>
          <Text>픽업예약</Text>
          <Text>{format(order.pickupReservedAt, 'YYYY.MM.DD (dd)')}</Text>
          <Text>{format(order.pickupReservedAt, 'HH:mm:ss')}</Text>
        </S.TimeInfo>
      </S.TimeInfoContainer>
      <S.DetailContainer>
        <S.TextStyled>주문번호: {to6DigitHash(order.id)}</S.TextStyled>
        <S.TextStyled>주문자명: {order.orderMemberName}</S.TextStyled>
        {/* <S.RequestText>요청사항</S.RequestText>
        <Text numberOfLines={3} ellipsizeMode="tail">
          {order.customerRequest || '고객의 요청사항이 없습니다'}
        </Text> */}
        <S.TextStyled>주문 상품</S.TextStyled>
        <S.TextStyled numberOfLines={3} ellipsizeMode="tail">
          {order.products
            .map(product => `${product.name} ${product.count}개`)
            .join(', ')}
        </S.TextStyled>
        <S.TextStyled>주문 가격</S.TextStyled>
        <S.PriceText>{order.ordersPrice.toLocaleString()}원</S.PriceText>
        {renderButtons()}
      </S.DetailContainer>
    </S.PendingMenuContainer>
  );
};

export default PendingOrder;
