import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';

import {ToggleButton} from '@/components/common';
import EmptyMarket from '@/components/common/EmptyMarket';
import NonRegister from '@/components/common/NonRegister';
import useMarket from '@/hooks/useMarket';
import useProfile from '@/hooks/useProfile';
import PendingOrdersScreen from './PendingOrders';

import S from './OrderHistoryScreen.style';

const OrderHistoryScreen = () => {
  const [selected, setSelected] = useState<
    'ORDERED' | 'ACCEPTED' | 'PICKEDUP_OR_CANCELED'
  >('ORDERED');

  const {profile} = useProfile();
  const {marketInfo} = useMarket();

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
      <ScrollView>
        <PendingOrdersScreen orderStatus={selected} />
      </ScrollView>
    </View>
  );
};

export default OrderHistoryScreen;
