import React from 'react';
import S from './ManagerList.style';

type ManagerListProps = {
  id: number;
  name: string;
  marketRole: 'ROLE_STORE_OWNER' | 'ROLE_STORE_MANAGER';
  createdAt: string;
};

const getRoleLabel = (
  role: 'ROLE_STORE_OWNER' | 'ROLE_STORE_MANAGER',
): string => {
  return role === 'ROLE_STORE_OWNER' ? '사장' : '직원';
};

const ManagerList = ({id, name, marketRole, createdAt}: ManagerListProps) => {
  const handleDelete = async () => {
    try {
    } catch (error) {
      console.error(error);
    }
  };
  const role = getRoleLabel(marketRole);

  return (
    <S.ListContainer>
      <S.NameText>{name}</S.NameText>
      <S.RoleText>{role}</S.RoleText>
      {role === '직원' ? (
        <S.DeleteButton onPress={handleDelete}>
          <S.DeleteText>삭제하기</S.DeleteText>
        </S.DeleteButton>
      ) : (
        <S.EmptyPlaceholder />
      )}
    </S.ListContainer>
  );
};

export default ManagerList;
