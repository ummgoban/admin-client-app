import React, {useState} from 'react';
import {View} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

import S from './MyPageScreen.style';

const MyPageScreen = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <View>
      <S.ProfileContainer>
        <S.ProfileImage
          source={{uri: 'https://legacy.reactjs.org/logo-og.png'}}
          width={100}
          height={100}
        />
        <S.ProfileNameContainer onPress={() => setOpenModal(prev => !prev)}>
          <S.ProfileName>{'매장 이름 1'}</S.ProfileName>
          <Icon name="down" size={20} color="#000000" />
        </S.ProfileNameContainer>
      </S.ProfileContainer>
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
                {/* TODO: render market list */}
                <S.ModalContentItem selected>
                  <S.ModalContentItemIcon
                    source={{uri: 'https://legacy.reactjs.org/logo-og.png'}}
                  />
                  <S.ModalContentItemText>매장 이름 1</S.ModalContentItemText>
                </S.ModalContentItem>
                <S.ModalContentItem>
                  <S.ModalContentItemIcon
                    source={{uri: 'https://legacy.reactjs.org/logo-og.png'}}
                  />
                  <S.ModalContentItemText>매장 이름 2</S.ModalContentItemText>
                </S.ModalContentItem>
                <S.ModalAddButton>
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
