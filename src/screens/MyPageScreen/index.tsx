import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import {Button, Modal, Portal} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

import EmptyMarket from '@/components/common/EmptyMarket';
import useMarket from '@/hooks/useMarket';
import useProfile from '@/hooks/useProfile';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';
import {RootStackParamList} from '@/types/StackNavigationType';

import S from './MyPageScreen.style';

import {
  onForegroundMessageHandler,
  requestNotificationPermission,
  requestUserPermission,
  setBackgroundMessageHandler,
} from '@/utils/notification';
const MyPageScreen = () => {
  const [openModal, setOpenModal] = useState(false);

  const {profile, fetch: fetchProfile, selectMarket, logout} = useProfile();
  const {market, fetch: fetchMemberMarkets} = useMarket();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {onRefresh, refreshing} = usePullDownRefresh(async () => {
    await fetchProfile();
    await fetchMemberMarkets();
  });

  //TODO: fcm 관련 권한 및 토큰 등록 협의후 이동
  useEffect(() => {
    requestNotificationPermission();
    requestUserPermission();
    setBackgroundMessageHandler();
    onForegroundMessageHandler();
  }, []);
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
