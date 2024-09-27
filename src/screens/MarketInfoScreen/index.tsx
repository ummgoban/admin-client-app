import React from 'react';

import S from './MarketInfoScreen.style';
import TextInput from '@/components/common/TextInput';
import {BottomButton} from '@/components/common';

const MarketInfoScreen = () => {
  return (
    <S.Container>
      <S.ScrollView>
        <TextInput label={'상호명'} disabled placeholder="수미네반찬" />
        <TextInput
          label={'한 줄 소개'}
          required
          multiline
          limit={40}
          placeholder="가게소개를 입력해주세요"
        />
        {/* TODO: 영업 시간 */}
        {/* TODO: 픽업 시간 */}
        {/* TODO: 대표 사진 선택 */}
      </S.ScrollView>
      <BottomButton>저장</BottomButton>
    </S.Container>
  );
};

export default MarketInfoScreen;
