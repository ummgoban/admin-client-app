import React, {useState} from 'react';
import S from './ManagerLists.style';
import ManagerList from './ManagerList';
import {ManagerInfo} from '@/types/Managers';
import {BottomButton} from '../common';
import ManagerModal from './ManagerModal';

type ManagerListsProps = {
  managers: ManagerInfo[] | null | undefined;
  marketId: number;
};

const ManagerLists = ({managers, marketId}: ManagerListsProps) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <>
      <S.ListsContainer>
        <S.HeaderRow>
          <S.HeaderText>이름</S.HeaderText>
          <S.HeaderText>직책</S.HeaderText>
          <S.HeaderText>삭제하기</S.HeaderText>
        </S.HeaderRow>

        {managers?.map(manager => (
          <ManagerList
            key={manager.id}
            memberId={manager.id}
            marketId={marketId!!}
            name={manager.name}
            marketRole={manager.marketRole}
          />
        ))}
        <BottomButton onPress={showModal}>직원 추가하기</BottomButton>
      </S.ListsContainer>
      <ManagerModal
        visible={visible}
        onDismiss={hideModal}
        marketId={marketId}
      />
    </>
  );
};

export default ManagerLists;
