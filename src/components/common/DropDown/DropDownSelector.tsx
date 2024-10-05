import React, {useState, useRef, useMemo} from 'react';
import {
  TouchableOpacity,
  FlatList,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import S from './DropDownSelector.style';

type Props = {
  value: string[];
  options: string[];
  onChange: (val: string) => void;
  placeholder?: string;
};

const DropDownSelector = ({value, options, onChange, placeholder}: Props) => {
  const [newOptionName, setNewOptionName] = useState<string>('');
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const inputRef = useRef(null);

  const handleInputChange = (input: string) => {
    const trimmedInput = input.trim();
    setNewOptionName(trimmedInput);
    setIsDropdownVisible(trimmedInput.length > 0);
  };

  const addNewOption = () => {
    if (!newOptionName || options.includes(newOptionName)) return;
    onChange(newOptionName);
    setNewOptionName('');
    setIsDropdownVisible(false);
  };

  const filteredOptions = useMemo(
    () => options.filter(option => option.includes(newOptionName)),
    [options, newOptionName],
  );

  const renderDropdownOption = ({item}: {item: string}) => (
    <S.DropdownOption onPress={() => onChange(item)}>
      <S.DropdownOptionName>{item}</S.DropdownOptionName>
    </S.DropdownOption>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <S.SelectedItemsContainer>
          <ScrollView horizontal>
            {value.map((option, index) => (
              <S.SelectedItem key={index}>
                <S.SelectedItemName>{option}</S.SelectedItemName>
                <TouchableOpacity onPress={() => onChange(option)}>
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
              renderItem={renderDropdownOption}
              keyExtractor={(_, index) => index.toString()}
              showsVerticalScrollIndicator
            />
            {newOptionName &&
              options.every(option => option !== newOptionName) && (
                <S.DropdownOption onPress={addNewOption}>
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
