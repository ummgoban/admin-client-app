import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

import {ToggleButton} from '@/components/common';
import useMarket from '@/hooks/useMarket';
import useProfile from '@/hooks/useProfile';
import PendingOrdersScreen from './PendingOrders';

import EmptyMarket from '@/components/common/EmptyMarket';
import S from './OrderHistoryScreen.style';
import NonRegister from '@/components/common/NonRegister';

const OrderHistoryScreen = () => {
  const [selected, setSelected] = useState<
    'ORDERED' | 'ACCEPTED' | 'PICKEDUP_OR_CANCELED'
  >('ORDERED');

  const {fetch: fetchProfile, profile} = useProfile();
  const {marketInfo} = useMarket();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (!profile) {
    return <NonRegister />;
  }

  if (!marketInfo) {
    return <EmptyMarket />;
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
      <View>
        <PendingOrdersScreen orderStatus={selected} />
      </View>
    </View>
  );
};

export default OrderHistoryScreen;
