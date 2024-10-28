import React, {useState, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';

import {ToggleButton} from '@/components/common';

import S from './OrderHistoryScreen.style';
import {PendingOrdersType, OrderDetailInfoType} from '@/types/OrderDetailType';
import PendingOrdersScreen from './PendingOrdersScreen';
import {getPendingOrderLists} from '@/apis/PendingOrderInfo';

const OrderHistoryScreen = () => {
  const [selected, setSelected] = useState<'ordered' | 'accepted' | 'done'>(
    'ordered',
  );
  const [orderedOrders, setOrderedOrders] = useState<OrderDetailInfoType[]>([]);
  const [acceptedOrders, setAcceptedOrders] = useState<OrderDetailInfoType[]>(
    [],
  );
  const [canceledOrders, setCanceledOrders] = useState<OrderDetailInfoType[]>(
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
        const canceled = data.data.filter(
          order => order.orderStatus === 'CANCELED',
        );
        setOrderedOrders(ordered);
        setAcceptedOrders(accepted);
        setCanceledOrders(canceled);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <S.NavbarGroup selected={selected}>
        <ToggleButton
          value={'ordered'}
          onPress={() =>
            setSelected('ordered')
          }>{`예약접수(${orderedOrders.length})`}</ToggleButton>
        <ToggleButton
          value={'accepted'}
          onPress={() =>
            setSelected('accepted')
          }>{`픽업대기(${acceptedOrders.length})`}</ToggleButton>
        <ToggleButton
          value="done"
          onPress={() => setSelected('done')}
          last>{`완료/취소(${canceledOrders.length})`}</ToggleButton>
      </S.NavbarGroup>
      {selected === 'ordered' && (
        <ScrollView>
          {/* TODO: implement each table */}
          <Text>{`예약접수`}</Text>
          <PendingOrdersScreen pendingOrders={orderedOrders} />
        </ScrollView>
      )}
      {selected === 'accepted' && (
        <ScrollView>
          {/* TODO: implement each table */}
          <Text>{`픽업대기`}</Text>
          <PendingOrdersScreen pendingOrders={acceptedOrders} />
        </ScrollView>
      )}
      {selected === 'done' && (
        <ScrollView>
          {/* TODO: implement each table */}
          <Text>{`완료/취소`}</Text>
          <PendingOrdersScreen pendingOrders={canceledOrders} />
        </ScrollView>
      )}
    </View>
  );
};

export default OrderHistoryScreen;
