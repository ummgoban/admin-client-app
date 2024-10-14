<<<<<<< HEAD
<<<<<<< HEAD
import React, {useEffect, useState} from 'react';
<<<<<<< HEAD
import {getOrderHistory} from '@/apis/OrderInfo';
=======
import {Text} from 'react-native';
import {getOrderHistory} from '@/apis/OrderInfo';
import OrderCustomerInfo from '@/components/orderDetail/OrderCustomerInfo';
import {OrderResponseType, OrderInfoType} from '@/types/OrderDetailType';
import OrderProductsInfo from '@/components/orderDetail/OrderProductsInfo';
>>>>>>> c8880cc (style: 테스트 코드 변경 및 포맷팅)
import S from './OrderDetailScreen.style';
import {OrderResponseType, OrderInfoType} from '@/types/OrderDetailType';
import {Text} from 'react-native';
import OrderCustomerInfo from '@/components/OrderDetail/OrderCustomerInfo';
import OrderProductsInfo from '@/components/OrderDetail/OrderProductsInfo';

const OrderDetailScreen = () => {
  const [orderData, setOrderData] = useState<OrderInfoType | null>();

  useEffect(() => {
    const fetchData = async () => {
      const data: OrderResponseType | null = await getOrderHistory();
      // TODO: suspense 로직
      setOrderData(data?.data);
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
=======
import React from 'react';
=======
import React, {useEffect, useState} from 'react';
>>>>>>> 374216c (feat: 주문 상세 페이지 구현)
import {Text} from 'react-native';
import {getOrderHistory} from '@/apis/OrderInfo'; // API 호출
import OrderCustomerInfo from '@/components/orderDetail/OrderCustomerInfo';
import {OrderResponseType, OrderInfoType} from '@/types/OrderDetailType';
import OrderProductsInfo from '@/components/orderDetail/OrderProductsInfo';
import S from './OrderDetailScreen.style';
const OrderDetailScreen = () => {
<<<<<<< HEAD
  return <Text>ss</Text>;
>>>>>>> b6cdbb1 (feat: 네비게이션 및 타입 작성)
=======
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
>>>>>>> 374216c (feat: 주문 상세 페이지 구현)
};

export default OrderDetailScreen;
