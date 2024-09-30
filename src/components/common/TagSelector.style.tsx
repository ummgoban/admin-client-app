import styled from '@emotion/native';

const TagContainer = styled.View`
  padding: 16px;
`;

const SelectedTagsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;

const SelectedTag = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 4px 8px;
  border-radius: 8px;
  margin: 4px;
  background-color: #ddd;
`;

const SelectedTagName = styled.Text``;

const TagRemoveButton = styled.Text`
  color: gray;
  font-weight: 700;
  margin-left: 4px;
`;

const TagInput = styled.TextInput`
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

const DropdownTag = styled.TouchableOpacity`
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
`;

const DropdownTagName = styled.Text`
  font-size: 14px;
`;

const S = {
  TagContainer,
  SelectedTagsContainer,
  SelectedTag,
  SelectedTagName,
  TagRemoveButton,
  TagInput,
  Dropdown,
  DropdownTag,
  DropdownTagName,
};

export default S;
