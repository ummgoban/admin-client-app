import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';

import PendingOrdersScreen from './PendingOrders';
import {ToggleButton} from '@/components/common';
import useProfile from '@/hooks/useProfile';

import S from './OrderHistoryScreen.style';

const OrderHistoryScreen = () => {
  const [selected, setSelected] = useState<
    'ORDERED' | 'ACCEPTED' | 'PICKEDUP_OR_CANCELED'
  >('ORDERED');

  const {fetch: fetchProfile} = useProfile();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

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
