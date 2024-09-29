import styled from '@emotion/native';

const ModalOverlay = styled.View`

  flex: 1;
  justify-content: center;
  align-items: center;
  rgba(0, 0, 0, 0.5)
`;

const ModalView = styled.View`
  width: 80%;
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
const InputLabelTail = styled.Text``;
const TextInputContainer = styled.TextInput`
  flex: 2;
  padding-horizontal: 8px;
  background-color: white;
  margin-bottom: 12px;
  padding-horizontal: 8px;
  height: 30px;
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
  InputLabelTail,
  TextInputContainer,
  ButtonContainer,
  ModalButton,
  ModalButtonText,
};

export default S;
