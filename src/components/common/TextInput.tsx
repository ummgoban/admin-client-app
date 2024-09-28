import {PropsOf} from '@emotion/react';
import React, {useState} from 'react';
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  View,
} from 'react-native';

import S from './TextInput.style';
import Label from './Label';

type Props = {
  required?: boolean;
  limit?: number;
  success?: boolean;
  errorMessage?: string;
  successMessage?: string;
  guideMessage?: string;
} & PropsOf<typeof S.TextInput>;

const TextInput = ({
  required = false,
  limit,
  success,
  errorMessage,
  successMessage,
  guideMessage,
  ...props
}: Props) => {
  const {label, ...rest} = props;

  const [value, setValue] = useState('');

  const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    rest.onChange?.(e);
    setValue(e.nativeEvent.text);
  };

  return (
    <S.Container>
      <Label label={label} required={required} />
      <S.TextInput
        onChange={onChange}
        value={value}
        placeholderTextColor={'#979797'}
        {...rest}
      />
      <S.GuideContainer>
        {rest.error && errorMessage ? (
          <S.ErrorText>{errorMessage}</S.ErrorText>
        ) : success && successMessage ? (
          <S.SuccessText>{successMessage}</S.SuccessText>
        ) : guideMessage ? (
          <S.GuideText>{guideMessage}</S.GuideText>
        ) : (
          <View />
        )}
        {limit && (
          <S.LimitText>
            <S.CurrentLength>{value.length}</S.CurrentLength>/{limit}
          </S.LimitText>
        )}
      </S.GuideContainer>
    </S.Container>
  );
};

export default TextInput;
