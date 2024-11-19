import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import PendingOrder from '@/components/pendingOrder/PendingOrder';
import {OrderDetailInfoType} from '@/types/OrderDetailType';
import {getPendingOrderLists} from '@/apis/PendingOrderInfo';
import {updateOrderStatus} from '@/apis/PendingOrderInfo';

type PendingOrdersScreenProps = {
  orderStatus:
    | 'ORDERED'
    | 'ACCEPTED'
    | 'PICKEDUP_OR_CANCELED'
    | 'PICKEDUP'
    | 'CANCELED';
};

const PendingOrdersScreen = ({orderStatus}: PendingOrdersScreenProps) => {
  const [orders, setOrders] = useState<OrderDetailInfoType[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      //TODO: marketId 받아와서 API call
      const data = await getPendingOrderLists(6, orderStatus);
      if (data) {
        setOrders(data);
      }
    };
    fetchOrders();
  }, [orderStatus]);

  const handleStatusChange = (
    orderId: number,
    newStatus:
      | 'ORDERED'
      | 'ACCEPTED'
      | 'PICKEDUP_OR_CANCELED'
      | 'PICKEDUP'
      | 'CANCELED',
  ) => {
    updateOrderStatus(orderId, newStatus);
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
