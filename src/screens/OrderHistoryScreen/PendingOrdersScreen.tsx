import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import PendingOrder from '@/components/pendingOrder/PendingOrder';
import {OrderDetailInfoType} from '@/types/OrderDetailType';
import {getPendingOrderLists} from '@/apis/PendingOrderInfo';

type PendingOrdersScreenProps = {
  orderStatus: 'ORDERED' | 'ACCEPTED' | 'PICKUP_OR_CANCEL';
};

const PendingOrdersScreen = ({orderStatus}: PendingOrdersScreenProps) => {
  const [orders, setOrders] = useState<OrderDetailInfoType[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getPendingOrderLists(6, orderStatus);
      if (data) {
        setOrders(data);
      }
    };
    fetchOrders();
  }, [orderStatus]);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(prevOrders => {
      const updatedOrders = prevOrders.map(order =>
        order.id === orderId ? {...order, ordersStatus: newStatus} : order,
      );
      return updatedOrders.filter(order => order.ordersStatus === orderStatus);
    });
  };

  return (
    <ScrollView>
      {orders.map(order => (
        <PendingOrder
          key={order.id}
          order={order}
          onStatusChange={handleStatusChange}
        />
      ))}
    </ScrollView>
  );
};

export default PendingOrdersScreen;
