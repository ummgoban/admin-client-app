import React, {useState, useEffect} from 'react';
import {Modal, Alert, Platform} from 'react-native';
import useProduct from '@/hooks/useProduct';
import {useDiscountReservations} from '@/apis/discount/query';
import {DiscountReservation} from '@/apis/discount/model';
import CustomTextInput from '../common/CustomTextInput';
import S from './DiscountReservationModal.style';

import DatePicker from 'react-native-date-picker';
import {format} from '@/utils/date';

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

  const [pickerVisibleFor, setPickerVisibleFor] = useState<
    'startAt' | 'endAt' | null
  >(null);

  const selectedProducts = products.filter(p =>
    selectedProductIds.includes(p.id),
  );

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

  const getPickerDefaultDate = () => {
    const timeString = pickerVisibleFor === 'startAt' ? startAt : endAt;
    const defaultDate = new Date();
    if (timeString) {
      const [hours, minutes] = timeString.split(':').map(Number);
      defaultDate.setHours(hours, minutes, 0, 0);
    }
    return defaultDate;
  };

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
      Alert.alert('입력 오류', '모든 값을 올바르게 입력해주세요.');
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
        <S.SafeArea>
          <S.Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <S.ModalView>
              <S.ModalTitle>
                {initialData ? '예약 할인 수정' : '새 예약 할인'}
              </S.ModalTitle>

              <S.InputRow>
                <S.InputLabel>상품 선택</S.InputLabel>
                <S.ProductListContainer>
                  {products.map(product => {
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
                <S.AlertText>예약 할인은 상품당 1개만 가능합니다.</S.AlertText>
              </S.InputRow>

              <S.InputRow>
                <S.InputLabel>선택된 반찬</S.InputLabel>
                <S.SelectedProductsContainer>
                  {selectedProducts.length > 0 ? (
                    selectedProducts.map(product => (
                      <S.ProductTag key={product.id}>
                        <S.ProductTagText>{product.name}</S.ProductTagText>
                      </S.ProductTag>
                    ))
                  ) : (
                    <S.PlaceholderText>상품을 선택해주세요.</S.PlaceholderText>
                  )}
                </S.SelectedProductsContainer>
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
                <S.InputLabel>할인 시간</S.InputLabel>
                <S.TimeRangeContainer>
                  <S.TimeInputTouchable
                    onPress={() => setPickerVisibleFor('startAt')}>
                    <S.TimeInputText>{startAt || '시작 시간'}</S.TimeInputText>
                  </S.TimeInputTouchable>
                  <S.TimeInputText>~ </S.TimeInputText>
                  <S.TimeInputTouchable
                    onPress={() => setPickerVisibleFor('endAt')}>
                    <S.TimeInputText>{endAt || '종료 시간'}</S.TimeInputText>
                  </S.TimeInputTouchable>
                </S.TimeRangeContainer>
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

          <DatePicker
            modal
            open={!!pickerVisibleFor}
            mode="time"
            date={getPickerDefaultDate()}
            minuteInterval={10}
            onConfirm={date => {
              const formattedTime = format(date.getTime(), 'HH:mm');
              if (pickerVisibleFor === 'startAt') {
                setStartAt(formattedTime);
              } else if (pickerVisibleFor === 'endAt') {
                setEndAt(formattedTime);
              }
              setPickerVisibleFor(null);
            }}
            onCancel={() => {
              setPickerVisibleFor(null);
            }}
            title={
              pickerVisibleFor === 'startAt'
                ? '시작 시간 선택'
                : '종료 시간 선택'
            }
            confirmText="확인"
            cancelText="취소"
          />
        </S.SafeArea>
      </S.ModalOverlay>
    </Modal>
  );
};

export default DiscountReservationModal;
