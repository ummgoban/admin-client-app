import styled from '@emotion/native';
import Postcode from '@actbase/react-daum-postcode';
import {Button, Text} from 'react-native-paper';

const RegisterMarketContainer = styled.View`
  flex: 1;
  margin: 16px;
`;

const RegisterMarketInputContainer = styled.ScrollView`
  display: flex;
  flex-direction: column;

  gap: 20px;
`;

const AddressLayout = styled.View`
  display: flex;
  flex-direction: row;

  align-items: center;

  gap: 16px;
`;

const PostcodeButton = styled(Button)`
  background-color: ${props => props.theme.colors.primary};
  border-radius: 8px;
`;

const PostcodeButtonText = styled(Text)`
  color: #000000;
  ${props => props.theme.fonts.default};
`;

const ModalContainer = styled.View`
  width: 100%;
  height: 100%;

  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.View`
  width: 100%;
  height: 100%;

  background-color: white;

  overflow: hidden;
`;
const StyledPostcode = styled(Postcode)`
  width: 100%;
  height: 100%;
`;

const S = {
  RegisterMarketContainer,
  RegisterMarketInputContainer,
  AddressLayout,
  PostcodeButton,
  PostcodeButtonText,
  ModalContainer,
  ModalWrapper,
  StyledPostcode,
};

export default S;
