import styled from '@emotion/native';
import Postcode from '@actbase/react-daum-postcode';
import {Button, Text} from 'react-native-paper';

const S = {
  RegisterMarketContainer: styled.View`
    flex: 1;
    margin: 16px;
  `,

  RegisterMarketInputContainer: styled.ScrollView`
    display: flex;
    flex-direction: column;

    gap: 20px;
  `,

  AddressLayout: styled.View`
    display: flex;
    flex-direction: row;

    align-items: center;

    gap: 16px;
  `,

  PostcodeButton: styled(Button)`
    background-color: ${props => props.theme.colors.primary};
    border-radius: 8px;
  `,

  PostcodeButtonText: styled(Text)`
    color: #000000;
    ${props => props.theme.fonts.default};
  `,

  ModalContainer: styled.View`
    width: 100%;
    height: 100%;

    justify-content: center;
    align-items: center;
  `,

  ModalWrapper: styled.View`
    width: 100%;
    height: 100%;

    background-color: white;

    overflow: hidden;
  `,
  StyledPostcode: styled(Postcode)`
    width: 100%;
    height: 100%;
  `,
};

export default S;
