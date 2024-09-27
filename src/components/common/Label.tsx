import React from 'react';
import {TextInputLabelProp} from 'react-native-paper/lib/typescript/components/TextInput/types';

import S from './Label.style';

type Props = {
  required?: boolean;
  label?: TextInputLabelProp;
};

const Label = ({label, required}: Props) => {
  if (!label) {
    return null;
  }

  return (
    <S.Label>
      <>
        {label}
        {required && <S.RequiredStar>*</S.RequiredStar>}
      </>
    </S.Label>
  );
};

export default Label;
