import styled from '@emotion/native';

import {ToggleButtonGroup} from '@/components/common';

const NavbarGroup = styled(ToggleButtonGroup)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin: 10px;
`;

const ToggleText = styled.Text`
  color: ${props => props.theme.colors.tertiary};
`;

const PendingOrderScreenContainer = styled.ScrollView`
  margin-bottom: 72px;
`;

const S = {NavbarGroup, ToggleText, PendingOrderScreenContainer};

export default S;
