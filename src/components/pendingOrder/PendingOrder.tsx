import {OrderDetailInfoType} from '@/types/OrderDetailType';
import S from './PendingOrder.style';
import {Text} from 'react-native';
import React from 'react';
import {Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/StackNavigationType';

type Props = {
  order: OrderDetailInfoType;
  onStatusChange: (orderId: string, newStatus: string) => void;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const hours = date.getUTCHours();
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

  const handlePickup = () => {
    onStatusChange(order.id, 'PICKED_UP');
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
          </S.ButtonContainer>
        );
      default:
        return <Text>{order.ordersStatus}</Text>;
    }
  };

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const navigatePage = () => {
    navigation.navigate('Home', {
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
        {renderButtons()}
      </S.DetailContainer>
    </S.PendingMenuContainer>
  );
};

export default PendingOrder;
