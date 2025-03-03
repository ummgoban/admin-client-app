import styled from '@emotion/native';

import {ToggleButtonGroup} from '@/components/common';

const S = {
  NavbarGroup: styled(ToggleButtonGroup)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    margin: 10px;
  `,

  ToggleText: styled.Text`
    color: ${props => props.theme.colors.tertiary};
  `,

  PendingOrderScreenContainer: styled.ScrollView`
    margin-top: 12px;
    margin-bottom: 36px;
  `,
};

export default S;
