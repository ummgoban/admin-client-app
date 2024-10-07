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
`;

const Dropdown = styled.View`
  max-height: 200px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 4px;
  background-color: #fff;
`;

const DropdownOption = styled.TouchableOpacity`
  padding: 10px;
`;

const DropdownOptionName = styled.Text`
  font-size: 14px;
`;

const OptionCreateView = styled.View`
  padding: 10px;
`;

const OptionCreateText = styled.Text`
  font-size: 14px;
  color: #ccc;
`;

const S = {
  Container,
  SelectedItemsContainer,
  SelectedItem,
  SelectedItemName,
  RemoveButton,
  Input,
  Dropdown,
  DropdownOption,
  DropdownOptionName,
  OptionCreateView,
  OptionCreateText,
};

export default S;
