import styled from '@emotion/native';
import {Button, Text} from 'react-native-paper';
const PendingMenuContainer = styled.TouchableOpacity`
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  margin: 12px 4px;
  height: 240px;
`;
const TimeInfoContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0px 4px;
  margin-right: 4px;
  background-color: ${props => props.theme.colors.secondary};
`;
const Divider = styled.View`
  height: 1px;
  background-color: black;
  width: 100%;
`;
const TimeInfo = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const DetailContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 8px;
`;
const TextStyled = styled.Text`
  flex-shrink: 1;
  margin: 0;
  width: 100%;
  padding-top: 4px;
`;
const RequestText = styled.Text`
  flex-shrink: 1;
  margin: 0;
  width: 100%;
  padding-top: 4px;
  color: green;
`;
const PriceText = styled.Text`
  flex-shrink: 1;
  margin: 0;
  width: 100%;
  padding-top: 8px;
  font-weight: bold;
`;
const StatusButton = styled(Button)`
  background-color: ${props => props.theme.colors.primary};
  border-radius: 8px;
`;
const StatusButtonText = styled(Text)`
  color: white;
  ${props => props.theme.fonts.default};
`;
const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
`;

const S = {
  PendingMenuContainer,
  TimeInfoContainer,
  DetailContainer,
  TimeInfo,
  Divider,
  TextStyled,
  RequestText,
  PriceText,
  StatusButton,
  StatusButtonText,
  ButtonContainer,
};
export default S;
