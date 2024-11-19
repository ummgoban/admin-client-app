import React, {useEffect, useState} from 'react';
import {Alert, useWindowDimensions, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Text} from 'react-native-paper';

import {
  deleteMarketImage,
  updateMarketInfo,
  uploadMarketImage,
} from '@/apis/Market';
import {BottomButton, Label} from '@/components/common';
import TextInput from '@/components/common/TextInput';
import {format} from '@/utils/date';
import {pickImage} from '@/utils/image-picker';
import useMarket from '@/hooks/useMarket';
import useProfile from '@/hooks/useProfile';

import S, {HORIZONTAL_MARGIN, IMAGE_CARD_GAP} from './MarketInfoScreen.style';
import {useNavigation} from '@react-navigation/native';

const timeOptions = {
  'market-open': '영업 시작 시간',
  'market-close': '영업 종료 시간',
  'pickup-start': '픽업 시작 시간',
  'pickup-end': '픽업 종료 시간',
} as const;

const MarketInfoScreen = () => {
  const {marketInfo, fetchMarket} = useMarket();
  const {fetch: fetchProfile} = useProfile();

  const {width} = useWindowDimensions();

  const navigation = useNavigation();

  const [summary, setSummary] = useState<string>();
  const [pickupStartTime, setPickupStartTime] = useState<Date>();
  const [pickupEndTime, setPickupEndTime] = useState<Date>();
  const [marketOpenTime, setMarketOpenTime] = useState<Date>();
  const [marketCloseTime, setMarketCloseTime] = useState<Date>();
  const [imageList, setImageList] = useState<string[]>([]);

  const [openModal, setOpenModal] = useState<
    keyof typeof timeOptions | undefined
  >(undefined);

  useEffect(() => {
    fetchMarket();
  }, [fetchMarket]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (!marketInfo) {
    return (
      <View>
        <Text>{'마켓 정보를 불러오는 중입니다.'}</Text>
      </View>
    );
  }

  return (
    <S.Container>
      <S.ScrollView>
        <TextInput label={'상호명'} disabled placeholder={marketInfo?.name} />
        <TextInput
          label={'한 줄 소개'}
          required
          multiline
          limit={40}
          value={summary}
          onChange={e => setSummary(e.nativeEvent.text)}
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
                        onPress: async () => {
                          const res = await deleteMarketImage(uri);
                          if (!res) {
                            console.error('deleteMarketImage Error: no res');
                            Alert.alert('이미지를 삭제하지 못했습니다.');
                            return;
                          }

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

            const s3Url = await uploadMarketImage(formdata);

            if (!s3Url) {
              console.error('uploadMarketImage Error: no s3Url');
              Alert.alert('이미지를 업로드하지 못했습니다.');
              return;
            }

            setImageList(prev => [...prev, s3Url]);
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
        onPress={async () => {
          if (
            !pickupStartTime ||
            !pickupEndTime ||
            !marketOpenTime ||
            !marketCloseTime ||
            !imageList.length ||
            !summary
          ) {
            Alert.alert('필수 입력사항을 모두 입력해주세요.');
            return;
          }

          const res = await updateMarketInfo(marketInfo.id, {
            pickupStartAt: format(pickupStartTime.getTime(), 'HH:mm'),
            pickupEndAt: format(pickupEndTime.getTime(), 'HH:mm'),
            openAt: format(marketOpenTime.getTime(), 'HH:mm'),
            closeAt: format(marketCloseTime.getTime(), 'HH:mm'),
            imageUrls: imageList,
            summary,
          });

          if (!res) {
            console.error('updateMarketInfo Error: no res');
            Alert.alert('마켓 정보를 저장하지 못했습니다.');
            return;
          }

          Alert.alert('마켓 정보가 저장되었습니다.');
          navigation.goBack();
        }}>
        저장
      </BottomButton>
    </S.Container>
  );
};

export default MarketInfoScreen;
