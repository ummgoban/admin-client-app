import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {Button, Modal, Portal} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

import {RootStackParamList} from '@/types/StackNavigationType';
import useProfile from '@/hooks/useProfile';
import {logout} from '@/apis/Login';

import S from './MyPageScreen.style';
import useMarket from '@/hooks/useMarket';

const MyPageScreen = () => {
  const [openModal, setOpenModal] = useState(false);

  const {profile, fetch: fetchProfile, selectMarket} = useProfile();
  const {market, fetch: fetchMarket} = useMarket();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    fetchMarket();
  }, [fetchMarket]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <View>
      {profile ? (
        <View>
          <S.ProfileContainer>
            <S.ProfileImage
              source={{uri: 'https://legacy.reactjs.org/logo-og.png'}}
              width={100}
              height={100}
            />
            <S.ProfileNameContainer onPress={() => setOpenModal(prev => !prev)}>
              <S.ProfileName>{`${profile.name}님 ${market && profile.marketId ? `의${market.find(val => val.id === profile.marketId)?.name ?? ''}` : ''}`}</S.ProfileName>
              <Icon name="down" size={20} color="#000000" />
            </S.ProfileNameContainer>
          </S.ProfileContainer>
          <Button
            onPress={async () => {
              const res = await logout();

              if (res) {
                navigation.navigate('Register', {screen: 'Login'});
              } else {
                console.error('로그아웃 실패');
                Alert.alert('로그아웃 실패');
              }
            }}>
            로그아웃
          </Button>
        </View>
      ) : (
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register', {screen: 'Login'})}>
            <Text>로그인하기</Text>
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
                    selected={market[0].id === id}
                    disabled={market[0].id === id}
                    onPress={() => {
                      selectMarket(id);
                      setOpenModal(false);
                    }}>
                    <S.ModalContentItemIcon
                      source={{uri: 'https://legacy.reactjs.org/logo-og.png'}}
                    />
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
    </View>
  );
};

export default MyPageScreen;
