import {deleteProduct, uploadProductImage} from '@/apis/Product';
import CustomTextInput from '@/components/common/CustomTextInput';
import {MenuType, TagType} from '@/types/ProductType';
import {pickImage} from '@/utils/image-picker';
import React, {useEffect, useState} from 'react';
import {Alert, Modal, SafeAreaView} from 'react-native';
import TextInput from '../common/TextInput/TextInput';
import CustomLabel from '../common/CustomLabel';
import TagModal from './TagModal';
import useProfile from '@/hooks/useProfile';
import Icon from 'react-native-vector-icons/EvilIcons';

import useProduct from '@/hooks/useProduct';

import S from './MenuModal.style';

// TODO : 태그 컴포넌트 디자인
type Props = {
  isVisible: boolean;
  onClose: () => void;
  onSave: (data: MenuType) => void;
  initialData: MenuType | null;
  presetTags: TagType[];
};
const STATUS_OPTIONS: Record<MenuType['productStatus'], string> = {
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

const MenuModal = ({
  isVisible,
  onClose,
  onSave,
  initialData,
  presetTags,
}: Props) => {
  const {profile} = useProfile();
  const [menuData, setMenuData] = useState<MenuType>({
    id: -1,
    name: '',
    image: '',
    discountRate: 0,
    originPrice: 0,
    discountPrice: 0,
    stock: 0,
    productStatus: 'HIDDEN',
    tags: [],
  });

  const {refresh} = useProduct();
  const [tagModalVisible, setTagModalVisible] = useState(false);
  const handleTagsUpdate = (updatedTags: MenuType['tags']) => {
    setMenuData(prev => ({...prev, tags: updatedTags}));
  };
  useEffect(() => {
    if (isVisible) {
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
          productStatus: 'HIDDEN',
          tags: [],
        });
      }
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

  const handleStatusChange = (productStatus: MenuType['productStatus']) => {
    setMenuData(prev => ({
      ...prev,
      productStatus,
    }));
  };

  const handleSave = async () => {
    const menuOriginPrice = Number(
      menuData.originPrice.toString().replace(/,/g, ''),
    );
    const menuDiscountPrice = Number(
      menuData.discountPrice.toString().replace(/,/g, ''),
    );
    const menuStock = Number(menuData.stock);
    const clientImage = menuData.image;

    if (
      !menuData.name.trim() ||
      menuOriginPrice <= 0 ||
      menuDiscountPrice <= 0 ||
      menuStock < 0
    ) {
      Alert.alert('입력 오류', '필수 항목을 전부 올바르게 입력해주세요!');
      return;
    }

    if (menuOriginPrice < menuDiscountPrice) {
      Alert.alert('가격 설정 오류', '할인가가 원가보다 클 수 없어요!');
      return;
    }

    const formdata = new FormData();
    formdata.append('updateImage', {
      name: clientImage.split('/').pop(),
      type: `image/jpeg`,
      uri: clientImage,
    });

    const s3Url = await uploadProductImage(profile?.marketId ?? 0, formdata);

    if (!s3Url) {
      Alert.alert('이미지 업로드에 실패했습니다.');
      return;
    }
    onSave({
      ...menuData,
      image: s3Url,
    });
  };

  const handleImageUpload = async () => {
    const res = await pickImage();

    if (!res) {
      console.error('pickImage Error: no image');
      Alert.alert('이미지를 불러오지 못했습니다.');
      return;
    }

    setMenuData(prev => ({
      ...prev,
      image: res,
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

            refresh();
          }

          onClose();
        },
      },
    ]);
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <S.ModalOverlay>
        <SafeAreaView>
          <S.ModalView>
            <S.ModalCloseButton onPress={onClose}>
              <Icon name="close" size={24} />
            </S.ModalCloseButton>
            <S.ModalScrollView>
              <S.ModalViewInner>
                <S.ModalImageWrapper onPress={handleImageUpload}>
                  {menuData.image ? (
                    <S.ModalImage source={{uri: menuData.image}} />
                  ) : (
                    <S.ModalButton onPress={handleImageUpload}>
                      <S.ModalButtonText>이미지 선택하기</S.ModalButtonText>
                    </S.ModalButton>
                  )}
                </S.ModalImageWrapper>
                <S.InputRow>
                  <TextInput
                    value={menuData.name}
                    placeholder="메뉴 이름 입력"
                    onChangeText={text => handleInputChange('name', text)}
                  />
                </S.InputRow>
                <S.InputRow>
                  <S.ModalButton onPress={() => setTagModalVisible(true)}>
                    <S.StatusButtonText>태그 추가하기</S.StatusButtonText>
                  </S.ModalButton>
                  <S.TagsFlexWrap>
                    {menuData.tags.map(tag => (
                      <S.TagButtonWrapper key={tag.id}>
                        <S.StatusButtonText>{tag.tagName}</S.StatusButtonText>
                      </S.TagButtonWrapper>
                    ))}
                  </S.TagsFlexWrap>
                </S.InputRow>
                <S.InputRow>
                  <CustomLabel label={'원가'} required />
                  <CustomTextInput
                    value={menuData.originPrice.toString()}
                    onChangeText={text =>
                      handleInputChange('originPrice', text)
                    }
                  />
                </S.InputRow>
                <S.InputRow>
                  <CustomLabel label={'할인가'} required />
                  <CustomTextInput
                    value={menuData.discountPrice.toString()}
                    onChangeText={text =>
                      handleInputChange('discountPrice', text)
                    }
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
                          handleStatusChange(
                            status as MenuType['productStatus'],
                          )
                        }
                        isActive={menuData.productStatus === status}>
                        <S.StatusButtonText>{label}</S.StatusButtonText>
                      </S.StatusButton>
                    ))}
                  </S.StatusButtonContainer>
                </S.InputRow>

                <S.ButtonContainer>
                  <S.ModalButton onPress={handleSave}>
                    <S.ModalButtonText>저장</S.ModalButtonText>
                  </S.ModalButton>
                  <S.ModalButton onPress={onClose} status="warning">
                    <S.ModalButtonText>취소</S.ModalButtonText>
                  </S.ModalButton>
                  {initialData && (
                    <S.ModalButton onPress={handleDelete} status="error">
                      <S.ModalButtonText>삭제</S.ModalButtonText>
                    </S.ModalButton>
                  )}
                </S.ButtonContainer>
                <TagModal
                  isVisible={tagModalVisible}
                  onClose={() => setTagModalVisible(false)}
                  onSave={handleTagsUpdate}
                  initialTags={initialData?.tags}
                  presetTags={presetTags}
                />
              </S.ModalViewInner>
            </S.ModalScrollView>
          </S.ModalView>
        </SafeAreaView>
      </S.ModalOverlay>
    </Modal>
  );
};

export default MenuModal;
