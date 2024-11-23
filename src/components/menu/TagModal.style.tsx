import styled from '@emotion/native';

const ModalOverlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalView = styled.View`
  width: 88%;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
  align-items: center;
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

const TagButton = styled.TouchableOpacity<{isSelected: boolean}>`
  background-color: ${({isSelected}) => (isSelected ? '#4682b4' : 'white')};
  border-radius: 20px;
  padding: 8px 12px;
  margin: 4px;
`;

const TagText = styled.Text`
  color: #333;
  font-size: 14px;
`;

const AddButton = styled.TouchableOpacity`
  margin-left: 12px;
  background-color: #4682b4;
  border-radius: 8px;
  padding: 10px 16px;
`;

const AddButtonText = styled.Text`
  color: white;
  font-size: 14px;
`;

const TagList = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  margin-bottom: 16px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-top: 16px;
`;

const ModalButton = styled.TouchableOpacity`
  background-color: #4682b4;
  border-radius: 8px;
  padding: 10px 16px;
`;

const ModalButtonText = styled.Text`
  color: #ffffff;
  font-size: 14px;
`;

const S = {
  ModalOverlay,
  ModalView,
  InputRow,
  TagButton,
  TagText,
  AddButton,
  AddButtonText,
  TagList,
  ButtonContainer,
  ModalButton,
  ModalButtonText,
};

export default S;
