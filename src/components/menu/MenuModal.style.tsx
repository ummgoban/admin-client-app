import styled from '@emotion/native';

const ModalOverlay = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalView = styled.View`
  width: 88%;
  height: 92%;
  padding: 20px;
  background-color: lightgray;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const ModalImageWrapper = styled.TouchableOpacity``;

const ModalImage = styled.Image`
  width: 80px;
  height: 80px;
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
  background-color: ${({isActive}) => (isActive ? '#4CAF50' : '#E0E0E0')};
`;
const StatusButtonText = styled.Text`
  font-weight: bold;
`;
const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
`;

const ModalButton = styled.TouchableOpacity`
  padding: 10px;
  background-color: #4682b4;
  border-radius: 8px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const ModalButtonText = styled.Text`
  color: white;
`;

const TagAddButtonWrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
`;
const TagsFlexWrap = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 8px;
`;
const TagButtonWrapper = styled.View`
  background-color: #4682b4;
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
