import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
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
  deleteHyphen,
  formatPhoneNumber,
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

  // 앱 표시 가게이름
  const [marketName, setMarketName] = useState<string | undefined>(undefined);
  // 사업자등록 정보 가게 이름
  const [businessMarketName, setBusinesesMarketName] = useState<
    string | undefined
  >(undefined);
  const [businessNumber, setBusinessNumber] = useState<string | undefined>(
    undefined,
  );

  const [isPostcodeVisible, setPostcodeVisible] = useState(false);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [specificAddress, setSpecificAddress] = useState<string | undefined>(
    undefined,
  );
  const [isVerifiedBusinessNumber, setIsVerifiedBusinessNumber] =
    useState<boolean>(false);
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
    !businessMarketName ||
    isError(businessMarketName) ||
    !startDate ||
    !isValidStartDate(startDate);

  const {mutateAsync: createMarket} = useCreateMarket();
  const {mutateAsync: verifyBusinessNumber} = useVerifyBusinessNumber();

  const handleVerifyBusinessNumber = () => {
    if (disabledBusinessNumberVerifyButton) return;

    verifyBusinessNumber(
      {
        businessNumber,
        startDate,
        name: marketOwnerName,
        businessMarketName,
      },
      {
        onSuccess: data => {
          if (data) {
            Alert.alert('사업자등록번호 인증에 성공했습니다.');
            setIsVerifiedBusinessNumber(true);
          } else {
            Alert.alert('인증 실패', '유효하지 않은 사업자 등록 정보입니다.');
            setIsVerifiedBusinessNumber(false);
          }
        },
        onError: () => {
          Alert.alert('서버와의 통신에 실패했습니다. 다시 시도해주세요.');
        },
      },
    );
  };
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
    !(isLocalNumber(contactNumber) || isPhoneNumber(contactNumber)) ||
    !businessNumber ||
    isError(businessNumber, 10) ||
    !address ||
    isError(address) ||
    !specificAddress ||
    isError(specificAddress) ||
    !businessNumber ||
    isError(businessNumber, 10) ||
    !marketOwnerName ||
    isError(marketOwnerName) ||
    !startDate ||
    !isValidStartDate(startDate) ||
    isError(marketName) ||
    !marketName;

  // 입력 + 사업자 등록 인증까지 체크
  const disabledRegisterButton = isInputIncomplete || !isVerifiedBusinessNumber;

  const showNotice =
    isInputIncomplete || (!isInputIncomplete && !isVerifiedBusinessNumber);

  const noticeMessage = isInputIncomplete
    ? '모든 입력 사항은 필수 입력 사항입니다.'
    : '사업자등록번호 인증이 필요합니다.';

  return (
    <>
      <S.RegisterMarketContainer
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <S.RegisterMarketScrollContainer
              contentContainerStyle={{paddingBottom: 24}}>
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
                  placeholder="맘찬픽에서 표시될 가게명을 입력해주세요"
                  errorMessage="가게명을 입력해주세요"
                  error={isError(marketName)}
                  value={marketName}
                  onChange={e => setMarketName(e.nativeEvent.text)}
                />
                <TextInput
                  label="전화번호"
                  placeholder="010-1234-5678"
                  errorMessage="전화번호를 입력해주세요"
                  keyboardType="phone-pad"
                  error={isError(contactNumber, 11)}
                  maxLength={13}
                  value={formatPhoneNumber(contactNumber ?? '')}
                  onChange={e =>
                    setContactNumber(deleteHyphen(e.nativeEvent.text))
                  }
                />
                <TextInput
                  label="사장님 성함"
                  placeholder="사장님 성함을 입력해주세요"
                  errorMessage="사장님 이름을 입력해주세요"
                  error={isError(marketOwnerName)}
                  value={marketOwnerName}
                  onChange={e => setMarketOwnerName(e.nativeEvent.text)}
                  disabled={isVerifiedBusinessNumber}
                />
                <TextInput
                  label="상호명"
                  placeholder="사업자 등록 정보 상호명을 입력해주세요"
                  errorMessage="상호명을 입력해주세요"
                  error={isError(businessMarketName)}
                  value={businessMarketName}
                  onChange={e => setBusinesesMarketName(e.nativeEvent.text)}
                  disabled={isVerifiedBusinessNumber}
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
                  disabled={isVerifiedBusinessNumber}
                />
                <TextInput
                  label="사업자등록번호"
                  placeholder="사업자등록번호를 입력해주세요(10자)"
                  errorMessage="사업자등록번호를 입력해주세요(10자)"
                  inputMode="numeric"
                  maxLength={10}
                  error={isError(businessNumber, 10)}
                  value={businessNumber}
                  onChange={e => setBusinessNumber(e.nativeEvent.text)}
                  disabled={isVerifiedBusinessNumber}
                />
                <S.InputLayout>
                  <S.VerifyBusinessButton
                    disabled={
                      disabledBusinessNumberVerifyButton ||
                      isVerifiedBusinessNumber
                    }
                    onPress={handleVerifyBusinessNumber}>
                    <S.ButtonText
                      disabled={
                        disabledBusinessNumberVerifyButton ||
                        isVerifiedBusinessNumber
                      }>
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
                  !contactNumber ||
                  !businessMarketName
                ) {
                  return;
                }
                const res = await createMarket({
                  name: marketName,
                  businessNumber,
                  address,
                  specificAddress,
                  contactNumber,
                  businessMarketName,
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
          </>
        </TouchableWithoutFeedback>
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
