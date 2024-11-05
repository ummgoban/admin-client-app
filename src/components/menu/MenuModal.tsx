import React, {useState, useEffect} from 'react';
import {Alert, Modal} from 'react-native';
import {MenuType} from '@/types/MenuType';
import S from './MenuModal.style';
import {pickImage} from '@/utils/image-picker';
import CustomLabel from '../common/CustomLabel';
import CustomTextInput from '@/components/common/CustomTextInput';
import {TextInput} from '../common';
import {uploadProductImage} from '@/apis/Product';
// TODO : 태그 컴포넌트 넣기
// TODO : onSave시 post data
// TODO : 메뉴 추가시 id 처리(백엔드) -> 현재 Date.now()로 임시처리
type Props = {
  isVisible: boolean;
  onClose: () => void;
  onSave: (data: MenuType) => void;
  initialData: MenuType | null;
};
const STATUS_OPTIONS: Record<MenuType['status'], string> = {
  IN_STOCK: '판매중',
  OUT_OF_STOCK: '품절',
  HIDDEN: '숨김',
};

const calculateDiscountRate = (
  originalPrice: number,
  discountPrice: number,
) => {
  if (originalPrice > 0 && discountPrice >= 0) {
    return Math.round(((originalPrice - discountPrice) * 100) / originalPrice);
  }
  return 0;
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
    status: 'HIDDEN',
  });

  useEffect(() => {
    if (initialData) {
      setMenuData(initialData);
    } else {
      setMenuData({
        id: Date.now(),
        name: '',
        image: '',
        discountRate: 0,
        originalPrice: 0,
        discountPrice: 0,
        stock: 0,
        status: 'HIDDEN',
      });
    }
  }, [initialData, isVisible]);

  const handleInputChange = (field: keyof MenuType, value: string | number) => {
    let formattedValue = value;

    if (
      typeof value === 'string' &&
      (field === 'originalPrice' ||
        field === 'discountPrice' ||
        field === 'stock')
    ) {
      const numberValue = Number(value.replace(/[^0-9]/g, ''));
      formattedValue = numberValue.toLocaleString();
    }

    setMenuData(prev => {
      const updatedData = {
        ...prev,
        [field]: field === 'stock' ? Number(value) : formattedValue,
      };
      if (field === 'originalPrice' || field === 'discountPrice') {
        const newDiscountRate = calculateDiscountRate(
          Number(updatedData.originalPrice.toString().replace(/,/g, '')),
          Number(updatedData.discountPrice.toString().replace(/,/g, '')),
        );
        return {
          ...updatedData,
          discountRate: newDiscountRate,
        };
      }

      return updatedData;
    });
  };
  const handleStatusChange = (status: MenuType['status']) => {
    setMenuData(prev => ({
      ...prev,
      status,
    }));
  };
  const handleSave = () => {
    if (menuData) {
      onSave(menuData);
    }
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <S.ModalOverlay>
        <S.ModalView>
          <S.ModalImageWrapper
            onPress={async () => {
              const res = await pickImage();

              if (!res) {
                console.error('pickImage Error: no image');
                Alert.alert('이미지를 불러오지 못했습니다.');
                return;
              }

              const s3Url = await uploadProductImage({
                uri: res,
                name: 'menu',
              });

              if (!s3Url) {
                console.error('uploadProductImage Error: no s3Url');
                Alert.alert('이미지를 업로드하지 못했습니다.');
                return;
              }

              setMenuData(prev => ({
                ...prev,
                image: s3Url,
              }));
            }}>
            {menuData.image ? (
              <S.ModalImage source={{uri: menuData.image}} />
            ) : (
              <S.ModalButton
                onPress={async () => {
                  // TODO: 이미지 선택 로직
                  const res = await pickImage();
                  setMenuData(prev => ({
                    ...prev,
                    image: res || '',
                  }));
                }}>
                <S.ModalButtonText>이미지 선택하기</S.ModalButtonText>
              </S.ModalButton>
            )}
          </S.ModalImageWrapper>
          <TextInput
            value={menuData.name}
            onChangeText={text => handleInputChange('name', text)}
          />
          <S.InputRow>
            <S.InputLabel>...Tag....</S.InputLabel>
          </S.InputRow>
          <S.InputRow>
            <CustomLabel label={'원가'} required />
            <CustomTextInput
              value={menuData.originalPrice.toString()}
              onChangeText={text => handleInputChange('originalPrice', text)}
            />
          </S.InputRow>
          <S.InputRow>
            <CustomLabel label={'할인가'} required />
            <CustomTextInput
              value={menuData.discountPrice.toString()}
              onChangeText={text => handleInputChange('discountPrice', text)}
            />
          </S.InputRow>

          <S.InputRow>
            <S.InputLabel>적용 할인율</S.InputLabel>
            <CustomTextInput
              value={menuData.discountRate.toString() + '%'}
              disabled
            />
          </S.InputRow>
          <S.InputRow>
            <CustomLabel label={'재고'} required />
            <CustomTextInput
              value={menuData.stock.toString()}
              onChangeText={text => handleInputChange('stock', text)}
            />
          </S.InputRow>
          <S.InputRow>
            <S.InputLabel>판매 상태</S.InputLabel>
            <S.StatusButtonContainer>
              {Object.entries(STATUS_OPTIONS).map(([status, label]) => (
                <S.StatusButton
                  key={status}
                  onPress={() =>
                    handleStatusChange(status as MenuType['status'])
                  }
                  isActive={menuData.status === status}>
                  <S.StatusButtonText>{label}</S.StatusButtonText>
                </S.StatusButton>
              ))}
            </S.StatusButtonContainer>
          </S.InputRow>

          <S.ButtonContainer>
            <S.ModalButton onPress={handleSave}>
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
