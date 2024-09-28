import styled from '@emotion/native';
import {Button} from 'react-native-paper';

const Container = styled.View`
  flex: 1;
  margin: 0 16px;
`;

const ScrollView = styled.ScrollView``;

const TimeContainer = styled.View`
  display: flex;
  flex-direction: row;

  align-items: center;
`;

const TimePickerButton = styled(Button)``;

const S = {Container, ScrollView, TimeContainer, TimePickerButton};

export default S;
