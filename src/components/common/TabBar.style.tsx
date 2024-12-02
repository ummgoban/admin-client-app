import styled from '@emotion/native';

import {generateCssOf} from '@/utils/platform';

const TabBarContainer = styled.View`
  display: flex;
  flex-direction: row;

  background-color: white;

  box-shadow: 0px 4px;
  box-shadow-color: rgba(0, 0, 0, 0.12);

  ${generateCssOf({
    ios: `
      shadow-radius: 4px;
      shadow-offset: 0px 4px;
      shadow-opacity: 0.08;
    `,
    android: `elevation: 11;`,
  })}
`;

const TabBarItemButton = styled.TouchableOpacity`
  flex: 1;
`;

const TabBarItem = styled.View`
  margin: 4px auto;
  padding: 4px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const TabBarText = styled.Text<{isFocused: boolean}>`
  ${({theme}) => theme.fonts.body2};
  color: ${({isFocused, theme}) =>
    isFocused ? theme.colors.primary : theme.colors.tertiary};
`;

const S = {
  TabBarContainer,
  TabBarItemButton,
  TabBarItem,
  TabBarText,
};

export default S;
