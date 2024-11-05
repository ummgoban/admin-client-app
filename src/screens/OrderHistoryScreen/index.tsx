// OrderHistoryScreen.tsx
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import PendingOrdersScreen from './PendingOrdersScreen';
import {ToggleButton} from '@/components/common';
import {Text} from 'react-native';
import S from './OrderHistoryScreen.style';

const OrderHistoryScreen = () => {
  const [selected, setSelected] = useState<
    'ORDERED' | 'ACCEPTED' | 'PICKUP_OR_CANCEL'
  >('ORDERED');

  return (
    <View>
      <S.NavbarGroup selected={selected}>
        <ToggleButton value="ORDERED" onPress={() => setSelected('ORDERED')}>
          <Text>{`예약접수`}</Text>
        </ToggleButton>
        <ToggleButton value="ACCEPTED" onPress={() => setSelected('ACCEPTED')}>
          <Text>{`픽업대기`}</Text>
        </ToggleButton>
        <ToggleButton
          value="PICKUP_OR_CANCEL"
          onPress={() => setSelected('PICKUP_OR_CANCEL')}
          last>
          <Text>{`완료/취소`}</Text>
        </ToggleButton>
      </S.NavbarGroup>
      <ScrollView>
        <PendingOrdersScreen orderStatus={selected} />
      </ScrollView>
    </View>
  );
};

export default OrderHistoryScreen;
