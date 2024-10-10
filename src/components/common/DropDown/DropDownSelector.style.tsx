import styled from '@emotion/native';

const Container = styled.View`
  padding: 16px;
`;

const SelectedItemsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;

const SelectedItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 4px 8px;
  border-radius: 8px;
  margin: 4px;
  background-color: #ddd;
`;

const SelectedItemName = styled.Text``;

const RemoveButton = styled.Text`
  color: gray;
  font-weight: 700;
  margin-left: 4px;
`;

const Input = styled.TextInput`
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 4px;
  width: 100%;
`;

const DropDown = styled.View`
  max-height: 200px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 4px;
  background-color: #fff;
`;

const DropDownOption = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

const DropDownOptionName = styled.Text`
  font-size: 14px;
`;

const OptionCreateView = styled.View`
  padding: 10px;
`;

const OptionCreateText = styled.Text`
  font-size: 14px;
  color: #ccc;
`;

const ModalContainer = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  width: 80%;
  height: 50%;
  display: flex;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
  gap: 30px;
`;

const S = {
  Container,
  SelectedItemsContainer,
  SelectedItem,
  SelectedItemName,
  RemoveButton,
  Input,
  DropDown,
  DropDownOption,
  DropDownOptionName,
  OptionCreateView,
  OptionCreateText,
  ModalContainer,
  ModalContent,
};

export default S;
