import React, {useState} from 'react';
import {Alert, useWindowDimensions} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Text} from 'react-native-paper';

import {BottomButton, Label} from '@/components/common';
import TextInput from '@/components/common/TextInput';
import {format} from '@/utils/date';
import {pickImage} from '@/utils/image-picker';

import S, {HORIZONTAL_MARGIN, IMAGE_CARD_GAP} from './MarketInfoScreen.style';

const timeOptions = {
  'market-open': '영업 시작 시간',
  'market-close': '영업 종료 시간',
  'pickup-start': '픽업 시작 시간',
  'pickup-end': '픽업 종료 시간',
} as const;

const MarketInfoScreen = () => {
  const {width} = useWindowDimensions();

  const [pickupStartTime, setPickupStartTime] = useState<Date>();
  const [pickupEndTime, setPickupEndTime] = useState<Date>();

  const [marketOpenTime, setMarketOpenTime] = useState<Date>();
  const [marketCloseTime, setMarketCloseTime] = useState<Date>();

  const [openModal, setOpenModal] = useState<
    keyof typeof timeOptions | undefined
  >(undefined);

  const [imageList, setImageList] = useState<string[]>([]);

  return (
    <S.Container>
      <S.ScrollView>
        <TextInput label={'상호명'} disabled placeholder="수미네반찬" />
        <TextInput
          label={'한 줄 소개'}
          required
          multiline
          limit={40}
          placeholder="가게소개를 입력해주세요"
        />
        <Label label={'영업 시간'} required />
        <S.TimeContainer>
          <S.TimePickerButton onPress={() => setOpenModal('market-open')}>
            {marketOpenTime
              ? format(marketOpenTime.getTime(), 'HH:mm')
              : timeOptions['market-open']}
          </S.TimePickerButton>
          <S.TimePickerButton onPress={() => setOpenModal('market-close')}>
            {marketCloseTime
              ? format(marketCloseTime.getTime(), 'HH:mm')
              : timeOptions['market-close']}
          </S.TimePickerButton>
        </S.TimeContainer>
        <Label label={'픽업 시간'} required />
        <S.TimeContainer>
          <S.TimePickerButton onPress={() => setOpenModal('pickup-start')}>
            {pickupStartTime
              ? format(pickupStartTime.getTime(), 'HH:mm')
              : timeOptions['pickup-start']}
          </S.TimePickerButton>
          <S.TimePickerButton onPress={() => setOpenModal('pickup-end')}>
            {pickupEndTime
              ? format(pickupEndTime.getTime(), 'HH:mm')
              : timeOptions['pickup-end']}
          </S.TimePickerButton>
        </S.TimeContainer>
        {/* TODO: 대표 사진 선택 */}
        <Label label={'대표 사진 선택'} required />
        <S.ImageCardGrid>
          {imageList.map(uri => {
            const cardWidth =
              (width - HORIZONTAL_MARGIN * 2 - IMAGE_CARD_GAP) / 2;
            return (
              <S.ImageCard key={uri} width={cardWidth}>
                <S.Image source={{uri}} width={cardWidth} />
                <S.DeleteButton
                  onPress={() => {
                    Alert.alert('삭제하시겠습니까?', '', [
                      {
                        text: '취소',
                        style: 'cancel',
                      },
                      {
                        text: '삭제',
                        style: 'destructive',
                        onPress: () => {
                          setImageList(prev =>
                            prev.filter(item => item !== uri),
                          );
                        },
                      },
                    ]);
                  }}>
                  <Text>X</Text>
                </S.DeleteButton>
              </S.ImageCard>
            );
          })}
        </S.ImageCardGrid>
        <S.ImageCardPlusButton
          onPress={async () => {
            const res = await pickImage();
            setImageList(prev => [...prev, res]);
          }}>
          <Text>+</Text>
        </S.ImageCardPlusButton>
      </S.ScrollView>
      <DatePicker
        modal
        open={!!openModal}
        mode="time"
        date={new Date('2024-01-01T08:00:00')}
        onConfirm={date => {
          switch (openModal) {
            case 'pickup-start':
              setPickupStartTime(date);
              break;
            case 'pickup-end':
              setPickupEndTime(date);
              break;
            case 'market-open':
              setMarketOpenTime(date);
              break;
            case 'market-close':
              setMarketCloseTime(date);
              break;
          }
          setOpenModal(undefined);
        }}
        onCancel={() => {
          setOpenModal(undefined);
        }}
      />
      <BottomButton
        onPress={() => {
          // TODO: fetch API 호출
          Alert.alert('저장되었습니다.');
        }}>
        저장
      </BottomButton>
    </S.Container>
  );
};

export default MarketInfoScreen;
