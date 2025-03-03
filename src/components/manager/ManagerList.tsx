import React from 'react';
import S from './ManagerList.style';
import ManagerDeleteButton from './ManagerDeleteButton';

type ManagerListProps = {
  memberId: number;
  marketId: number | null;
  name: string;
  marketRole: 'ROLE_STORE_OWNER' | 'ROLE_STORE_MANAGER';
};

const getRoleLabel = (
  role: 'ROLE_STORE_OWNER' | 'ROLE_STORE_MANAGER',
): string => {
  return role === 'ROLE_STORE_OWNER' ? '사장' : '직원';
};

const ManagerList = ({
  marketId,
  memberId,
  name,
  marketRole,
}: ManagerListProps) => {
  const role = getRoleLabel(marketRole);

  return (
    <S.ListContainer>
      <S.NameText>{name}</S.NameText>
      <S.RoleText>{role}</S.RoleText>
      {role === '직원' ? (
        <ManagerDeleteButton marketId={marketId} memberId={memberId} />
      ) : (
        <S.EmptyPlaceholder />
      )}
    </S.ListContainer>
  );
};

export default ManagerList;
