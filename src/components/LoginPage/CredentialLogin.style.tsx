import styled from '@emotion/native';
import {Button, TextInput} from 'react-native-paper';

const S = {
  ScreenWrapper: styled.View`
    flex: 1;

    margin-top: 16px;
  `,

  LoginFormWrapper: styled.View`
    padding: 0 16px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  `,

  LoginTextInput: styled(TextInput)`
    width: 100%;
    height: 48px;
  `,

  SubmitButton: styled(Button)`
    width: 100%;
  `,

  SignUpButton: styled(Button)`
    text-align: center;
    ${({theme}) => theme.fonts.body2}
  `,

  HorizontalLine: styled.View`
    width: 100%;
    height: 1px;
    background-color: ${({theme}) => theme.colors.primaryDisabled};

    margin-bottom: 16px;
  `,
};

export default S;
