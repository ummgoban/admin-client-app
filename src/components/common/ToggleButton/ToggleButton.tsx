import React, {useContext, useState} from 'react';
import {GestureResponderEvent} from 'react-native';

import {ToggleButtonContext} from './ToggleButtonContext';

import {PropsOf} from '@emotion/react';
import S from './ToggleButton.style';

let id = 0;

type RequiredProps = {
  children: React.ReactNode;
  onPress: (e: GestureResponderEvent) => void;
};

type ToggleButtonProps = RequiredProps &
  Omit<PropsOf<typeof S.ToggleButton>, keyof RequiredProps>;

const ToggleButton = ({children, onPress, ...rest}: ToggleButtonProps) => {
  const context = useContext(ToggleButtonContext);

  if (!context) {
    throw new Error('ToggleButton must be used within a ToggleButtonGroup');
  }

  const {selectedId, setSelectedId} = context;
  const [_id] = useState(() => id++);

  return (
    <S.ToggleButton
      {...rest}
      onPress={e => {
        setSelectedId(_id);
        onPress(e);
      }}
      selected={selectedId === _id}
      aria-selected={selectedId === _id}
      role={'tab'}>
      {children}
    </S.ToggleButton>
  );
};

export default ToggleButton;
