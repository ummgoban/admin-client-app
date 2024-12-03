import React, {useState} from 'react';
import {Modal} from 'react-native';
import S from './TagModal.style';
import {TagType} from '@/types/ProductType';
import CustomTextInput from '../common/CustomTextInput';

type TagModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onSave: (tags: TagType[]) => void;
  initialTags?: TagType[];
  presetTags: TagType[];
};

const TagModal = ({
  isVisible,
  onClose,
  onSave,
  initialTags,
  presetTags,
}: TagModalProps) => {
  const [selectedTags, setSelectedTags] = useState<TagType[]>(
    initialTags || [],
  );
  const [newTag, setNewTag] = useState('');

  const tagsList = [
    ...presetTags,
    ...selectedTags.filter(
      tag => !presetTags.some(preset => preset.id === tag.id),
    ),
  ];

  const handleAddTag = () => {
    const newTagObject = {id: Date.now(), tagName: newTag};
    setSelectedTags(prev => [...prev, newTagObject]);
    setNewTag('');
  };

  const handleTagToggle = (tag: TagType) => {
    if (selectedTags.some(selectedTag => selectedTag.id === tag.id)) {
      setSelectedTags(prev =>
        prev.filter(selectedTag => selectedTag.id !== tag.id),
      );
    } else {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  const handleSave = () => {
    onSave(selectedTags);
    onClose();
  };
  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <S.ModalOverlay>
        <S.ModalView>
          <S.InputRow>
            <CustomTextInput
              value={newTag}
              onChangeText={setNewTag}
              placeholder="새 태그 입력"
            />
            <S.ModalButton onPress={handleAddTag}>
              <S.AddButtonText>추가</S.AddButtonText>
            </S.ModalButton>
          </S.InputRow>
          <S.TagList>
            {tagsList.map(tag => (
              <S.TagButton
                key={tag.id}
                isSelected={selectedTags.some(
                  selectedTag => selectedTag.id === tag.id,
                )}
                onPress={() => handleTagToggle(tag)}>
                <S.TagText>{tag.tagName}</S.TagText>
              </S.TagButton>
            ))}
          </S.TagList>
          <S.ButtonContainer>
            <S.ModalButton onPress={handleSave}>
              <S.ModalButtonText>저장</S.ModalButtonText>
            </S.ModalButton>
            <S.ModalButton onPress={onClose} status="warning">
              <S.ModalButtonText>취소</S.ModalButtonText>
            </S.ModalButton>
          </S.ButtonContainer>
        </S.ModalView>
      </S.ModalOverlay>
    </Modal>
  );
};

export default TagModal;
