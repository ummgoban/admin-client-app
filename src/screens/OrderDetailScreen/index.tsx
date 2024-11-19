import OrderCustomerInfo from '@/components/orderDetail/OrderCustomerInfo';
import OrderProductsInfo from '@/components/orderDetail/OrderProductsInfo';
import {OrderStackParamList} from '@/types/StackNavigationType';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useMemo} from 'react';
import S from './OrderDetailScreen.style';

type OrderDetailScreenProps = StackScreenProps<
  OrderStackParamList,
  'OrderDetail'
>;

const OrderDetailScreen = ({route}: OrderDetailScreenProps) => {
  const orderData = useMemo(() => {
    return route.params.order;
  }, [route.params.order]);

  return (
    <S.Container>
      <OrderCustomerInfo
        id={orderData.id}
        orderMemberName={orderData.orderMemberName}
        createdAt={orderData.createdAt}
        pickupReservedAt={orderData.pickupReservedAt}
        customerRequest={orderData.customerRequest}
      />
      <S.HorizonDivider />
      <OrderProductsInfo
        products={orderData.products}
        totalPrice={orderData.ordersPrice}
      />
    </S.Container>
  );
};

export default OrderDetailScreen;
