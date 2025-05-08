import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert} from 'react-native';
import {Modal} from 'react-native-paper';

import {BottomButton} from '@/components/common';
import TextInput from '@/components/common/TextInput/TextInput';

import {useCreateMarket} from '@/apis/markets';

import useMarket from '@/hooks/useMarket';
import useProfile from '@/hooks/useProfile';

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
interface AddressData {
  roadAddress: string;
  jibunAddress: string;
  [key: string]: any;
}
const RegisterMarketScreen = () => {
  const navigation = useNavigation();

  const {selectMarket} = useProfile();
  const {refresh} = useMarket();

  const [marketName, setMarketName] = useState<string | undefined>(undefined);
  const [businessNumber, setBusinessNumber] = useState<string | undefined>(
    undefined,
  );
  const [isBusinessNumberVerified, setIsBusinessNumberVerified] =
    useState<boolean>(false);
  const [isPostcodeVisible, setPostcodeVisible] = useState(false);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [specificAddress, setSpecificAddress] = useState<string | undefined>(
    undefined,
  );
  const [contactNumber, setContactNumber] = useState<string | undefined>(
    undefined,
  );

  const {mutateAsync: createMarket} = useCreateMarket();

  const handleAddressSelect = (data: AddressData) => {
    const selectedAddress = data.roadAddress || data.jibunAddress;
    setAddress(selectedAddress);
    setPostcodeVisible(false);
  };

  const disabledRegisterButton =
    !marketName ||
    isError(marketName) ||
    !contactNumber ||
    isError(contactNumber, 11) ||
    (contactNumber && isLocalNumber(contactNumber)) ===
      (contactNumber && isPhoneNumber(contactNumber)) ||
    !businessNumber ||
    isError(businessNumber, 10) ||
    !isBusinessNumberVerified ||
    !address ||
    isError(address) ||
    !specificAddress ||
    isError(specificAddress);

  return (
    <>
      <S.RegisterMarketContainer>
        <S.RegisterMarketScrollContainer>
          <S.RegisterMarketInputContainer>
            <S.InputLayout>
              <TextInput
                label="주소"
                placeholder="주소 검색을 통해 입력해주세요"
                errorMessage="올바른 주소를 입력해주세요"
                error={isError(address)}
                value={address}
                onChange={e => setAddress(e.nativeEvent.text)}
                disabled
              />
              <S.PostcodeButton onPress={() => setPostcodeVisible(true)}>
                <S.ButtonText>{'주소 검색하기'}</S.ButtonText>
              </S.PostcodeButton>
            </S.InputLayout>
            <TextInput
              label="상세 주소"
              placeholder="동과 호수를 입력해주세요"
              errorMessage="상세주소를 입력해주세요"
              error={isError(specificAddress)}
              value={specificAddress}
              disabled={!address || isError(address)}
              onChange={e => setSpecificAddress(e.nativeEvent.text)}
            />
            <TextInput
              label="가게명"
              placeholder="가게명을 입력해주세요"
              errorMessage="가게명을 입력해주세요"
              error={isError(marketName)}
              value={marketName}
              onChange={e => setMarketName(e.nativeEvent.text)}
            />
            <TextInput
              label="전화번호"
              placeholder="010-1234-5678"
              errorMessage="전화번호를 입력해주세요"
              keyboardType="numeric"
              error={isError(contactNumber, 11)}
              maxLength={11}
              value={
                contactNumber && isPhoneNumber(contactNumber)
                  ? contactNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
                  : contactNumber && isLocalNumber(contactNumber)
                    ? contactNumber.replace(
                        /(\d{2,3})(\d{3,4})(\d{4})/,
                        '$1-$2-$3',
                      )
                    : contactNumber
              }
              onChange={e =>
                setContactNumber(e.nativeEvent.text.replaceAll(/-/g, ''))
              }
            />
            <S.InputLayout>
              <TextInput
                label="사업자등록번호"
                placeholder="사업자등록번호를 입력해주세요(10자)"
                errorMessage="사업자등록번호를 입력해주세요(10자)"
                inputMode="numeric"
                maxLength={10}
                error={isError(businessNumber, 10)}
                value={businessNumber}
                onChange={e => setBusinessNumber(e.nativeEvent.text)}
              />
              <S.VerifyBusinessButton
                disabled={!businessNumber || isError(businessNumber, 10)}
                onPress={() => setPostcodeVisible(true)}>
                <S.ButtonText
                  disabled={!businessNumber || isError(businessNumber, 10)}>
                  사업자등록번호 인증
                </S.ButtonText>
              </S.VerifyBusinessButton>
            </S.InputLayout>
          </S.RegisterMarketInputContainer>
          {disabledRegisterButton && (
            <S.Notice>모든 입력 사항은 필수 입력 사항입니다.</S.Notice>
          )}
        </S.RegisterMarketScrollContainer>
        <BottomButton
          disabled={disabledRegisterButton}
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
            const res = await createMarket({
              name: marketName,
              businessNumber,
              address,
              specificAddress,
              contactNumber,
            });

            if (res && res.marketId) {
              selectMarket(res.marketId);

              Alert.alert('매장 등록이 완료되었습니다.');

              await refresh();

              navigation.goBack();
            }
          }}>
          매장 등록
        </BottomButton>
      </S.RegisterMarketContainer>
      <Modal
        visible={isPostcodeVisible}
        onDismiss={() => setPostcodeVisible(false)}>
        <S.ModalContainer>
          <S.ModalWrapper>
            <S.StyledPostcode
              jsOptions={{animation: true}}
              onSelected={handleAddressSelect}
              onError={error => {
                console.error(error);
                setPostcodeVisible(false);
              }}
            />
          </S.ModalWrapper>
        </S.ModalContainer>
      </Modal>
    </>
  );
};

export default RegisterMarketScreen;
