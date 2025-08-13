import styled from '@emotion/native';
import {Button, Text} from 'react-native-paper';

const S = {
  MainText: styled.Text`
    font-size: 20px;
    font-style: normal;
    font-weight: 600px;
    padding: 4px 12px;
  `,

  AddProductView: styled.View`
    flex-direction: row;
    padding: 0px 24px;
    justify-content: space-between;
  `,

  AddButton: styled(Button)`
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 8px;

    background-color: ${({theme}) => theme.colors.primary};

    padding: 4px 20px;
    margin: 8px;
  `,

  AddButtonText: styled(Text)`
    color: rgba(255, 255, 255, 1);
    padding: 4px 12px;

    ${({theme}) => theme.fonts.default}
  `,
};

export default S;
