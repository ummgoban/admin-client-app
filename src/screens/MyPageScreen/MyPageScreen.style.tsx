import styled from '@emotion/native';
import {Button, Modal, Text} from 'react-native-paper';

const S = {
  EmptyText: styled.Text`
    ${({theme}) => theme.fonts.body1}
    margin: 0 auto;
    padding: 16px;
  `,

  ProfileContainer: styled.View`
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    gap: 16px;

    margin: 16px auto;
  `,

  ProfileImage: styled.Image`
    width: 100px;
    height: 100px;

    border-radius: 50px;
  `,

  ProfileNameContainer: styled.TouchableOpacity`
    display: flex;
    flex-direction: row;

    align-items: center;

    gap: 8px;
  `,

  ProfileName: styled.Text`
    font-size: 20px;
    line-height: 24px;
    font-weight: bold;
  `,

  ChevronDownArrow: styled.Image`
    width: 24px;
    height: 24px;
  `,

  ModalContainer: styled.View`
    display: flex;
    flex-direction: column;

    border-radius: 20px;

    margin: 16px;

    background-color: #ffffff;
  `,

  ModalHeader: styled.View`
    display: flex;
    flex-direction: row;

    justify-content: center;
    align-items: center;

    height: 64px;

    padding: 16px;

    border-top-left-radius: 20px;
    border-top-right-radius: 20px;

    background-color: #f2f2f2;

    box-sizing: border-box;
  `,

  ModalHeaderTitle: styled.Text`
    font-size: 24px;
    line-height: 28px;
    font-weight: bold;
  `,

  ModalCloseButton: styled.TouchableOpacity`
    position: absolute;

    top: 16px;
    right: 16px;

    width: 32px;
    height: 32px;

    padding: 8px;
  `,

  ModalContent: styled.View`
    display: flex;
    flex-direction: column;

    gap: 8px;

    padding: 16px;
  `,

  ModalContentItem: styled.TouchableOpacity<{selected?: boolean}>`
    display: flex;
    flex-direction: row;

    align-items: center;

    gap: 8px;

    padding: 8px;

    border-radius: 8px;

    background-color: ${({selected}) => (selected ? '#f2f2f2' : '#ffffff')};
  `,

  ModalContentItemIcon: styled.Image`
    width: 64px;
    height: 64px;

    border-radius: 32px;
  `,

  ModalContentItemText: styled.Text`
    font-size: 16px;
    line-height: 20px;
  `,

  ModalAddButton: styled.TouchableOpacity`
    display: flex;
    flex-direction: row;

    align-items: center;
    justify-content: center;

    gap: 8px;

    padding: 16px;
    margin: 8px 0;

    border-radius: 8px;

    border: 1px solid #000000;
  `,

  ModalAddButtonText: styled.Text`
    font-size: 16px;
    line-height: 20px;
  `,

  WithdrawButton: styled(Button)`
    margin: 16px 0;
  `,

  WithdrawModal: styled(Modal)``,
  WithdrawModalContainer: styled.View`
    display: flex;
    flex-direction: column;

    gap: 8px;

    background-color: white;

    padding: 16px;
    margin: 0 16px;
  `,
  WithdrawModalContent: styled(Text)`
    ${({theme}) => theme.fonts.labelLarge}

    text-align: center;
  `,
  WithdrawModalActionContainer: styled.View`
    display: flex;
    flex-direction: row;

    justify-content: flex-end;

    gap: 8px;
  `,
  WithdrawModalConfirmButton: styled(Button)``,
  WithdrawModalCancelButton: styled(Button)``,
};

export default S;
