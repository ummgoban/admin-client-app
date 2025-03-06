import styled from '@emotion/native';
import {Button, Text} from 'react-native-paper';

const S = {
  RegisterManagerContainer: styled.View`
    position: relative;
    flex: 1;
    padding: 16px;
    gap: 20px;
  `,

  RegisterManagerInputContainer: styled.View`
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,

  ConfirmLayout: styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
  `,
  ConfirmButton: styled(Button)<{disabled?: boolean}>`
    background-color: ${props => {
      if (props.disabled) {
        return props.theme.colors.primaryDisabled;
      }
      return props.theme.colors.primary;
    }};
    border-radius: 8px;
  `,
  ConfirmButtonText: styled(Text)<{disabled?: boolean}>`
    color: ${props => {
      if (props.disabled) {
        return props.theme.colors.tertiaryDisabled;
      }
      return props.theme.colors.tertiary;
    }};
  `,
};

export default S;
