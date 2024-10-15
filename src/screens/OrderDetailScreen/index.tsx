import React, {useEffect, useState} from 'react';
import {getOrderHistory} from '@/apis/OrderInfo';
import S from './OrderDetailScreen.style';
import OrderCustomerInfo from '../../components/orderDetail/OrderCustomerInfo';
import {OrderResponseType, OrderInfoType} from '@/types/OrderDetailType';
<<<<<<< HEAD
=======
<<<<<<< HEAD
import OrderProductsInfo from '@/components/orderDetail/OrderProductsInfo';
<<<<<<< HEAD
>>>>>>> c8880cc (style: 테스트 코드 변경 및 포맷팅)
import S from './OrderDetailScreen.style';
import {OrderResponseType, OrderInfoType} from '@/types/OrderDetailType';
=======
import OrderProductsInfo from '../../components/orderDetail/OrderProductsInfo';
>>>>>>> e76a454 (style: CI ERROR)
>>>>>>> parent of 40c5910 (chore: resolve type check github action (#23))
import {Text} from 'react-native';
import OrderCustomerInfo from '@/components/OrderDetail/OrderCustomerInfo';
import OrderProductsInfo from '@/components/OrderDetail/OrderProductsInfo';

<<<<<<< HEAD
=======
=======
import {Text} from 'react-native';
>>>>>>> ab51f00 (style: CI error)
>>>>>>> parent of 40c5910 (chore: resolve type check github action (#23))
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
};

export default OrderDetailScreen;
