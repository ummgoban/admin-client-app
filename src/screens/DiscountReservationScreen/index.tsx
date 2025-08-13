import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {useDiscountReservations} from '@/apis/discount/query';
import {DiscountReservation} from '@/apis/discount/model';
import DiscountReservationModal from '@/components/discount/DiscountReservationModal';
import S from './DiscountReservationScreen.style';

const DiscountReservationScreen = () => {
  const {reservations, isLoading, error} = useDiscountReservations();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReservation, setSelectedReservation] =
    useState<DiscountReservation | null>(null);

  const handleOpenModal = (reservation: DiscountReservation | null) => {
    setSelectedReservation(reservation);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedReservation(null);
  };

  if (isLoading || !reservations) {
    return <S.LoadingText>로딩 중...</S.LoadingText>;
  }

  if (error) {
    return <S.ErrorText>오류가 발생했습니다.</S.ErrorText>;
  }

  return (
    <S.Container>
      <ScrollView>
        {reservations.map(item => (
          <S.ItemContainer key={item.discountReservationId}>
            <S.ItemText>
              할인율: {item.discountRate}% ({item.startAt} - {item.endAt})
            </S.ItemText>
            <S.ItemText>적용 상품: {item.products.length}개</S.ItemText>
            <S.EditButton onPress={() => handleOpenModal(item)}>
              <S.ButtonText>수정</S.ButtonText>
            </S.EditButton>
          </S.ItemContainer>
        ))}
        <S.CreateButton onPress={() => handleOpenModal(null)}>
          <S.ButtonText>예약 할인하기</S.ButtonText>
        </S.CreateButton>
      </ScrollView>
      <DiscountReservationModal
        isVisible={modalVisible}
        onClose={handleCloseModal}
        initialData={selectedReservation}
      />
    </S.Container>
  );
};

export default DiscountReservationScreen;
