import React, {useState} from 'react';
import {View} from 'react-native';

import {useMarket} from '@/apis/markets';

import {ToggleButton} from '@/components/common';
import EmptyMarket from '@/components/common/EmptyMarket';
import NonRegister from '@/components/common/NonRegister';

import useProfile from '@/hooks/useProfile';

import PendingOrdersScreen from './PendingOrders';

import S from './OrderHistoryScreen.style';

const OrderHistoryScreen = () => {
  const [selected, setSelected] = useState<
    'ORDERED' | 'ACCEPTED' | 'PICKEDUP_OR_CANCELED'
  >('ORDERED');

  const {profile} = useProfile();
  const {data: marketInfo} = useMarket(profile?.marketId);

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
      <S.PendingOrderScreenContainer>
        <PendingOrdersScreen orderStatus={selected} />
      </S.PendingOrderScreenContainer>
    </View>
  );
};

export default OrderHistoryScreen;
