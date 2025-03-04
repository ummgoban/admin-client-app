import React, {useState, useEffect} from 'react';
import {Portal, Modal} from 'react-native-paper';
import S from './ManagerModal.style';
import {useQueryClient} from '@tanstack/react-query';
import {useCreateAuthCode, useReadCreatePendingMangers} from '@/apis/managers';
import {BottomButton} from '../common';
import {useIntervalValue} from '@/hooks/useIntervalValue';

type ManagerModalProps = {
  visible: boolean;
  onDismiss: () => void;
  marketId: number;
};

const ManagerModal = ({visible, onDismiss, marketId}: ManagerModalProps) => {
  const queryClient = useQueryClient();

  const [marketName, setMarketName] = useState<string | null>(null);
  const [authCode, setAuthCode] = useState<string | null>(null);
  const [expireAuthTime, setExpireAuthTime] = useState<number>(0);
  const [authTimerFlag, setAuthTimerFlag] = useState<boolean>(false);

  const {data: pendingManagerData} = useReadCreatePendingMangers(marketId);
  const {mutateAsync: generateAuthCodeMutate} = useCreateAuthCode(marketId);

  const handleGenerateAuthCode = async () => {
    const res = await generateAuthCodeMutate();
    if (res) {
      queryClient.invalidateQueries({queryKey: ['pendingManagers', marketId]});
      setMarketName(res.data.marketName);
      setAuthCode(res.data.authCode);
      // 테스트 10초
      const targetTime = Date.now() + 5000;
      setExpireAuthTime(targetTime);
      setAuthTimerFlag(true);
    }
  };

  const remainingTime = useIntervalValue(() => {
    return Math.floor((expireAuthTime - Date.now()) / 1000);
  }, 10);

  useEffect(() => {
    if (authTimerFlag && remainingTime <= 0) {
      setMarketName(null);
      setAuthCode(null);
      queryClient.invalidateQueries({queryKey: ['pendingManagers', marketId]});
      setAuthTimerFlag(false);
    }
  }, [remainingTime]);

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss}>
        <S.ModalContainer>
          <S.ModalHeader>
            <S.ModalHeaderText>직원 등록</S.ModalHeaderText>
          </S.ModalHeader>
          {marketName && authCode && (
            <S.ModalContentItem>
              <S.AuthCodeContainer>
                <S.MarketNameText>상호명: {marketName}</S.MarketNameText>
                <S.AuthCodeText>인증코드: {authCode}</S.AuthCodeText>
                {remainingTime > 0 && (
                  <S.CountdownText>
                    유효 시간: {remainingTime}초
                  </S.CountdownText>
                )}
              </S.AuthCodeContainer>
            </S.ModalContentItem>
          )}
          <S.ModalContentItem>
            <BottomButton onPress={handleGenerateAuthCode}>
              직원 인증 코드 생성하기
            </BottomButton>
          </S.ModalContentItem>

          {pendingManagerData && (
            <S.ModalContentItem>
              <S.PendingManagerText>
                등록 대기중인 직원: {pendingManagerData.memberName}
              </S.PendingManagerText>
            </S.ModalContentItem>
          )}

          <S.ModalFooter>
            <S.FooterButtons>
              <BottomButton onPress={onDismiss}>닫기</BottomButton>
              <BottomButton
                onPress={() => {
                  /* 직원 등록하기 로직 추후 추가 */
                }}>
                직원 등록하기
              </BottomButton>
            </S.FooterButtons>
          </S.ModalFooter>
        </S.ModalContainer>
      </Modal>
    </Portal>
  );
};

export default ManagerModal;
