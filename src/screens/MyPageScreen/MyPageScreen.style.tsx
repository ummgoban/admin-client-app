import styled from '@emotion/native';

const ProfileContainer = styled.View`
  display: flex;
  flex-direction: column;

  justify-content: center;

  gap: 16px;

  margin: 16px auto;
`;

const ProfileImage = styled.Image`
  width: 100px;
  height: 100px;

  border-radius: 50px;
`;

const ProfileNameContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;

  align-items: center;

  gap: 8px;
`;

const ProfileName = styled.Text`
  font-size: 20px;
  line-height: 24px;
  font-weight: bold;
`;

const ChevronDownArrow = styled.Image`
  width: 24px;
  height: 24px;
`;

const ModalContainer = styled.View`
  display: flex;
  flex-direction: column;

  border-radius: 20px;

  margin: 16px;

  background-color: #ffffff;
`;

const ModalHeader = styled.View`
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
`;

const ModalHeaderTitle = styled.Text`
  font-size: 24px;
  line-height: 28px;
  font-weight: bold;
`;

const ModalCloseButton = styled.TouchableOpacity`
  position: absolute;

  top: 16px;
  right: 16px;

  width: 32px;
  height: 32px;

  padding: 8px;
`;

const ModalContent = styled.View`
  display: flex;
  flex-direction: column;

  gap: 8px;
  padding: 16px;
`;

const ModalContentItem = styled.TouchableOpacity<{selected?: boolean}>`
  display: flex;
  flex-direction: row;

  align-items: center;

  gap: 8px;

  padding: 8px;

  border-radius: 8px;

  background-color: ${({selected}) => (selected ? '#f2f2f2' : '#ffffff')};
`;

const ModalContentItemIcon = styled.Image`
  width: 64px;
  height: 64px;

  border-radius: 32px;
`;

const ModalContentItemText = styled.Text`
  font-size: 16px;
  line-height: 20px;
`;

const ModalAddButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;

  gap: 8px;

  padding: 16px;
  margin: 16px 0;

  border-radius: 8px;

  border: 1px solid #000000;
`;

const ModalAddButtonText = styled.Text`
  font-size: 16px;
  line-height: 20px;
`;

const S = {
  ProfileContainer,
  ProfileImage,
  ProfileNameContainer,
  ProfileName,
  ChevronDownArrow,
  ModalContainer,
  ModalHeader,
  ModalHeaderTitle,
  ModalCloseButton,
  ModalContent,
  ModalContentItem,
  ModalContentItemIcon,
  ModalContentItemText,
  ModalAddButton,
  ModalAddButtonText,
};

export default S;
