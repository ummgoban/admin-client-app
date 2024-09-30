import React from 'react';
import {TextProps} from 'react-native';
import {TextInputLabelProp} from 'react-native-paper/lib/typescript/components/TextInput/types';

import S from './Label.style';

type Props = {
  required?: boolean;
  label?: TextInputLabelProp;
  labelProps?: TextProps;
};

const Label = ({label, required, labelProps = {}}: Props) => {
  if (!label) {
    return null;
  }

  return (
    <S.Label {...labelProps}>
      <>
        {label}
        {required && <S.RequiredStar>*</S.RequiredStar>}
      </>
    </S.Label>
  );
};

export default Label;