import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import PendingOrder from '@/components/pendingOrder/PendingOrder';
import {OrderDetailInfoType, OrdersStatus} from '@/types/OrderDetailType';
import {usePatchOrder} from '@/apis/orders/query';
import {useQueryClient} from '@tanstack/react-query';
import {ActivityIndicator} from 'react-native-paper';

type PendingOrdersProps = {
  marketId: number;
  orders: OrderDetailInfoType[];
};

const PendingOrders = ({orders, marketId}: PendingOrdersProps) => {
  const queryClient = useQueryClient();
  const {mutate: patchOrderMutate, isPending: isPatchOrderPending} =
    usePatchOrder();

  const isLoading = isPatchOrderPending;
  if (isLoading || !orders) {
    return <ActivityIndicator />;
  }

  const handleStatusChange = (orderId: string, newStatus: OrdersStatus) => {
    patchOrderMutate(
      {ordersId: orderId, ordersStatus: newStatus},
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['orders', newStatus, marketId],
          });
        },
        onError: error => {
          console.error(error);
        },
      },
    );
  };

  return (
    <View>
      {orders
        .slice()
        .sort(
          (a, b) =>
            new Date(b.pickupReservedAt).getTime() -
            new Date(a.pickupReservedAt).getTime(),
        )
        .map(order => (
          <PendingOrder
            key={order.id}
            order={order}
            onStatusChange={handleStatusChange}
          />
        ))}
    </View>
  );
};

export default PendingOrders;
