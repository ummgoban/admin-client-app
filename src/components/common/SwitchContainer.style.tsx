import styled from '@emotion/native';
import {Text, Switch} from 'react-native-paper';

const SettingItemTitle = styled(Text)`
  ${({theme}) => theme.fonts.subtitle1};
  padding: 8px 16px;
`;

const SettingItem = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background-color: #ffffff;

  padding: 8px 16px;

  border-bottom-width: 1px;
  border-bottom-color: #eaeaea;
`;

const SettingItemDescriptionContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: 4px;

  flex: 1;
`;

const SettingItemDescriptionTitle = styled(Text)`
  ${({theme}) => theme.fonts.default};
`;
const SettingItemDescription = styled(Text)`
  ${({theme}) => theme.fonts.subtitle2};
`;

const SwitchButton = styled(Switch)``;

const S = {
  SettingItemTitle,
  SettingItem,
  SettingItemDescriptionContainer,
  SettingItemDescriptionTitle,
  SettingItemDescription,
  SwitchButton,
};

export default S;
