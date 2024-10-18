import {PropsOf} from '@emotion/react';
import React, {useEffect, useState} from 'react';
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  View,
} from 'react-native';

import S from './CustomTextInput.style';
import CustomLabel from './CustomLabel';

type Props = {
  required?: boolean;
  limit?: number;
  success?: boolean;
  errorMessage?: string;
  successMessage?: string;
  guideMessage?: string;
} & PropsOf<typeof S.TextInput>;

const CustomTextInput = ({
  required = false,
  limit,
  success,
  errorMessage,
  successMessage,
  guideMessage,
  value = '',
  ...props
}: Props) => {
  const {label, ...rest} = props;

  const [inputValue, setInputValue] = useState(value);

  const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    rest.onChange?.(e);
    setInputValue(e.nativeEvent.text);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <S.Container>
      <S.InputContainer>
        <CustomLabel label={label} required={required} />
        <S.TextInput
          onChange={onChange}
          value={inputValue}
          placeholderTextColor={'#979797'}
          {...rest}
        />
      </S.InputContainer>
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

export default CustomTextInput;
