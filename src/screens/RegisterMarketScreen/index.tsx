import {BottomButton, TextInput} from '@/components/common';
import React, {useState} from 'react';

import S from './RegisterMarketScreen.style';
import {Alert} from 'react-native';

const RegisterMarketScreen = () => {
  const [ownerName, setOwnerName] = useState<string | undefined>(undefined);
  const [newlyOpeningDate, setNewlyOpeningDate] = useState<string | undefined>(
    undefined,
  );
  const [marketId, setMarketId] = useState<string | undefined>(undefined);

  const isError = (value: string | undefined, validLength?: number) => {
    if (!value) {
      return false;
    }

    if (value.length === 0) {
      return true;
    }

    return !!validLength && value?.length !== validLength;
  };

  return (
    <S.RegisterMarketContainer>
      <S.RegisterMarketInputContainer>
        <TextInput
          label={'대표자명'}
          placeholder="대표자명을 입력해주세요"
          errorMessage="대표자명을 입력해주세요"
          error={isError(ownerName)}
          value={ownerName}
          onChange={e => setOwnerName(e.nativeEvent.text)}
          required
        />
        <TextInput
          label={'개업일자(8자)'}
          placeholder="YYYYMMDD"
          errorMessage="개업일자를 입력해주세요.(YYYYMMDD)"
          keyboardType="numeric"
          error={isError(newlyOpeningDate, 8)}
          value={newlyOpeningDate}
          onChange={e => setNewlyOpeningDate(e.nativeEvent.text)}
          required
        />
        <TextInput
          label={'사업자등록번호(10자)'}
          placeholder="사업자등록번호를 입력해주세요(10자)"
          errorMessage="사업자등록번호를 입력해주세요(10자)"
          inputMode="numeric"
          error={isError(marketId, 10)}
          value={marketId}
          onChange={e => setMarketId(e.nativeEvent.text)}
          required
        />
      </S.RegisterMarketInputContainer>
      <BottomButton
        disabled={
          isError(ownerName) ||
          isError(newlyOpeningDate, 8) ||
          isError(marketId, 10)
        }
        onPress={() => {
          // TODO: fetch server
          Alert.alert(
            JSON.stringify({
              ownerName,
              newlyOpeningDate,
              marketId,
            }),
          );
        }}>
        매장 등록
      </BottomButton>
    </S.RegisterMarketContainer>
  );
};

export default RegisterMarketScreen;
