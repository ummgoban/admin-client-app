// OrderHistoryScreen.tsx
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import PendingOrdersScreen from './PendingOrdersScreen';
import {ToggleButton} from '@/components/common';
import {Text} from 'react-native';
import S from './OrderHistoryScreen.style';

const OrderHistoryScreen = () => {
  const [selected, setSelected] = useState<
    'ORDERED' | 'ACCEPTED' | 'PICKEDUP_OR_CANCELED'
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
          value="PICKEDUP_OR_CANCELED"
          onPress={() => setSelected('PICKEDUP_OR_CANCELED')}
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
