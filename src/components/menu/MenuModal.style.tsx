import styled from '@emotion/native';

const ModalOverlay = styled.View`

  flex: 1;
  justify-content: center;
  align-items: center;
  rgba(0, 0, 0, 0.5)
`;

const ModalView = styled.View`
  width: 95%;
  height: 80%;
  padding: 20px;
  background-color: lightgray;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const ModalImageWrapper = styled.TouchableOpacity``;

const ModalImage = styled.Image`
  width: 100px;
  height: 100px;
  margin: 20px;
`;
const InputRow = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
  gap: 16px;
`;
const InputLabel = styled.Text`
  width: 80px;
  text-align: right;
`;
const TextInputContainer = styled.TextInput`
  width: 180px;
  padding-horizontal: 8px;
  background-color: white;
  margin-bottom: 12px;
  padding-horizontal: 8px;
  height: 30px;
`;
const StatusButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const StatusButton = styled.TouchableOpacity<{isActive: boolean}>`
  width: 60px;
  height: 25px;
  border-radius: 5px;
  margin-right: 5px;
  padding: 5px;
  text-align: center;
  align-items: center;
  background-color: ${({isActive}) => (isActive ? '#4CAF50' : '#E0E0E0')};
`;
const StatusButtonText = styled.Text``;
const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
`;

const ModalButton = styled.TouchableOpacity`
  padding: 10px;
  background-color: #4682b4;
  border-radius: 8px;
  margin-top: 10px;
  margin-bottom: 30px;
`;
const ModalButtonText = styled.Text`
  color: white;
`;

const S = {
  ModalOverlay,
  ModalView,
  ModalImageWrapper,
  ModalImage,
  InputRow,
  InputLabel,
  TextInputContainer,
  ButtonContainer,
  StatusButtonContainer,
  StatusButton,
  StatusButtonText,
  ModalButton,
  ModalButtonText,
};

export default S;
