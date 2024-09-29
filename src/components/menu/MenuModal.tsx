import React, {useState, useEffect} from 'react';
import {Modal} from 'react-native';
import {MenuType} from '@/types/MenuType';
import S from './MenuModal.style';
type Props = {
  isVisible: boolean;
  onClose: () => void;
  onSave: (data: MenuType) => void;
  initialData: MenuType | null;
};

const MenuModal = ({isVisible, onClose, onSave, initialData}: Props) => {
  const [menuData, setMenuData] = useState<MenuType>({
    id: -1,
    name: '',
    image: '',
    discountRate: 0,
    originalPrice: 0,
    discountPrice: 0,
    stock: 0,
  });

  useEffect(() => {
    console.log('initial data: ', initialData);
    if (initialData) {
      setMenuData(initialData);
    } else {
      setMenuData({
        id: -1,
        name: '',
        image: '',
        discountRate: 0,
        originalPrice: 0,
        discountPrice: 0,
        stock: 0,
      });
    }
  }, [initialData]);

  const handleInputChange = (field: keyof MenuType, value: string | number) => {
    setMenuData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <S.ModalOverlay>
        <S.ModalView>
          <S.InputRow>
            <S.InputLabel>메뉴이름</S.InputLabel>
            <S.TextInputContainer
              placeholder="메뉴 이름"
              value={menuData.name}
              onChangeText={text => handleInputChange('name', text)}
            />
            <S.InputLabelTail>{` `}</S.InputLabelTail>
          </S.InputRow>
          <S.InputRow>
            <S.InputLabel>원가</S.InputLabel>
            <S.TextInputContainer
              placeholder="원가"
              value={menuData.originalPrice.toString()}
              onChangeText={text => handleInputChange('originalPrice', text)}
            />
            <S.InputLabelTail>원</S.InputLabelTail>
          </S.InputRow>
          <S.InputRow>
            <S.InputLabel>할인가</S.InputLabel>
            <S.TextInputContainer
              placeholder="할인 가격"
              value={menuData.discountPrice.toString()}
              onChangeText={text => handleInputChange('discountPrice', text)}
            />
            <S.InputLabelTail>원</S.InputLabelTail>
          </S.InputRow>
          <S.InputRow>
            <S.InputLabel>할인율</S.InputLabel>
            <S.TextInputContainer
              placeholder="할인율"
              value={menuData.discountRate.toString()}
              onChangeText={text => handleInputChange('discountRate', text)}
            />
            <S.InputLabelTail>%</S.InputLabelTail>
          </S.InputRow>
          <S.InputRow>
            <S.InputLabel>재고</S.InputLabel>
            <S.TextInputContainer
              placeholder="재고"
              value={menuData.stock.toString()}
              onChangeText={text => handleInputChange('stock', text)}
            />
            <S.InputLabelTail>개</S.InputLabelTail>
          </S.InputRow>

          <S.ButtonContainer>
            <S.ModalButton onPress={() => onSave(menuData)}>
              <S.ModalButtonText>저장</S.ModalButtonText>
            </S.ModalButton>
            <S.ModalButton onPress={onClose}>
              <S.ModalButtonText>취소</S.ModalButtonText>
            </S.ModalButton>
          </S.ButtonContainer>
        </S.ModalView>
      </S.ModalOverlay>
    </Modal>
  );
};

export default MenuModal;
