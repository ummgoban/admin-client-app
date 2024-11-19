import styled from '@emotion/native';
import {Button as RNPButton} from 'react-native-paper';

const FloatingContainer = styled.View`
  position: fixed;
  bottom: 0;
  margin-top: 16px;
`;

const Button = styled(RNPButton)<{disabled?: boolean}>`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 16px;

  background-color: ${props => {
    if (props.disabled) {
      return props.theme.colors.primaryDisabled;
    }
    return props.theme.colors.primary;
  }};
`;

const S = {
  FloatingContainer,
  Button,
};

export default S;
