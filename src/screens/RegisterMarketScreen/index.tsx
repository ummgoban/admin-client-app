import React, {useState} from 'react';
import {TextInput} from '@/components/common';

import S from './RegisterMarketScreen.style';

const RegisterMarketScreen = () => {
  const [ownerName, setOwnerName] = useState('');
  const [newlyOpeningDate, setNewlyOpeningDate] = useState<Date>();
  const [marketId, setMarketId] = useState('');

  return (
    <S.RegisterMarketContainer>
      <TextInput
        label={'대표자명'}
        placeholder="대표자명을 입력해주세요"
        errorMessage="대표자명을 입력해주세요"
        value={ownerName}
        onChange={e => setOwnerName(e.nativeEvent.text)}
        required
      />
      <TextInput
        label={'개업일자'}
        placeholder="개업일자를 입력해주세요.(YYYY.MM.DD)"
        errorMessage="개업일자를 입력해주세요.(YYYY.MM.DD)"
        value={newlyOpeningDate?.toString()}
        onChange={e => setNewlyOpeningDate(new Date(e.nativeEvent.text))}
        required
      />
      <TextInput
        label={'사업자등록번호'}
        placeholder="사업자등록번호를 입력해주세요"
        errorMessage="사업자등록번호를 입력해주세요"
        inputMode="numeric"
        value={marketId}
        onChange={e => setMarketId(e.nativeEvent.text)}
        required
      />
    </S.RegisterMarketContainer>
  );
};

export default RegisterMarketScreen;
