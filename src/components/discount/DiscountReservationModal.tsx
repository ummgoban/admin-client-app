import React, {useState, useEffect} from 'react';
import {Modal, Alert, Platform, SafeAreaView} from 'react-native';
import useProduct from '@/hooks/useProduct';
import {useDiscountReservations} from '@/apis/discount/query';
import {DiscountReservation} from '@/apis/discount/model';
import CustomTextInput from '../common/CustomTextInput';
import S from './DiscountReservationModal.style';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  initialData: DiscountReservation | null;
};

const DiscountReservationModal = ({isVisible, onClose, initialData}: Props) => {
  const {products, fetch: fetchProducts} = useProduct();
  const {createReservation, updateReservation, deleteReservation} =
    useDiscountReservations();

  const [discountRate, setDiscountRate] = useState('');
  const [startAt, setStartAt] = useState('');
  const [endAt, setEndAt] = useState('');
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

  useEffect(() => {
    if (isVisible) {
      fetchProducts();
      if (initialData) {
        setDiscountRate(initialData.discountRate.toString());
        setStartAt(initialData.startAt);
        setEndAt(initialData.endAt);
        setSelectedProductIds(initialData.products.map(p => p.id));
      } else {
        setDiscountRate('');
        setStartAt('');
        setEndAt('');
        setSelectedProductIds([]);
      }
    }
  }, [initialData, isVisible, fetchProducts]);

  const handleToggleProduct = (productId: number, isDisabled: boolean) => {
    if (isDisabled) return;

    setSelectedProductIds(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId],
    );
  };

  const handleSave = async () => {
    const rate = parseInt(discountRate, 10);
    if (
      !rate ||
      rate <= 0 ||
      rate > 100 ||
      !startAt ||
      !endAt ||
      selectedProductIds.length === 0
    ) {
      Alert.alert('입력 오류', '모든 필드를 올바르게 입력해주세요.');
      return;
    }

    try {
      if (initialData) {
        await updateReservation({
          discountReservationId: initialData.discountReservationId,
          productIds: selectedProductIds,
          discountRate: rate,
          startAt,
          endAt,
        });
        Alert.alert('성공', '예약 할인이 수정되었습니다.');
      } else {
        await createReservation({
          productIds: selectedProductIds,
          discountRate: rate,
          startAt,
          endAt,
        });
        Alert.alert('성공', '새로운 예약 할인이 생성되었습니다.');
      }
      onClose();
    } catch (e) {
      Alert.alert('오류', '저장에 실패했습니다.');
    }
  };

  const handleDelete = async () => {
    if (!initialData) return;

    Alert.alert('삭제 확인', '정말로 이 예약을 삭제하시겠습니까?', [
      {text: '취소', style: 'cancel'},
      {
        text: '삭제',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteReservation(initialData.discountReservationId);
            Alert.alert('성공', '예약이 삭제되었습니다.');
            onClose();
          } catch (e) {
            Alert.alert('오류', '삭제에 실패했습니다.');
          }
        },
      },
    ]);
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <S.ModalOverlay>
        <SafeAreaView style={{flex: 1, width: '100%'}}>
          <S.Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <S.ModalView>
              <S.ModalTitle>
                {initialData ? '예약 할인 수정' : '새 예약 할인'}
              </S.ModalTitle>

              <S.InputRow>
                <S.InputLabel>상품 선택</S.InputLabel>
                <S.ProductListContainer>
                  {products.map(product => {
                    // [ ✨ 수정된 부분 ✨ ]
                    const isReservedByAnother =
                      product.reservationStatus !== null;
                    const isPartOfCurrentReservation =
                      initialData?.products.some(p => p.id === product.id) ??
                      false;
                    const isDisabled =
                      isReservedByAnother && !isPartOfCurrentReservation;

                    return (
                      <S.ProductItem
                        key={product.id}
                        onPress={() =>
                          handleToggleProduct(product.id, isDisabled)
                        }
                        isSelected={selectedProductIds.includes(product.id)}
                        disabled={isDisabled}>
                        <S.ProductItemText disabled={isDisabled}>
                          {product.name}
                        </S.ProductItemText>
                      </S.ProductItem>
                    );
                  })}
                </S.ProductListContainer>
              </S.InputRow>

              <S.InputRow>
                <S.InputLabel>할인율 (%)</S.InputLabel>
                <CustomTextInput
                  value={discountRate}
                  onChangeText={setDiscountRate}
                  keyboardType="number-pad"
                />
              </S.InputRow>

              <S.InputRow>
                <S.InputLabel>시작 시간 (HH:MM)</S.InputLabel>
                <CustomTextInput value={startAt} onChangeText={setStartAt} />
              </S.InputRow>

              <S.InputRow>
                <S.InputLabel>종료 시간 (HH:MM)</S.InputLabel>
                <CustomTextInput value={endAt} onChangeText={setEndAt} />
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
            </S.ModalView>
          </S.Container>
        </SafeAreaView>
      </S.ModalOverlay>
    </Modal>
  );
};

export default DiscountReservationModal;
