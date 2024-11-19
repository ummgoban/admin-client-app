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

const S = {NavbarGroup, ToggleText};

export default S;
