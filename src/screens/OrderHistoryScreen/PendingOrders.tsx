import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import PendingOrder from '@/components/pendingOrder/PendingOrder';
import {OrderDetailInfoType} from '@/types/OrderDetailType';
import {getPendingOrderLists, updateOrderStatus} from '@/apis/Orders';
import useProfile from '@/hooks/useProfile';

type PendingOrdersProps = {
  orderStatus:
    | 'ORDERED'
    | 'ACCEPTED'
    | 'PICKEDUP_OR_CANCELED'
    | 'PICKEDUP'
    | 'CANCELED';
};

const PendingOrders = ({orderStatus}: PendingOrdersProps) => {
  const [orders, setOrders] = useState<OrderDetailInfoType[]>([]);

  const {profile} = useProfile();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!profile?.marketId) {
        return;
      }

      const data = await getPendingOrderLists(profile.marketId, orderStatus);
      if (data) {
        setOrders(data);
      }
    };

    fetchOrders();
  }, [orderStatus, profile?.marketId]);

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

export default PendingOrders;
