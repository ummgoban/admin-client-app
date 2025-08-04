import styled from '@emotion/native';

const S = {
  Container: styled.View`
    display: flex;
    background-color: ${({theme}) => theme.colors.secondary};

    border-radius: 8px;
    justify-content: center;
    align-items: center;
  `,
};

export default S;
