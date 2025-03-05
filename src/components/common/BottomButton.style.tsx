import styled from '@emotion/native';
import {Button as RNPButton} from 'react-native-paper';

const S = {
  FloatingContainer: styled.View`
    position: fixed;
    bottom: 0;
    margin-top: 16px;

    padding: 0 16px;
  `,

  Button: styled(RNPButton)<{disabled?: boolean}>`
    width: 100%;
    border-radius: 8px;
    margin-bottom: 16px;

    background-color: ${props => {
      if (props.disabled) {
        return props.theme.colors.primaryDisabled;
      }
      return props.theme.colors.primary;
    }};
  `,
};

export default S;
