import messaging from '@react-native-firebase/messaging';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  AppState,
  AppStateStatus,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import {Button, Modal, Portal, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {useQueryClient} from '@tanstack/react-query';

import {registerFCMToken} from '@/apis/fcm';

import EmptyMarket from '@/components/common/EmptyMarket';
import SwitchContainer from '@/components/common/SwitchContainer';
2;
import useProfile from '@/hooks/useProfile';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';
import {RootStackParamList} from '@/types/StackNavigationType';
import NavigationTextButton from '@/components/common/NavigationTextButton';

import {
  changeNotificationPermission,
  isNotificationPermissionEnabled,
} from '@/utils/notification';

import S from './MyPageScreen.style';
import useMarket from '@/hooks/useMarket';
import theme from '@/context/theme';

// TODO: 강제 fetch 방법 강구

const MyPageScreen = () => {
  const [openMarketListModal, setOpenMarketListModal] = useState(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
  const [isNotificationOn, setIsNotificationOn] = useState(false);

  const queryClient = useQueryClient();

  const {profile, selectMarket, logout, withdraw} = useProfile();
  const {marketList: marketListData, loading: isLoading} = useMarket();

  const marketList =
    marketListData?.map(({id: id, name: name}) => ({
      id,
      name,
    })) || [];

  const isFocused = useIsFocused();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {onRefresh, refreshing} = usePullDownRefresh(async () => {
    await queryClient.invalidateQueries({
      queryKey: ['marketList'],
    });
  });

  const initializeNotificationPermission = useCallback(async () => {
    try {
      const isEnabled = await isNotificationPermissionEnabled();
      setIsNotificationOn(isEnabled);
      if (isEnabled) {
        const token = await messaging().getToken();
        await registerFCMToken(token);
        console.log('FCM Token:', token);
      }
    } catch (error) {
      console.error('체크 실패', error);
    }
  }, []);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      console.log('AppState 변경:', nextAppState);
      if (nextAppState === 'active') {
        initializeNotificationPermission();
      } else if (nextAppState === 'background') {
        console.log('앱이 백그라운드로 이동');
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      console.log('AppState 이벤트 클린업');
      subscription.remove();
    };
  }, [initializeNotificationPermission]);

  useEffect(() => {
    if (isFocused) {
      initializeNotificationPermission();
    }
  }, [isFocused, initializeNotificationPermission]);

  const handleNotificationSwitch = async () => {
    try {
      await changeNotificationPermission();
      const newIsNotificationOn = await isNotificationPermissionEnabled();
      if (newIsNotificationOn !== isNotificationOn) {
        setIsNotificationOn(newIsNotificationOn);
      }
    } catch (error) {
      console.error('알림 상태 변경 실패', error);
    }
  };

  if (isLoading) {
    // TODO: Loading Screen
    return <Text>loading...</Text>;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }>
      {profile ? (
        <View>
          <S.ProfileContainer>
            {/* <S.ProfileImage
              source={{uri: 'https://legacy.reactjs.org/logo-og.png'}}
              width={100}
              height={100}
            /> */}
            <S.ProfileNameContainer
              onPress={() => setOpenMarketListModal(prev => !prev)}>
              <S.ProfileName>{`${profile.name} 님${marketList && profile.marketId ? `의 ${marketList.find(val => val.id === profile.marketId)?.name ?? ''}` : ''}`}</S.ProfileName>
              <Icon name="down" size={20} color="#000000" />
            </S.ProfileNameContainer>
          </S.ProfileContainer>
          <Button
            onPress={() => {
              logout({
                onSuccess: () => {
                  Alert.alert('로그아웃 되었습니다.', '', [
                    {
                      text: '확인',
                    },
                  ]);
                },
                onError: error => {
                  Alert.alert('로그아웃 실패', error.errorMessage);
                },
              });
            }}>
            로그아웃
          </Button>
          {marketList.length === 0 && <EmptyMarket />}
          <SwitchContainer
            title="알림 수신 동의"
            description="주문이 접수되면 알림을 보내드려요"
            value={isNotificationOn}
            onChange={handleNotificationSwitch}
          />
          <S.NoticeSection>
            <S.NoticeSectionTitle>문의 </S.NoticeSectionTitle>
            <S.ButtonContainer>
              <NavigationTextButton
                text="서비스 이용 약관"
                fontSize="16px"
                onPress={() => Linking.openURL('https://ummgoban.github.io')}
                isNotice={false}
              />
            </S.ButtonContainer>
          </S.NoticeSection>
          <S.WithdrawButton onPress={() => setOpenWithdrawModal(true)}>
            회원탈퇴
          </S.WithdrawButton>
        </View>
      ) : (
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register', {screen: 'Login'})}>
            <S.EmptyText>로그인하기</S.EmptyText>
          </TouchableOpacity>
        </View>
      )}
      {openMarketListModal && (
        <Portal>
          <Modal
            visible={openMarketListModal}
            onDismiss={() => setOpenMarketListModal(false)}>
            <S.ModalContainer>
              <S.ModalHeader>
                <S.ModalHeaderTitle>매장</S.ModalHeaderTitle>
                <S.ModalCloseButton
                  onPress={() => setOpenMarketListModal(false)}>
                  <Icon name="close" size={20} color="#000000" />
                </S.ModalCloseButton>
              </S.ModalHeader>
              <S.ModalContent>
                {marketList.map(({id, name}) => (
                  <S.ModalContentItem
                    key={id}
                    selected={profile?.marketId === id}
                    onPress={() => {
                      if (profile?.marketId !== id) {
                        console.log('id: ', id);
                        selectMarket(id);
                      }
                      setOpenMarketListModal(false);
                    }}>
                    {/* <S.ModalContentItemIcon
                      source={{uri: 'https://legacy.reactjs.org/logo-og.png'}}
                    /> */}
                    <S.ModalContentItemText>{name}</S.ModalContentItemText>
                  </S.ModalContentItem>
                ))}
                <S.ModalAddButton
                  onPress={() => {
                    navigation.navigate('RegisterMarketRoot', {
                      screen: 'RegisterMarket',
                    });
                    setOpenMarketListModal(false);
                  }}>
                  <Icon name="plus" size={20} color="#000000" />
                  <S.ModalAddButtonText>매장 추가</S.ModalAddButtonText>
                </S.ModalAddButton>
                <S.ModalAddButton
                  onPress={() => {
                    navigation.navigate('RegisterMarketRoot', {
                      screen: 'RegisterManager',
                    });
                    setOpenMarketListModal(false);
                  }}>
                  <Icon name="plus" size={20} color="#000000" />
                  <S.ModalAddButtonText>직원 인증</S.ModalAddButtonText>
                </S.ModalAddButton>
              </S.ModalContent>
            </S.ModalContainer>
          </Modal>
        </Portal>
      )}
      <Portal>
        <S.WithdrawModal
          visible={openWithdrawModal}
          onDismiss={() => setOpenWithdrawModal(false)}>
          <S.WithdrawModalContainer>
            <S.WithdrawModalContent>
              {'회원 탈퇴 시 저장되어 있는 모든 정보가 사라져요.\n'}

              {'계속 탈퇴하시겠어요?'}
            </S.WithdrawModalContent>
            <S.WithdrawModalActionContainer>
              <S.WithdrawModalCancelButton
                onPress={() => setOpenWithdrawModal(false)}
                textColor={theme.colors.primary}>
                취소
              </S.WithdrawModalCancelButton>
              <S.WithdrawModalConfirmButton
                textColor={theme.colors.dark}
                onPress={() =>
                  Alert.alert(
                    '정말로 회원 탈퇴하시나요?',
                    '회원 탈퇴 시 저장되어 있는 모든 정보가 사라져요.',
                    [
                      {
                        text: '취소',
                        onPress: () => setOpenWithdrawModal(false),
                      },
                      {
                        text: '탈퇴하기',
                        onPress: () => {
                          withdraw({
                            onSuccess: () => {
                              navigation.navigate('Home', {screen: 'Feed'});
                            },
                            onError: error => {
                              Alert.alert(
                                '탈퇴 중에 오류가 발생해요.',
                                error.errorMessage,
                                [
                                  {
                                    text: '확인',
                                    onPress: () => setOpenWithdrawModal(false),
                                  },
                                ],
                              );
                            },
                          });
                        },
                      },
                    ],
                  )
                }>
                탈퇴하기
              </S.WithdrawModalConfirmButton>
            </S.WithdrawModalActionContainer>
          </S.WithdrawModalContainer>
        </S.WithdrawModal>
      </Portal>
    </ScrollView>
  );
};

export default MyPageScreen;
