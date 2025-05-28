import React, {useState, useCallback} from 'react';
import {View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {ToggleButton} from '@/components/common';
import EmptyMarket from '@/components/common/EmptyMarket';
import NonRegister from '@/components/common/NonRegister';
import useProfile from '@/hooks/useProfile';
import {useGetOrders} from '@/apis/orders/query';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';
import PendingOrdersScreen from '../../components/pendingOrder/PendingOrders';
import {RefreshControl} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import S from './OrderHistoryScreen.style';
import {OrdersStatus} from '@/types/OrderDetailType';
import useMarket from '@/hooks/useMarket';

const OrderHistoryScreen = () => {
  const [selected, setSelected] = useState<OrdersStatus>('ORDERED');
  const {profile} = useProfile();
  const marketId = profile?.marketId;

  const {
    data: orders,
    refetch,
    isLoading: getOrderLoading,
  } = useGetOrders({marketId: marketId ?? 0, ordersStatus: selected});
  const {onRefresh, refreshing} = usePullDownRefresh(refetch);
  const {marketInfo} = useMarket();
  useFocusEffect(
    useCallback(() => {
      if (marketId) {
        refetch();
      }
    }, [marketId, refetch]),
  );

  if (!profile) {
    return <NonRegister />;
  }

  if (!marketId || !marketInfo) {
    return <EmptyMarket />;
  }

  if (getOrderLoading || !orders) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <S.NavbarGroup selected={selected}>
        <ToggleButton value="ORDERED" onPress={() => setSelected('ORDERED')}>
          <S.ToggleText>{`예약접수`}</S.ToggleText>
        </ToggleButton>
        <ToggleButton value="ACCEPTED" onPress={() => setSelected('ACCEPTED')}>
          <S.ToggleText>{`픽업대기`}</S.ToggleText>
        </ToggleButton>
        <ToggleButton
          value="PICKEDUP_OR_CANCELED"
          onPress={() => setSelected('PICKEDUP_OR_CANCELED')}
          last>
          <S.ToggleText>{`완료/취소`}</S.ToggleText>
        </ToggleButton>
      </S.NavbarGroup>
      <S.PendingOrderScreenContainer
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }>
        <PendingOrdersScreen orders={orders} />
      </S.PendingOrderScreenContainer>
    </View>
  );
};

export default OrderHistoryScreen;
