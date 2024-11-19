import {deleteProduct, uploadProductImage} from '@/apis/Product';
import CustomTextInput from '@/components/common/CustomTextInput';
import {MenuType} from '@/types/ProductType';
import {pickImage} from '@/utils/image-picker';
import React, {useEffect, useState} from 'react';
import {Alert, Modal} from 'react-native';
import {TextInput} from '../common';
import CustomLabel from '../common/CustomLabel';

import useMarket from '@/hooks/useMarket';
import useProduct from '@/hooks/useProduct';

import S from './MenuModal.style';

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

const calculateDiscountRate = (originPrice: number, discountPrice: number) => {
  if (originPrice > 0 && discountPrice >= 0) {
    return Math.round(((originPrice - discountPrice) * 100) / originPrice);
  }
  return 0;
};

const MenuModal = ({isVisible, onClose, onSave, initialData}: Props) => {
  const [menuData, setMenuData] = useState<MenuType>({
    id: -1,
    name: '',
    image: '',
    discountRate: 0,
    originPrice: 0,
    discountPrice: 0,
    stock: 0,
    status: 'HIDDEN',
  });

  const {refresh} = useProduct();
  const {market} = useMarket();

  useEffect(() => {
    if (initialData) {
      setMenuData(initialData);
    } else {
      setMenuData({
        id: Date.now(),
        name: '',
        image: '',
        discountRate: 0,
        originPrice: 0,
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
      (field === 'originPrice' ||
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
      if (field === 'originPrice' || field === 'discountPrice') {
        const newDiscountRate = calculateDiscountRate(
          Number(updatedData.originPrice.toString().replace(/,/g, '')),
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

  const handleImageUpload = async () => {
    const res = await pickImage();

    if (!res) {
      console.error('pickImage Error: no image');
      Alert.alert('이미지를 불러오지 못했습니다.');
      return;
    }

    const formdata = new FormData();

    formdata.append('updateImage', {
      name: res.split('/').pop(),
      type: `image/jpeg`,
      uri: res,
    });

    const s3Url = await uploadProductImage(formdata);

    if (!s3Url) {
      console.error('uploadProductImage Error: no s3Url');
      Alert.alert('이미지를 업로드하지 못했습니다.');
      return;
    }

    console.debug('MenuModal', 's3Url', s3Url);

    setMenuData(prev => ({
      ...prev,
      image: s3Url,
    }));
  };

  const handleDelete = async () => {
    Alert.alert('삭제하시겠습니까?', '', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '삭제',
        onPress: async () => {
          const res = await deleteProduct(menuData.id);

          if (!res) {
            console.error('deleteProduct Error: delete failed');
            Alert.alert('삭제하지 못했습니다.');
          } else {
            console.debug('deleteProduct', 'delete success');
            Alert.alert('삭제되었습니다.');

            refresh(market[0].id);
          }

          onClose();
        },
      },
    ]);
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <S.ModalOverlay>
        <S.ModalView>
          <S.ModalImageWrapper onPress={handleImageUpload}>
            {menuData.image ? (
              <S.ModalImage source={{uri: menuData.image}} />
            ) : (
              <S.ModalButton onPress={handleImageUpload}>
                <S.ModalButtonText>이미지 선택하기</S.ModalButtonText>
              </S.ModalButton>
            )}
          </S.ModalImageWrapper>
          <TextInput
            value={menuData.name}
            onChangeText={text => handleInputChange('name', text)}
          />
          {/* TODO: 메뉴태그 선택 */}
          {/* <S.InputRow>
            <DropDownSelectorComponent />
          </S.InputRow> */}
          <S.InputRow>
            <CustomLabel label={'원가'} required />
            <CustomTextInput
              value={menuData.originPrice.toString()}
              onChangeText={text => handleInputChange('originPrice', text)}
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
            <S.ModalButton onPress={handleDelete}>
              <S.ModalButtonText>삭제</S.ModalButtonText>
            </S.ModalButton>
          </S.ButtonContainer>
        </S.ModalView>
      </S.ModalOverlay>
    </Modal>
  );
};

export default MenuModal;
