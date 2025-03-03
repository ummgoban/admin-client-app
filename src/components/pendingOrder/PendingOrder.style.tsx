import styled from '@emotion/native';
import {Button, Text} from 'react-native-paper';

const S = {
  PendingMenuContainer: styled.TouchableOpacity`
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    margin: 12px 4px;
    height: 240px;
  `,
  TimeInfoContainer: styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 0px 4px;
    margin-right: 4px;
    background-color: ${props => props.theme.colors.secondary};
  `,
  Divider: styled.View`
    height: 1px;
    background-color: black;
    width: 100%;
  `,
  TimeInfo: styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
  `,
  DetailContainer: styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 8px;
  `,
  TextStyled: styled.Text`
    flex-shrink: 1;
    margin: 0;
    width: 100%;
    padding-top: 4px;
  `,
  RequestText: styled.Text`
    flex-shrink: 1;
    margin: 0;
    width: 100%;
    padding-top: 4px;
    color: green;
  `,
  PriceText: styled.Text`
    flex-shrink: 1;
    margin: 0;
    width: 100%;
    padding-top: 8px;
    font-weight: bold;
  `,
  StatusButton: styled(Button)`
    background-color: ${props => props.theme.colors.primary};
    border-radius: 8px;
  `,
  StatusButtonText: styled(Text)`
    color: white;
    ${props => props.theme.fonts.default};
  `,
  ButtonContainer: styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;
  `,
};

export default S;
