import styled from '@emotion/native';
import {Button, Text} from 'react-native-paper';

const MainText = styled.Text`
  font-size: 20px;
  font-style: normal;
  font-weight: 600px;
  padding: 4px 12px;
`;

const AddProductView = styled.View`
  align-items: center;
`;

const AddButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 8px;

  background-color: ${({theme}) => theme.colors.primary};

  padding: 4px 24px;
  margin: 12px;
`;

const AddButtonText = styled(Text)`
  color: rgba(255, 255, 255, 1);
  padding: 4px 12px;

  margin-left: 8px;

  ${({theme}) => theme.fonts.default}
`;

const S = {AddButton, AddButtonText, AddProductView, MainText};

export default S;
