import styled from '@emotion/native';
import {Button as RNPButton} from 'react-native-paper';

const FloatingContainer = styled.View`
  position: fixed;
  bottom: 0;
<<<<<<< HEAD
  margin-top: 16px;
=======
>>>>>>> 2bf2560 (chore: install deps)
`;

const Button = styled(RNPButton)`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const S = {
  FloatingContainer,
  Button,
};

export default S;
