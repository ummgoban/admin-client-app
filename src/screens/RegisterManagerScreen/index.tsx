import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import S from './RegisterManagerScreen.style';
import TextInput from '@/components/common/TextInput/TextInput';
import {useValidateAuthCode} from '@/apis/managers';
import useMarket from '@/hooks/useMarket';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/StackNavigationType';
import {Alert} from 'react-native';

const isError = (value: string | undefined, validLength?: number) => {
  if (value === undefined) {
    return false;
  }

  if (value.length === 0) {
    return true;
  }

  return !!validLength && value?.length !== validLength;
};

const RegisterManagerScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [marketName, setMarketName] = useState<string | undefined>(undefined);
  const [authCode, setAuthCode] = useState<string | undefined>(undefined);

  const {refresh} = useMarket();

  const {mutate: validateAuthCodeMutate} = useValidateAuthCode();

  const handleValidtateAuthCode = () => {
    if (!marketName || !authCode) {
      Alert.alert('잘못된 입력입니다.');
      return;
    }
    validateAuthCodeMutate(
      {marketName, authCode},
      {
        onSuccess: async () => {
          // TODO: fcm 작업 이후 사장 승인 이후 감지
          // selectMarket(data);
          await refresh();
          Alert.alert('사장님이 승인하시면 직원으로 등록돼요!');
          navigation.goBack();
        },
        onError: error => {
          const errorMessage =
            (error as any)?.errorMessage || '알 수 없는 에러입니다.';
          Alert.alert(errorMessage);
        },
      },
    );
  };

  return (
    <S.RegisterManagerContainer>
      <S.RegisterManagerInputContainer>
        <TextInput
          label="상호명"
          placeholder="상호명을 입력해주세요"
          errorMessage="올바른 상호명을 입력해주세요"
          error={isError(marketName)}
          value={marketName}
          onChange={e => setMarketName(e.nativeEvent.text)}
        />
      </S.RegisterManagerInputContainer>
      <S.ConfirmLayout>
        <TextInput
          label="인증코드"
          placeholder="인증코드를 입력해주세요(6자)"
          errorMessage="올바른 인증코드를 입력해주세요"
          error={isError(authCode, 6)}
          value={authCode}
          onChange={e => setAuthCode(e.nativeEvent.text)}
        />
        <S.ConfirmButton
          disabled={
            !marketName ||
            isError(marketName) ||
            !authCode ||
            isError(authCode, 6)
          }
          onPress={() => {
            handleValidtateAuthCode();
          }}>
          <S.ConfirmButtonText
            disabled={
              !marketName ||
              isError(marketName) ||
              !authCode ||
              isError(authCode, 6)
            }>
            인증하기
          </S.ConfirmButtonText>
        </S.ConfirmButton>
      </S.ConfirmLayout>
    </S.RegisterManagerContainer>
  );
};

export default RegisterManagerScreen;
