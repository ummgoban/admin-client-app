import React, {useState, useEffect} from 'react';
import {Portal, Modal} from 'react-native-paper';
import S from './ManagerModal.style';
import {useQueryClient} from '@tanstack/react-query';
import {
  useCreateAuthCode,
  useCreateManager,
  useReadCreatePendingMangers,
} from '@/apis/managers';
import {BottomButton} from '../common';
import {useIntervalValue} from '@/hooks/useIntervalValue';

type ManagerModalProps = {
  visible: boolean;
  onDismiss: () => void;
  marketId: number;
};

// TODO: fcm 알림 이용해서 pendingManager 화면에 출력

const ManagerModal = ({visible, onDismiss, marketId}: ManagerModalProps) => {
  const queryClient = useQueryClient();

  const [marketName, setMarketName] = useState<string | null>(null);
  const [authCode, setAuthCode] = useState<string | null>(null);
  const [expireAuthTime, setExpireAuthTime] = useState<number>(0);

  const {data: pendingManagerData} = useReadCreatePendingMangers(marketId);
  const {mutateAsync: generateAuthCodeMutate} = useCreateAuthCode(marketId);
  const {mutateAsync: createManagerMutate} = useCreateManager(marketId);

  const handleGenerateAuthCode = async () => {
    const res = await generateAuthCodeMutate();
    if (res) {
      const authTargetTime = Date.now() + 600000;
      setExpireAuthTime(authTargetTime);
      queryClient.invalidateQueries({queryKey: ['pendingManagers', marketId]});
      setMarketName(res.data.marketName);
      setAuthCode(res.data.authCode);
    }
  };

  const remainingTime = useIntervalValue(
    () => Math.floor((expireAuthTime - Date.now()) / 1000),
    1000,
  );

  const handleTimerOff = () => {
    setMarketName(null);
    setAuthCode(null);
  };

  const handleCreateManager = async () => {
    const res = await createManagerMutate();
    if (res) {
      queryClient.invalidateQueries({queryKey: ['pendingManagers', marketId]});
      queryClient.invalidateQueries({queryKey: ['readManagers', marketId]});
      handleTimerOff();
      onDismiss();
    } else {
      // TODO: 백엔드와 소통 후 직원 추가시 에러처리
      console.log('error');
    }
  };

  useEffect(() => {
    if (expireAuthTime && Date.now() >= expireAuthTime) {
      handleTimerOff();
      queryClient.invalidateQueries({queryKey: ['pendingManagers', marketId]});
    }
  }, [expireAuthTime, queryClient, marketId, remainingTime]);

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
                    유효 시간: {Math.floor(remainingTime / 60)}분
                    {remainingTime % 60}초
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
              <BottomButton onPress={handleCreateManager}>
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
