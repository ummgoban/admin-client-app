import styled from '@emotion/native';

const S = {
  Container: styled.View`
    display: flex;
    background-color: ${({theme}) => theme.colors.secondary};

    border-radius: 8px;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
  `,

  TouchWrapper: styled.Pressable`
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  `,
};

export default S;
