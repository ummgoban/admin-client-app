import styled from '@emotion/native';
import {ToggleButton, ToggleButtonGroup} from '@/components/common';

const S = {
  Container: styled.View`
    flex: 1;
    background-color: white;
  `,

  ToggleText: styled.Text`
    color: ${props => props.theme.colors.tertiary};
  `,

  NavbarGroup: styled(ToggleButtonGroup)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px;
  `,

  ToggleButton: styled(ToggleButton)`
    width: 100%;
  `,
};

export default S;
