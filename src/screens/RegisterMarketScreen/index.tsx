import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, Text} from 'react-native';
import {Modal} from 'react-native-paper';

import {BottomButton} from '@/components/common';
import TextInput from '@/components/common/TextInput/TextInput';

import {useCreateMarket, useVerifyBusinessNumber} from '@/apis/markets';

import useMarket from '@/hooks/useMarket';
import useProfile from '@/hooks/useProfile';

import S from './RegisterMarketScreen.style';

import {
  isError,
  isLocalNumber,
  isPhoneNumber,
  isValidBusinessNumber,
  isValidStartDate,
} from '@/utils/marketRegister';

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

  const [isPostcodeVisible, setPostcodeVisible] = useState(false);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [specificAddress, setSpecificAddress] = useState<string | undefined>(
    undefined,
  );
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [marketOwnerName, setMarketOwnerName] = useState<string | undefined>(
    undefined,
  );
  const [contactNumber, setContactNumber] = useState<string | undefined>(
    undefined,
  );

  // 사업자등록번호 정보가 filled 되었는지
  const disabledBusinessNumberVerifyButton =
    !businessNumber ||
    !isValidBusinessNumber(businessNumber) ||
    !marketOwnerName ||
    isError(marketOwnerName) ||
    !marketName ||
    isError(marketName) ||
    !startDate ||
    !isValidStartDate(startDate);

  const {mutateAsync: createMarket} = useCreateMarket();

  const {data: isVerifiedBusinessNumber, refetch: verifyBusinessNumber} =
    useVerifyBusinessNumber(
      !disabledBusinessNumberVerifyButton
        ? {
            businessNumber,
            startDate,
            name: marketOwnerName,
            marketName,
          }
        : undefined,
    );

  const handleAddressSelect = (data: AddressData) => {
    const selectedAddress = data.roadAddress || data.jibunAddress;
    setAddress(selectedAddress);
    setPostcodeVisible(false);
  };

  // 모든 인풋에 입력이 되었는지, 안되었으면 true
  const isInputIncomplete =
    !marketName ||
    isError(marketName) ||
    !contactNumber ||
    isError(contactNumber, 11) ||
    (!isLocalNumber(contactNumber) && !isPhoneNumber(contactNumber)) ||
    !address ||
    isError(address) ||
    !specificAddress ||
    isError(specificAddress) ||
    !businessNumber ||
    isError(businessNumber, 10) ||
    !marketOwnerName ||
    isError(marketOwnerName) ||
    !startDate ||
    !isValidStartDate(startDate);

  // 입력 + 사업자 등록 인증까지 체크
  const disabledRegisterButton = isInputIncomplete || !isVerifiedBusinessNumber;

  const showNotice =
    isInputIncomplete || (!isInputIncomplete && !isVerifiedBusinessNumber);

  const noticeMessage = isInputIncomplete
    ? '모든 입력 사항은 필수 입력 사항입니다.'
    : '사업자등록번호 인증이 필요합니다.';
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
              label="사장님 성함"
              placeholder="사장님 성함을 입력해주세요"
              errorMessage="사장님 이름을 입력해주세요"
              error={isError(marketOwnerName)}
              value={marketOwnerName}
              onChange={e => setMarketOwnerName(e.nativeEvent.text)}
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
            <TextInput
              label="개업일자"
              placeholder="YYYYMMDD 형식으로 입력해주세요"
              errorMessage="개업일자를 입력해주세요"
              inputMode="numeric"
              maxLength={8}
              error={isError(startDate, 8)}
              value={startDate}
              onChange={e => setStartDate(e.nativeEvent.text)}
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
                disabled={disabledBusinessNumberVerifyButton}
                onPress={() => {
                  verifyBusinessNumber();
                  console.log(isInputIncomplete);
                }}>
                <S.ButtonText disabled={disabledBusinessNumberVerifyButton}>
                  사업자등록번호 인증
                </S.ButtonText>
              </S.VerifyBusinessButton>
            </S.InputLayout>
          </S.RegisterMarketInputContainer>
          {showNotice && <S.Notice>{noticeMessage}</S.Notice>}
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
