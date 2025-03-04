import React, {useState} from 'react';
import {Portal, Modal, Button} from 'react-native-paper';
import S from './ManagerDeleteButton.style';
import {useQueryClient} from '@tanstack/react-query';
import {useDeleteManager} from '@/apis/managers';

type ManagerDeleteButtonProps = {
  marketId: number;
  memberId: number;
};

const ManagerDeleteButton = ({
  marketId,
  memberId,
}: ManagerDeleteButtonProps) => {
  const queryClient = useQueryClient();
  const {mutateAsync: mutateDeleteManager} = useDeleteManager({
    marketId,
    memberId,
  });
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleDeletePress = async () => {
    if (marketId !== undefined) {
      const res = await mutateDeleteManager();
      if (res) {
        queryClient.invalidateQueries({queryKey: ['readManagers', marketId]});
      }
    }
    hideModal();
  };

  return (
    <>
      <S.DeleteButton onPress={showModal}>
        <S.DeleteText>삭제하기</S.DeleteText>
      </S.DeleteButton>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal}>
          <S.ModalContainer>
            <S.ModalHeader>
              <S.ModalHeaderText>해고하시겠습니까?</S.ModalHeaderText>
            </S.ModalHeader>
            <S.ModalFooter>
              <Button onPress={handleDeletePress}>확인</Button>
              <Button onPress={hideModal}>취소</Button>
            </S.ModalFooter>
          </S.ModalContainer>
        </Modal>
      </Portal>
    </>
  );
};

export default ManagerDeleteButton;
