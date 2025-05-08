import styled from '@emotion/native';
import Postcode from '@actbase/react-daum-postcode';
import {Button, Text} from 'react-native-paper';

const S = {
  RegisterMarketContainer: styled.View`
    position: relative;

    flex: 1;
  `,

  RegisterMarketScrollContainer: styled.ScrollView`
    flex: 1;

    padding: 16px;
  `,

  RegisterMarketInputContainer: styled.View`
    display: flex;
    flex-direction: column;

    gap: 20px;
  `,

  InputLayout: styled.View`
    display: flex;
    flex-direction: column;

    align-items: flex-end;

    gap: 8px;
  `,

  PostcodeButton: styled(Button)`
    background-color: ${props => props.theme.colors.primary};
    border-radius: 8px;
  `,

  VerifyBusinessButton: styled(Button)<{disabled?: boolean}>`
    background-color: ${props => {
      if (props.disabled) {
        return props.theme.colors.primaryDisabled;
      }
      return props.theme.colors.primary;
    }};
    border-radius: 8px;
  `,

  ButtonText: styled(Text)<{disabled?: boolean}>`
    color: ${props => {
        if (props.disabled) {
          return props.theme.colors.tertiaryDisabled;
        }
        return props.theme.colors.dark;
      }}
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

  Notice: styled(Text)`
    ${({theme}) => theme.fonts.body2}
    color: ${props => props.theme.colors.error};
    margin-top: 8px;
  `,
};

export default S;
