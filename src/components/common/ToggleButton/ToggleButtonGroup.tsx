import React from 'react';
import {View} from 'react-native';
import {PropsOf} from '@emotion/react';

import {ToggleButtonProvider} from './ToggleButtonContext';

import S from './ToggleButtonGroup.style';

type ToggleButtonGroupProps = PropsOf<typeof View>;

const ToggleButtonGroup = (props: ToggleButtonGroupProps) => {
  return (
    <ToggleButtonProvider>
      <S.ToggleButtonGroupContainer {...props} />
    </ToggleButtonProvider>
  );
};

export default ToggleButtonGroup;
