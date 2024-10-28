import PendingOrder from '@/components/pendingOrder/PendingOrder';
import {OrderDetailInfoType} from '@/types/OrderDetailType';
import {View} from 'react-native';
import React from 'react';
type Props = {
  pendingOrders: OrderDetailInfoType[];
};
const PendingOrdersScreen = ({pendingOrders}: Props) => {
  return (
    <View>
      {pendingOrders.map(order => (
        <PendingOrder key={order.id} order={order} />
      ))}
    </View>
  );
};

export default PendingOrdersScreen;
