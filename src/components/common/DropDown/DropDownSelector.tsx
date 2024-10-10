import React, {useState, useRef, useMemo} from 'react';
import {
  TouchableOpacity,
  FlatList,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  Alert,
} from 'react-native';
import S from './DropDownSelector.style';
import {TagType} from '@/types/TagType';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Modal} from 'react-native';

type Props = {
  values: TagType[];
  options: TagType[];
  onChange: (val: string) => void;
  onRemove: (val: string) => void;
  placeholder?: string;
  onDeleteOption: (id: number) => void;
  onUpdateOption: (id: number, newName: string) => void;
};

type DropDownOptionProps = {
  item: TagType;
  onChange: (val: string) => void;
  onModal: (item: TagType) => void;
};

const DropDownOption = ({item, onChange, onModal}: DropDownOptionProps) => (
  <S.DropDownOption>
    <S.DropDownOptionName onPress={() => onChange(item.name)}>
      {item.name}
    </S.DropDownOptionName>
    <TouchableOpacity onPress={() => onModal(item)}>
      <AntDesign name="ellipsis1" size={20} color="#000" />
    </TouchableOpacity>
  </S.DropDownOption>
);

const DropDownSelector = ({
  values,
  options,
  onChange,
  placeholder,
  onRemove,
  onDeleteOption,
  onUpdateOption,
}: Props) => {
  const [newOptionName, setNewOptionName] = useState<string>('');
  const [isDropDownVisible, setIsDropDownVisible] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTag, setCurrentTag] = useState<TagType | null>(null);
  const [tagName, setTagName] = useState<string>('');
  const inputRef = useRef(null);

  const handleInputChange = (input: string) => {
    const trimmedInput = input.trim();
    setNewOptionName(trimmedInput);
    setIsDropDownVisible(Boolean(trimmedInput));
  };

  const filteredOptions = useMemo(
    () => options.filter(option => option.name.includes(newOptionName)),
    [options, newOptionName],
  );

  const handleOpenModal = (tag: TagType) => {
    setCurrentTag(tag);
    setTagName(tag.name);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setCurrentTag(null);
  };

  const handleDeleteOption = () => {
    if (currentTag) {
      Alert.alert('옵션 삭제', `${currentTag.name} 옵션을 삭제하시겠습니까?`, [
        {text: '취소'},
        {
          text: '삭제',
          onPress: () => {
            onDeleteOption(currentTag.id);
            handleCloseModal();
          },
        },
      ]);
    }
  };

  const handleUpdateOption = () => {
    if (currentTag && tagName) {
      onUpdateOption(currentTag.id, tagName);
      handleCloseModal();
    } else {
      Alert.alert('오류', '옵션 이름을 입력하세요.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <S.SelectedItemsContainer>
          <ScrollView horizontal>
            {values.map((option: TagType) => (
              <S.SelectedItem key={option.id}>
                <S.SelectedItemName>{option.name}</S.SelectedItemName>
                <TouchableOpacity onPress={() => onRemove(option.name)}>
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
          onFocus={() => setIsDropDownVisible(true)}
          onBlur={() => setIsDropDownVisible(false)}
        />
        {isDropDownVisible && (
          <S.DropDown>
            <S.OptionCreateView>
              <S.OptionCreateText>옵션 선택 또는 생성</S.OptionCreateText>
            </S.OptionCreateView>
            <FlatList
              data={filteredOptions}
              renderItem={({item}) => (
                <DropDownOption
                  item={item}
                  onChange={onChange}
                  onModal={handleOpenModal}
                />
              )}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator
            />
            {newOptionName &&
              options.every(option => option.name !== newOptionName) && (
                <S.DropDownOption onPress={() => onChange(newOptionName)}>
                  <S.DropDownOptionName>
                    {newOptionName} 추가하기
                  </S.DropDownOptionName>
                </S.DropDownOption>
              )}
          </S.DropDown>
        )}
        {currentTag && (
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={handleCloseModal}>
            <S.ModalContainer>
              <S.ModalContent>
                <S.Input value={tagName} onChangeText={setTagName} />
                <TouchableOpacity onPress={handleUpdateOption}>
                  <Text>옵션 이름 변경</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeleteOption}>
                  <Text>옵션 삭제</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCloseModal}>
                  <Text>닫기</Text>
                </TouchableOpacity>
              </S.ModalContent>
            </S.ModalContainer>
          </Modal>
        )}
      </S.Container>
    </TouchableWithoutFeedback>
  );
};

export default DropDownSelector;
