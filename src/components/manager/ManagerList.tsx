import React from 'react';
import S from './ManagerList.style';
import ManagerDeleteButton from './ManagerDeleteButton';

type ManagerListProps = {
  memberId: number;
  marketId: number;
  name: string;
  marketRole: 'ROLE_STORE_OWNER' | 'ROLE_STORE_MANAGER';
  isEditPermission: boolean;
};

const ROLE_LABELS: Record<'ROLE_STORE_OWNER' | 'ROLE_STORE_MANAGER', string> = {
  ROLE_STORE_OWNER: '사장',
  ROLE_STORE_MANAGER: '직원',
};

const ManagerList = ({
  marketId,
  memberId,
  name,
  marketRole,
  isEditPermission,
}: ManagerListProps) => {
  const role = ROLE_LABELS[marketRole];

  return (
    <S.ListContainer>
      <S.NameText>{name}</S.NameText>
      <S.RoleText>{role}</S.RoleText>
      {!isEditPermission && role === '직원' ? (
        <ManagerDeleteButton marketId={marketId} memberId={memberId} />
      ) : (
        <S.EmptyPlaceholder />
      )}
    </S.ListContainer>
  );
};

export default ManagerList;
