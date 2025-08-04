import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {RefreshControl} from 'react-native-gesture-handler';
import {Text} from 'react-native-paper';

import {updateMarketInfo} from '@/apis/Market';
import {BottomButton, CustomCheckbox, Label} from '@/components/common';
import EmptyMarket from '@/components/common/EmptyMarket';
import NonRegister from '@/components/common/NonRegister';
import TextInput from '@/components/common/TextInput/TextInput';
import useProfile from '@/hooks/useProfile';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';
import {RootStackParamList} from '@/types/StackNavigationType';
import {format} from '@/utils/date';

import {WEEKDAYS, OpenHour, dayMap} from '@ummgoban/shared';

import {useQueryClient} from '@tanstack/react-query';
import S from './MarketInfoScreen.style';
import {useReadManagers} from '@/apis/managers';
import ManagerLists from '@/components/manager/ManagerLists';
import useMarket from '@/hooks/useMarket';

const MarketInfoScreen = () => {
  const {profile} = useProfile();
  const queryClient = useQueryClient();
  const {marketInfo} = useMarket();

  // const {data: marketInfo} = useGetMarket(profile?.marketId);
  const {data: managersInfo} = useReadManagers(profile?.marketId ?? 0);

  const {refreshing, onRefresh} = usePullDownRefresh(async () => {
    await queryClient.invalidateQueries({
      queryKey: ['market', profile?.marketId],
    });
  });

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const isEditPermission =
    managersInfo?.find(manager => manager.id === profile?.id)?.marketRole ===
    'ROLE_STORE_OWNER';

  // TODO: 임시 휴무 스위치 버튼
  // const [isTempClosing, setIsTempClosing] = useState(false);

  const [summary, setSummary] = useState<string>();
  const [marketName, setMarketName] = useState<string>('');

  // const [imageList, setImageList] = useState<string[]>([]);

  const [openModal, setOpenModal] = useState<{
    type: 'open' | 'close';
    index: number;
  } | null>(null);

  const [openHours, setOpenHours] = useState<OpenHour[]>(
    WEEKDAYS.map(day => ({
      dayOfWeek: day,
      openTime: '',
      closeTime: '',
    })),
  );

  useEffect(() => {
    if (marketInfo) {
      setMarketName(marketInfo.name);
      setSummary(marketInfo.summary);

      const newOpenHours = WEEKDAYS.map(day => {
        const found = marketInfo.openHours.find(h => h.dayOfWeek === day);

        return {
          dayOfWeek: day,
          openTime: found?.openTime ?? '',
          closeTime: found?.closeTime ?? '',
        };
      });
      setOpenHours(newOpenHours);
    }
  }, [marketInfo]);

  if (!profile) {
    return <NonRegister />;
  }

  if (!marketInfo) {
    return <EmptyMarket />;
  }

  return (
    <S.Container>
      <S.ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }>
        <S.InputContainer>
          <TextInput
            label={'상호명'}
            value={marketName}
            placeholder={marketName}
            onChange={e => setMarketName(e.nativeEvent.text)}
          />
          <TextInput
            label={'한 줄 소개'}
            value={summary}
            onChange={e => setSummary(e.nativeEvent.text)}
            placeholder="가게소개를 입력해주세요"
            disabled={!isEditPermission}
          />
          {/* <Label label={'임시 휴무'} /> */}
          {/* TODO: 스위치 버튼으로 임시 휴무 */}
          <Label label={'영업시간'} required />

          <S.BusinessTimeInput>
            <S.TimeHeader>
              <S.DayHeaderText>요일</S.DayHeaderText>
              <S.TimeHeaderText>영업시간</S.TimeHeaderText>
              <S.ClosedHeaderText>휴업</S.ClosedHeaderText>
            </S.TimeHeader>

            {openHours.map((item, idx) => {
              const isClosed =
                item.openTime === '00:00' && item.closeTime === '00:00';

              return (
                <S.TimeContainer key={item.dayOfWeek}>
                  <S.DayText>{dayMap[item.dayOfWeek]}</S.DayText>

                  <S.TimeRange>
                    <S.TimePickerButton
                      onPress={() => setOpenModal({type: 'open', index: idx})}
                      disabled={!isEditPermission || isClosed}>
                      {/* FIXME: openHours.openTime 타입 string으로 고정 */}
                      {item.openTime as string}
                    </S.TimePickerButton>
                    <Text>~</Text>
                    <S.TimePickerButton
                      onPress={() => setOpenModal({type: 'close', index: idx})}
                      disabled={!isEditPermission || isClosed}>
                      {item.closeTime as string}
                    </S.TimePickerButton>
                  </S.TimeRange>
                  <S.ClosedCheckboxWrapper>
                    <CustomCheckbox
                      checked={isClosed}
                      onPress={() => {
                        setOpenHours(prev => {
                          const updated = [...prev];
                          const target = updated[idx];
                          updated[idx] = {
                            ...target,
                            openTime: !isClosed ? '00:00' : '12:00',
                            closeTime: !isClosed ? '00:00' : '18:00',
                          };
                          return updated;
                        });
                      }}
                    />
                  </S.ClosedCheckboxWrapper>
                </S.TimeContainer>
              );
            })}
          </S.BusinessTimeInput>

          {/* <Label label={'픽업 시간'} required />
          <S.TimeContainer>
            <S.TimePickerButton
              onPress={() => setOpenModal('pickup-start')}
              disabled={!isEditPermission}>
              {pickupStartTime
                ? format(pickupStartTime.getTime(), 'HH:mm')
                : timeOptions['pickup-start']}
            </S.TimePickerButton>
            <Text>{'~'}</Text>
            <S.TimePickerButton
              onPress={() => setOpenModal('pickup-end')}
              disabled={!isEditPermission}>
              {pickupEndTime
                ? format(pickupEndTime.getTime(), 'HH:mm')
                : timeOptions['pickup-end']}
            </S.TimePickerButton>
          </S.TimeContainer> */}

          <Label label={'직원 목록'} />
          {profile?.marketId && (
            <ManagerLists
              managers={managersInfo}
              marketId={profile?.marketId}
              isEditPermission={!isEditPermission}
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
        </S.InputContainer>
      </S.ScrollView>
      <DatePicker
        modal
        open={!!openModal}
        mode="time"
        date={new Date('2025-01-01T08:00:00')}
        onConfirm={date => {
          if (openModal) {
            const formatted = format(date.getTime(), 'HH:mm');
            setOpenHours(prev => {
              const updated = [...prev];
              if (openModal.type === 'open') {
                updated[openModal.index].openTime = formatted;
              } else {
                updated[openModal.index].closeTime = formatted;
              }
              return updated;
            });
          }
          setOpenModal(null);
        }}
        onCancel={() => setOpenModal(null)}
        minuteInterval={30}
        cancelText="취소"
        confirmText="확인"
        title={
          openModal
            ? `${dayMap[openHours[openModal.index].dayOfWeek]} ${
                openModal.type === 'open' ? '시작' : '종료'
              } 시간`
            : undefined
        }
      />

      <BottomButton
        onPress={async () => {
          console.log(openHours);
          if (!summary || openHours.some(h => !h.openTime || !h.closeTime)) {
            Alert.alert('필수 입력사항을 모두 입력해주세요.');
            return;
          }

          const openHoursPayload = openHours.map(h => ({
            dayOfWeek: h.dayOfWeek,
            openTime: h.openTime,
            closeTime: h.closeTime,
          }));

          const res = await updateMarketInfo(marketInfo.id, {
            marketName,
            summary,
            openHours: openHoursPayload,
          });

          if (!res) {
            console.error('updateMarketInfo Error: no res');
            Alert.alert('가게 정보를 저장하지 못했습니다.');
            return;
          }

          Alert.alert('가게 정보가 저장되었습니다.');
          navigation.goBack();
        }}
        disabled={!isEditPermission}>
        저장
      </BottomButton>
    </S.Container>
  );
};

export default MarketInfoScreen;
