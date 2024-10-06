import React, {useState, useRef, useMemo} from 'react';
import {
  TouchableOpacity,
  FlatList,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import S from './DropDownSelector.style';
import {TagType} from '@/types/TagType';

type Props = {
  values: TagType[];
  options: TagType[];
  onChange: (val: string) => void;
  placeholder?: string;
};

type DropDownOptionProps = {
  item: TagType;
  onChange: (val: string) => void;
};

const DropDownOption = ({item, onChange}: DropDownOptionProps) => (
  <S.DropdownOption onPress={() => onChange(item.name)}>
    <S.DropdownOptionName>{item.name}</S.DropdownOptionName>
  </S.DropdownOption>
);

const DropDownSelector = ({values, options, onChange, placeholder}: Props) => {
  const [newOptionName, setNewOptionName] = useState<string>('');
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const inputRef = useRef(null);

  const handleInputChange = (input: string) => {
    const trimmedInput = input.trim();
    setNewOptionName(trimmedInput);
    setIsDropdownVisible(Boolean(trimmedInput));
  };

  const filteredOptions = useMemo(
    () => options.filter(option => option.name.includes(newOptionName)),
    [options, newOptionName],
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <S.SelectedItemsContainer>
          <ScrollView horizontal>
            {values.map((option: TagType) => (
              <S.SelectedItem key={option.id}>
                <S.SelectedItemName>{option.name}</S.SelectedItemName>
                <TouchableOpacity onPress={() => onChange(option.name)}>
                  <S.RemoveButton>×</S.RemoveButton>
                </TouchableOpacity>
              </S.SelectedItem>
            ))}
          </ScrollView>
        </S.SelectedItemsContainer>
        <S.Input
          ref={inputRef}
          placeholder={placeholder}
          value={newOptionName}
          onChangeText={handleInputChange}
          onFocus={() => setIsDropdownVisible(true)}
          onBlur={() => setIsDropdownVisible(false)}
        />
        {isDropdownVisible && (
          <S.Dropdown>
            <S.OptionCreateView>
              <S.OptionCreateText>옵션 선택 또는 생성</S.OptionCreateText>
            </S.OptionCreateView>
            <FlatList
              data={filteredOptions}
              renderItem={({item}) => (
                <DropDownOption item={item} onChange={onChange} />
              )}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator
            />
            {newOptionName &&
              options.every(option => option.name !== newOptionName) && (
                <S.DropdownOption onPress={() => onChange(newOptionName)}>
                  <S.DropdownOptionName>
                    {newOptionName} 추가하기
                  </S.DropdownOptionName>
                </S.DropdownOption>
              )}
          </S.Dropdown>
        )}
      </S.Container>
    </TouchableWithoutFeedback>
  );
};

export default DropDownSelector;
