import React, {useEffect, useState} from 'react';
import {getOrderHistory} from '@/apis/OrderInfo';
import S from './OrderDetailScreen.style';
import OrderCustomerInfo from '@/components/orderDetail/OrderCustomerInfo';
import {OrderResponseType, OrderInfoType} from '@/types/OrderDetailType';
import OrderProductsInfo from '@/components/orderDetail/OrderProductsInfo';
import {Text} from 'react-native';
const OrderDetailScreen = () => {
  const [orderData, setOrderData] = useState<OrderInfoType | null>();

  useEffect(() => {
    const fetchData = async () => {
      const data: OrderResponseType | null = await getOrderHistory();
      // TODO: suspense 로직
      setOrderData(data?.data[0]);
    };

    fetchData();
  }, []);

  if (!orderData) {
    return <Text>Loading...</Text>;
  }

  return (
    <S.Container>
      <OrderCustomerInfo
        id={orderData.id}
        orderMemberName={orderData.orderMemberName}
        createdAt={orderData.createdAt}
        pickupReservedAt={orderData.pickupReservedAt}
        customerRequest={orderData.customerRequset}
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
