import styled from '@emotion/native';
import {TextInput as PaperTextInput} from 'react-native-paper';

const Container = styled.View`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px 0;
`;
const InputContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const TextInput = styled(PaperTextInput)`
  ${props => !props.disabled && 'background-color: #ffffff'};
  display: flex;
  height: 50px;
  width: 200px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #b5b5b5;
`;

const GuideContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const GuideText = styled.Text`
  font-size: 12px;
  line-height: 16px;

  color: #b5b5b5;
`;

const ErrorText = styled(GuideText)`
  color: #ff0000;
`;

const SuccessText = styled(GuideText)`
  color: #00ff00;
`;

const CurrentLength = styled(GuideText)``;
const LimitText = styled(GuideText)``;

const S = {
  Container,
  InputContainer,
  TextInput,
  GuideContainer,
  GuideText,
  ErrorText,
  SuccessText,
  CurrentLength,
  LimitText,
};

export default S;
