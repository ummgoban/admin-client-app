import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {RefreshControl} from 'react-native-gesture-handler';
import {Text} from 'react-native-paper';

import {updateMarketInfo} from '@/apis/Market';
import {useGetMarket} from '@/apis/markets';
import {BottomButton, Label} from '@/components/common';
import EmptyMarket from '@/components/common/EmptyMarket';
import NonRegister from '@/components/common/NonRegister';
import TextInput from '@/components/common/TextInput/TextInput';
import useProfile from '@/hooks/useProfile';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';
import {RootStackParamList} from '@/types/StackNavigationType';
import {format} from '@/utils/date';

import {useQueryClient} from '@tanstack/react-query';
import S from './MarketInfoScreen.style';
import {useReadManagers} from '@/apis/managers';
import ManagerLists from '@/components/manager/ManagerLists';

const timeOptions = {
  'market-open': '영업 시작 시간',
  'market-close': '영업 종료 시간',
  'pickup-start': '픽업 시작 시간',
  'pickup-end': '픽업 종료 시간',
} as const;

const MarketInfoScreen = () => {
  const {profile} = useProfile();
  const queryClient = useQueryClient();
  const {data: marketInfo} = useGetMarket(profile?.marketId);
  const {data: managersInfo} = useReadManagers(profile?.marketId);

  const {refreshing, onRefresh} = usePullDownRefresh(async () => {
    await queryClient.invalidateQueries({
      queryKey: ['market', profile?.marketId],
    });
  });

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const isEditPermssion =
    managersInfo?.find(manager => manager.id === profile?.id)?.marketRole ===
    'ROLE_STORE_OWNER';

  // TODO: 임시 휴무 스위치 버튼
  // const [isTempClosing, setIsTempClosing] = useState(false);

  const [summary, setSummary] = useState<string>();
  const [pickupStartTime, setPickupStartTime] = useState<Date>();
  const [pickupEndTime, setPickupEndTime] = useState<Date>();
  const [marketOpenTime, setMarketOpenTime] = useState<Date>();
  const [marketCloseTime, setMarketCloseTime] = useState<Date>();

  // const [imageList, setImageList] = useState<string[]>([]);

  const [openModal, setOpenModal] = useState<
    keyof typeof timeOptions | undefined
  >(undefined);

  useEffect(() => {
    if (marketInfo) {
      setSummary(marketInfo.summary);

      if (marketInfo.pickupStartAt) {
        setPickupStartTime(new Date(`2024-01-01T${marketInfo.pickupStartAt}`));
      }
      if (marketInfo.pickupEndAt) {
        setPickupEndTime(new Date(`2024-01-01T${marketInfo.pickupEndAt}`));
      }
      if (marketInfo.openAt) {
        setMarketOpenTime(new Date(`2024-01-01T${marketInfo.openAt}`));
      }
      if (marketInfo.closeAt) {
        setMarketCloseTime(new Date(`2024-01-01T${marketInfo.closeAt}`));
      }
      // setImageList(marketInfo.imageUrls);
    }
  }, [marketInfo]);

  if (!profile) {
    return <NonRegister />;
  }

  if (!marketInfo) {
    return <EmptyMarket />;
  }
  console.log(isEditPermssion);
  return (
    <S.Container>
      <S.ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }>
        <TextInput label={'상호명'} placeholder={marketInfo?.name} disabled />
        <TextInput
          label={'한 줄 소개'}
          multiline
          maxLength={40}
          value={summary}
          onChange={e => setSummary(e.nativeEvent.text)}
          placeholder="가게소개를 입력해주세요"
          disabled={!isEditPermssion}
        />
        {/* <Label label={'임시 휴무'} /> */}
        {/* TODO: 스위치 버튼으로 임시 휴무 */}
        <Label label={'영업 시간'} required />
        <S.TimeContainer>
          <S.TimePickerButton
            onPress={() => setOpenModal('market-open')}
            disabled={!isEditPermssion}>
            {marketOpenTime
              ? format(marketOpenTime.getTime(), 'HH:mm')
              : timeOptions['market-open']}
          </S.TimePickerButton>
          <Text>{'~'}</Text>
          <S.TimePickerButton
            onPress={() => setOpenModal('market-close')}
            disabled={!isEditPermssion}>
            {marketCloseTime
              ? format(marketCloseTime.getTime(), 'HH:mm')
              : timeOptions['market-close']}
          </S.TimePickerButton>
        </S.TimeContainer>
        <Label label={'픽업 시간'} required />
        <S.TimeContainer>
          <S.TimePickerButton
            onPress={() => setOpenModal('pickup-start')}
            disabled={!isEditPermssion}>
            {pickupStartTime
              ? format(pickupStartTime.getTime(), 'HH:mm')
              : timeOptions['pickup-start']}
          </S.TimePickerButton>
          <Text>{'~'}</Text>
          <S.TimePickerButton
            onPress={() => setOpenModal('pickup-end')}
            disabled={!isEditPermssion}>
            {pickupEndTime
              ? format(pickupEndTime.getTime(), 'HH:mm')
              : timeOptions['pickup-end']}
          </S.TimePickerButton>
        </S.TimeContainer>

        <Label label={'직원 목록'} />
        {profile?.marketId && (
          <ManagerLists
            managers={managersInfo}
            marketId={profile?.marketId}
            isEditPermssion={!isEditPermssion}
          />
        )}
        {/* TODO: 대표 사진 선택 */}
        {/* <Label label={'대표 사진 선택'} required />
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
        </S.ImageCardPlusButton> */}
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
        minuteInterval={30}
        cancelText="취소"
        confirmText="확인"
        title={openModal ? timeOptions[openModal] : undefined}
      />
      <BottomButton
        onPress={async () => {
          if (
            !pickupStartTime ||
            !pickupEndTime ||
            !marketOpenTime ||
            !marketCloseTime ||
            // !imageList.length ||
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
            // imageUrls: imageList,
            summary,
          });

          if (!res) {
            console.error('updateMarketInfo Error: no res');
            Alert.alert('마켓 정보를 저장하지 못했습니다.');
            return;
          }

          Alert.alert('마켓 정보가 저장되었습니다.');
          navigation.goBack();
        }}
        disabled={!isEditPermssion}>
        저장
      </BottomButton>
    </S.Container>
  );
};

export default MarketInfoScreen;
