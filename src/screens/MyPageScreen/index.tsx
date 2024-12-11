import {useNavigation, useIsFocused} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState, useCallback} from 'react';
import {
  Alert,
  TouchableOpacity,
  View,
  AppState,
  AppStateStatus,
} from 'react-native';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import {Button, Modal, Portal} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

import EmptyMarket from '@/components/common/EmptyMarket';
import SwitchContainer from '@/components/common/SwitchContainer';
import useMarket from '@/hooks/useMarket';
import useProfile from '@/hooks/useProfile';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';
import {RootStackParamList} from '@/types/StackNavigationType';

import S from './MyPageScreen.style';

import {
  changeNotificationPermission,
  isNotificationPermissionEnabled,
} from '@/utils/notification';

const MyPageScreen = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isNotificationOn, setIsNotificationOn] = useState(false);

  const {profile, fetch: fetchProfile, selectMarket, logout} = useProfile();
  const {market, fetch: fetchMemberMarkets} = useMarket();
  const isFocused = useIsFocused();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {onRefresh, refreshing} = usePullDownRefresh(async () => {
    await fetchProfile();
    await fetchMemberMarkets();
  });

  const initializeNotificationPermission = useCallback(async () => {
    try {
      const isEnabled = await isNotificationPermissionEnabled();
      setIsNotificationOn(isEnabled);
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
            <S.ProfileNameContainer onPress={() => setOpenModal(prev => !prev)}>
              <S.ProfileName>{`${profile.name} 님${market && profile.marketId ? `의 ${market.find(val => val.id === profile.marketId)?.name ?? ''}` : ''}`}</S.ProfileName>
              <Icon name="down" size={20} color="#000000" />
            </S.ProfileNameContainer>
          </S.ProfileContainer>
          <Button
            onPress={async () => {
              const res = await logout();

              if (res) {
                Alert.alert('로그아웃 되었습니다.', '', [
                  {
                    text: '확인',
                  },
                ]);
              } else {
                console.error('로그아웃 실패');
                Alert.alert('로그아웃 실패');
              }
            }}>
            로그아웃
          </Button>
          {market.length === 0 && <EmptyMarket />}
          <SwitchContainer
            title="알림 수신 동의"
            description="주문이 접수되면 알림을 보내드려요"
            value={isNotificationOn}
            onChange={handleNotificationSwitch}
          />
        </View>
      ) : (
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register', {screen: 'Login'})}>
            <S.EmptyText>로그인하기</S.EmptyText>
          </TouchableOpacity>
        </View>
      )}
      {openModal && (
        <Portal>
          <Modal visible={openModal} onDismiss={() => setOpenModal(false)}>
            <S.ModalContainer>
              <S.ModalHeader>
                <S.ModalHeaderTitle>매장</S.ModalHeaderTitle>
                <S.ModalCloseButton onPress={() => setOpenModal(false)}>
                  <Icon name="close" size={20} color="#000000" />
                </S.ModalCloseButton>
              </S.ModalHeader>
              <S.ModalContent>
                {market.map(({id, name}) => (
                  <S.ModalContentItem
                    key={id}
                    selected={profile?.marketId === id}
                    onPress={() => {
                      if (profile?.marketId !== id) {
                        selectMarket(id);
                      }

                      setOpenModal(false);
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
                    setOpenModal(false);
                  }}>
                  <Icon name="plus" size={20} color="#000000" />
                  <S.ModalAddButtonText>매장 추가</S.ModalAddButtonText>
                </S.ModalAddButton>
              </S.ModalContent>
            </S.ModalContainer>
          </Modal>
        </Portal>
      )}
    </ScrollView>
  );
};

export default MyPageScreen;
