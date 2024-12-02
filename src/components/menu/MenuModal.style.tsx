import styled from '@emotion/native';
import {ScrollView} from 'react-native-gesture-handler';

const ModalOverlay = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalView = styled.View`
  width: 100%;

  background-color: white;
`;

const ModalScrollView = styled(ScrollView)`
  width: 100%;
  height: 100%;
`;

const ModalViewInner = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;
`;

const ModalImageWrapper = styled.TouchableOpacity``;

const ModalImage = styled.Image`
  width: 120px;
  height: 120px;
  margin: 8px;
`;
const InputRow = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
  gap: 16px;
  justify-content: flex-start;
`;
const InputLabel = styled.Text`
  color: #222222;

  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  width: 88px;
`;
const DiscountRateLabel = styled.Text`
  color: red;
  height: 32px;
  width: 180px;
`;
const TextInputContainer = styled.TextInput`
  width: 180px;
  padding-horizontal: 8px;
  background-color: white;
  margin-bottom: 12px;
  height: 48px;
`;
const StatusButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const StatusButton = styled.TouchableOpacity<{isActive: boolean}>`
  width: 60px;
  height: 32px;
  border-radius: 5px;
  margin-right: 5px;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.isActive ? props.theme.colors.primary : '#E0E0E0'};
`;
const StatusButtonText = styled.Text`
  font-weight: bold;
`;
const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
  padding-top: 12px;
`;

const ModalButton = styled.TouchableOpacity<{
  status?: 'error' | 'warning' | 'primary';
}>`
  padding: 10px;
  border-radius: 8px;
  margin-top: 20px;
  margin-bottom: 20px;

  background-color: ${props => props.theme.colors[props.status || 'primary']};
`;
const ModalButtonText = styled.Text`
  color: white;
`;

const TagAddButtonWrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const TagsFlexWrap = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;
const TagButtonWrapper = styled.View`
  background-color: white;
  display: flex;
  flex-direction: row;
  gap: 4px;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  padding: 2px;
`;

const TagRemoveButton = styled.TouchableOpacity``;

const S = {
  TagButtonWrapper,
  TagRemoveButton,
  TagAddButtonWrapper,
  TagsFlexWrap,
  ModalOverlay,
  ModalView,
  ModalScrollView,
  ModalViewInner,
  ModalImageWrapper,
  ModalImage,
  InputRow,
  InputLabel,
  TextInputContainer,
  ButtonContainer,
  StatusButtonContainer,
  DiscountRateLabel,
  StatusButton,
  StatusButtonText,
  ModalButton,
  ModalButtonText,
};

export default S;
