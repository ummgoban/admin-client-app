import {BottomButton, TextInput} from '@/components/common';
import React, {useState} from 'react';

import {createMarket} from '@/apis/Market';
import S from './RegisterMarketScreen.style';

const isError = (value: string | undefined, validLength?: number) => {
  if (value === undefined) {
    return false;
  }

  if (value.length === 0) {
    return true;
  }

  return !!validLength && value?.length !== validLength;
};

const isLocalNumber = (value: string) => {
  return /^(0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]))(\d{3,4})(\d{4})$/g.test(value);
};

const isPhoneNumber = (value: string) => {
  return /^(01[0|1|6|7|8|9])(\d{3,4})(\d{4})$/g.test(value);
};

const RegisterMarketScreen = () => {
  const [marketName, setMarketName] = useState<string | undefined>(undefined);

  const [businessNumber, setBusinessNumber] = useState<string | undefined>(
    undefined,
  );

  // TODO: 주소 검색 API 연동
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [specificAddress, setSpecificAddress] = useState<string | undefined>(
    undefined,
  );
  const [contactNumber, setContactNumber] = useState<string | undefined>(
    undefined,
  );

  return (
    <S.RegisterMarketContainer>
      <S.RegisterMarketInputContainer>
        <TextInput
          label={'가게명'}
          placeholder="가게명을 입력해주세요"
          errorMessage="가게명을 입력해주세요"
          error={isError(marketName)}
          value={marketName}
          onChange={e => setMarketName(e.nativeEvent.text)}
          required
        />
        <TextInput
          label={'전화번호'}
          placeholder="010-1234-5678"
          errorMessage="전화번호를 입력해주세요"
          keyboardType="numeric"
          error={isError(contactNumber)}
          value={
            contactNumber && isPhoneNumber(contactNumber)
              ? contactNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
              : contactNumber && isLocalNumber(contactNumber)
                ? contactNumber.replace(/(\d{2,3})(\d{3,4})(\d{4})/, '$1-$2-$3')
                : contactNumber
          }
          onChange={e =>
            setContactNumber(e.nativeEvent.text.replaceAll(/-/g, ''))
          }
          required
        />
        <TextInput
          label={'사업자등록번호(10자)'}
          placeholder="사업자등록번호를 입력해주세요(10자)"
          errorMessage="사업자등록번호를 입력해주세요(10자)"
          inputMode="numeric"
          error={isError(businessNumber, 10)}
          value={businessNumber}
          onChange={e => setBusinessNumber(e.nativeEvent.text)}
          required
        />
        <TextInput
          label={'주소'}
          placeholder="주소를 입력해주세요"
          errorMessage="주소를 입력해주세요"
          error={isError(address)}
          value={address}
          onChange={e => setAddress(e.nativeEvent.text)}
          required
        />
        <TextInput
          label={'상세주소'}
          placeholder="상세주소를 입력해주세요"
          errorMessage="상세주소를 입력해주세요"
          error={isError(specificAddress)}
          value={specificAddress}
          onChange={e => setSpecificAddress(e.nativeEvent.text)}
          required
        />
      </S.RegisterMarketInputContainer>
      <BottomButton
        disabled={
          !marketName ||
          isError(marketName) ||
          !contactNumber ||
          isError(contactNumber) ||
          (contactNumber && isLocalNumber(contactNumber)) ===
            (contactNumber && isPhoneNumber(contactNumber)) ||
          !businessNumber ||
          isError(businessNumber, 10) ||
          !address ||
          isError(address) ||
          !specificAddress ||
          isError(specificAddress)
        }
        onPress={async () => {
          if (
            !marketName ||
            !businessNumber ||
            !address ||
            !specificAddress ||
            !contactNumber
          ) {
            return;
          }
          await createMarket({
            name: marketName,
            businessNumber,
            address,
            specificAddress,
            contactNumber,
          });
        }}>
        매장 등록
      </BottomButton>
    </S.RegisterMarketContainer>
  );
};

export default RegisterMarketScreen;
