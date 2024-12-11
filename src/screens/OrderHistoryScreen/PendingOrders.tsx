import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {getPendingOrderLists, updateOrderStatus} from '@/apis/Orders';
import PendingOrder from '@/components/pendingOrder/PendingOrder';
import useProfile from '@/hooks/useProfile';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';
import {OrderDetailInfoType} from '@/types/OrderDetailType';

type PendingOrdersProps = {
  orderStatus:
    | 'ORDERED'
    | 'ACCEPTED'
    | 'PICKEDUP_OR_CANCELED'
    | 'PICKEDUP'
    | 'NO_SHOW'
    | 'CANCELED';
};

const PendingOrders = ({orderStatus}: PendingOrdersProps) => {
  const [orders, setOrders] = useState<OrderDetailInfoType[]>([]);
  const isFocused = useIsFocused();
  const {profile} = useProfile();

  const fetchOrders = useCallback(async () => {
    if (!profile?.marketId) {
      return;
    }

    const data = await getPendingOrderLists(profile.marketId, orderStatus);
    if (data) {
      setOrders(data);
    }
  }, [orderStatus, profile?.marketId]);

  const {onRefresh, refreshing} = usePullDownRefresh(fetchOrders);

  useEffect(() => {
    if (isFocused) {
      fetchOrders();
    }
  }, [fetchOrders]);

  const handleStatusChange = (
    orderId: string,
    newStatus:
      | 'ORDERED'
      | 'ACCEPTED'
      | 'PICKEDUP_OR_CANCELED'
      | 'PICKEDUP'
      | 'NO_SHOW'
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
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }>
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
