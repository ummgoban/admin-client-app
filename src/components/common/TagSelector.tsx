import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';
import {
  TouchableOpacity,
  FlatList,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {TagType} from '@/types/TagType';
import {getTagHistory} from '@apis/Tag';
import S from './TagSelector.style';

const TagSelector = () => {
  const [tagsData, setTagsData] = useState<TagType[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [newTagName, setNewTagName] = useState<string>('');
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchTags = async () => {
      const data = await getTagHistory();
      if (data) {
        setTagsData(data);
      }
    };
    fetchTags();
  }, []);

  const toggleTagSelection = useCallback(
    (tag: TagType) => {
      if (!selectedTags.find(t => t.id === tag.id)) {
        setSelectedTags(prevTags => [...prevTags, tag]);
      }
    },
    [selectedTags],
  );

  const removeTag = useCallback((tag: TagType) => {
    setSelectedTags(prevTags => prevTags.filter(t => t.id !== tag.id));
  }, []);

  const addNewTag = () => {
    if (!newTagName || tagsData.some(tag => tag.name === newTagName)) return;

    const maxId = tagsData.length;
    const newTag: TagType = {id: maxId + 1, name: newTagName};
    setTagsData([...tagsData, newTag]);
    setSelectedTags([...selectedTags, newTag]);
    setNewTagName('');
    setIsDropdownVisible(true);
    // TODO: 추가된 태그 서버 전송 로직
  };

  const handleInputChange = (tag: string) => {
    const trimmedTag = tag.trim();
    setNewTagName(trimmedTag);
    setIsDropdownVisible(trimmedTag.length > 0);
  };

  const filteredTag = useMemo(
    () => tagsData.filter(tag => tag.name.includes(newTagName)),
    [tagsData, newTagName],
  );

  const renderDropdownTag = ({item: tag}: {item: TagType}) => (
    <S.DropdownTag onPress={() => toggleTagSelection(tag)}>
      <S.DropdownTagName>{tag.name}</S.DropdownTagName>
    </S.DropdownTag>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.TagContainer>
        <S.SelectedTagsContainer>
          <ScrollView horizontal>
            {selectedTags.map(tag => (
              <S.SelectedTag key={tag.id}>
                <S.SelectedTagName>{tag.name}</S.SelectedTagName>
                <TouchableOpacity onPress={() => removeTag(tag)}>
                  <S.TagRemoveButton>×</S.TagRemoveButton>
                </TouchableOpacity>
              </S.SelectedTag>
            ))}
          </ScrollView>
        </S.SelectedTagsContainer>
        <S.TagInput
          ref={inputRef}
          placeholder="메뉴 태그를 선택해주세요."
          value={newTagName}
          onChangeText={handleInputChange}
          onFocus={() => setIsDropdownVisible(true)}
          onBlur={() => setIsDropdownVisible(false)}
        />
        {isDropdownVisible && (
          <S.Dropdown>
            <FlatList
              data={filteredTag}
              renderItem={renderDropdownTag}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={true}
            />
            {!tagsData.some(tag => tag.name === newTagName) && newTagName && (
              <S.DropdownTag onPress={addNewTag}>
                <S.DropdownTagName>
                  {newTagName} 태그 추가하기
                </S.DropdownTagName>
              </S.DropdownTag>
            )}
          </S.Dropdown>
        )}
      </S.TagContainer>
    </TouchableWithoutFeedback>
  );
};

export default TagSelector;
