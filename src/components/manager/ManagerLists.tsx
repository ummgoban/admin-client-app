import React from 'react';
import S from './ManagerLists.style';
import ManagerList from './ManagerList';
import {ManagerInfo} from '@/types/Managers';

type ManagerListsProps = {
  managers: ManagerInfo[] | null | undefined;
  marketId: number | null;
};

const ManagerLists = ({managers, marketId}: ManagerListsProps) => {
  return (
    <S.ListsContainer>
      {/* 헤더 영역 */}
      <S.HeaderRow>
        <S.HeaderText>이름</S.HeaderText>
        <S.HeaderText>직책</S.HeaderText>
        <S.HeaderText>해고하기</S.HeaderText>
      </S.HeaderRow>

      {/* 리스트 영역 */}
      {managers?.map(manager => (
        <ManagerList
          key={manager.id}
          memberId={manager.id}
          marketId={marketId}
          name={manager.name}
          marketRole={manager.marketRole}
        />
      ))}
    </S.ListsContainer>
  );
};

export default ManagerLists;
