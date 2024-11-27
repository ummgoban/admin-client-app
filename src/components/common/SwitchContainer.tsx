import React from 'react';
import {SwitchChangeEvent} from 'react-native';

import S from './SwitchContainer.style';

type SwitchContainerProps = {
  value: boolean;
  onChange: (event: SwitchChangeEvent) => Promise<void> | void;
  title: string;
  description?: string;
};

const SwitchContainer = ({
  value,
  onChange,
  title,
  description,
}: SwitchContainerProps) => {
  return (
    <S.SettingItem>
      <S.SettingItemDescriptionContainer>
        <S.SettingItemDescriptionTitle>{title}</S.SettingItemDescriptionTitle>
        {description && (
          <S.SettingItemDescription>{description}</S.SettingItemDescription>
        )}
      </S.SettingItemDescriptionContainer>
      <S.SwitchButton value={value} onChange={onChange} />
    </S.SettingItem>
  );
};

export default SwitchContainer;
