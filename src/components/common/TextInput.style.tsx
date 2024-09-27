import styled from '@emotion/native';
import {TextInput as PaperTextInput} from 'react-native-paper';

const Container = styled.View`
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 8px 0;
`;

const TextInput = styled(PaperTextInput)`
  ${props => !props.disabled && 'background-color: #ffffff'};

  min-height: 48px;

  box-sizing: border-box;

  border-radius: 4px;
  border: 1px solid #b5b5b5;
`;

const GuideContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const GuideText = styled.Text``;

const ErrorText = styled(GuideText)``;

const SuccessText = styled(GuideText)``;

const CurrentLength = styled(GuideText)``;
const LimitText = styled(GuideText)``;

const S = {
  Container,
  TextInput,
  GuideContainer,
  GuideText,
  ErrorText,
  SuccessText,
  CurrentLength,
  LimitText,
};

export default S;
