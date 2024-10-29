import React, {useState, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import PendingOrder from '@/components/pendingOrder/PendingOrder';
import {ToggleButton} from '@/components/common';
import {Text} from 'react-native';
import S from './OrderHistoryScreen.style';
import {PendingOrdersType, OrderDetailInfoType} from '@/types/OrderDetailType';
import {getPendingOrderLists} from '@/apis/PendingOrderInfo';

const OrderHistoryScreen = () => {
  const [selected, setSelected] = useState<'ORDERED' | 'ACCEPTED' | 'DONE'>(
    'ORDERED',
  );
  const [orderedOrders, setOrderedOrders] = useState<OrderDetailInfoType[]>([]);
  const [acceptedOrders, setAcceptedOrders] = useState<OrderDetailInfoType[]>(
    [],
  );
  const [completedOrders, setCompletedOrders] = useState<OrderDetailInfoType[]>(
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      const data: PendingOrdersType | null = await getPendingOrderLists();
      if (data && data.data) {
        const ordered = data.data.filter(
          order => order.orderStatus === 'ORDERED',
        );
        const accepted = data.data.filter(
          order => order.orderStatus === 'ACCEPTED',
        );
        const completed = data.data.filter(
          order =>
            order.orderStatus === 'CANCELED' || order.orderStatus === 'DONE',
        );
        setOrderedOrders(ordered);
        setAcceptedOrders(accepted);
        setCompletedOrders(completed);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    const allOrders = [...orderedOrders, ...acceptedOrders];
    const updatedOrder = allOrders.find(order => order.id === orderId);

    if (!updatedOrder) return;

    if (newStatus === 'ACCEPTED') {
      setAcceptedOrders([
        ...acceptedOrders,
        {...updatedOrder, orderStatus: newStatus},
      ]);
      setOrderedOrders(orderedOrders.filter(order => order.id !== orderId));
    } else if (['DONE', 'NO_SHOW', 'CANCELED'].includes(newStatus)) {
      setCompletedOrders([
        ...completedOrders,
        {...updatedOrder, orderStatus: newStatus},
      ]);
      if (orderedOrders.includes(updatedOrder)) {
        setOrderedOrders(orderedOrders.filter(order => order.id !== orderId));
      } else {
        setAcceptedOrders(acceptedOrders.filter(order => order.id !== orderId));
      }
    }
  };

  return (
    <View>
      <S.NavbarGroup selected={selected}>
        <ToggleButton value={'ORDERED'} onPress={() => setSelected('ORDERED')}>
          <Text>{`예약접수(${orderedOrders.length})`}</Text>
        </ToggleButton>
        <ToggleButton
          value={'ACCEPTED'}
          onPress={() => setSelected('ACCEPTED')}>
          <Text>{`픽업대기(${acceptedOrders.length})`}</Text>
        </ToggleButton>
        <ToggleButton value="done" onPress={() => setSelected('DONE')} last>
          <Text>{`완료/취소(${completedOrders.length})`}</Text>
        </ToggleButton>
      </S.NavbarGroup>
      {selected === 'ORDERED' && (
        <ScrollView>
          {orderedOrders.map(order => (
            <PendingOrder
              key={order.id}
              order={order}
              onStatusChange={handleStatusChange}
            />
          ))}
        </ScrollView>
      )}
      {selected === 'ACCEPTED' && (
        <ScrollView>
          {acceptedOrders.map(order => (
            <PendingOrder
              key={order.id}
              order={order}
              onStatusChange={handleStatusChange}
            />
          ))}
        </ScrollView>
      )}
      {selected === 'DONE' && (
        <ScrollView>
          {completedOrders.map(order => (
            <PendingOrder
              key={order.id}
              order={order}
              onStatusChange={handleStatusChange}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default OrderHistoryScreen;
