import styled from '@emotion/native';

const S = {
  ModalOverlay: styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  `,
  Container: styled.KeyboardAvoidingView`
    flex: 1;
    justify-content: center;
    align-items: center;
  `,

  ModalView: styled.View`
    display: flex;
    width: 90%;
    background-color: white;
    border-radius: 12px;
    padding: 20px;
    align-items: center;
  `,
  ModalTitle: styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  `,
  InputRow: styled.View`
    width: 100%;
    margin-bottom: 15px;
  `,
  InputLabel: styled.Text`
    font-size: 16px;
    margin-bottom: 5px;
  `,
  ProductListContainer: styled.ScrollView`
    width: 100%;
    max-height: 200px;
    border: 1px solid ${({theme}) => theme.colors.tertiaryHover};
    border-radius: 5px;
  `,
  ProductItem: styled.TouchableOpacity<{
    isSelected: boolean;
    disabled: boolean;
  }>`
    padding: 10px;
    background-color: ${({isSelected, disabled, theme}) =>
      disabled
        ? theme.colors.tertiaryHover
        : isSelected
          ? theme.colors.primaryLight
          : 'white'};
  `,
  ProductItemText: styled.Text<{disabled: boolean}>`
    ${({theme}) => theme.fonts.body1}
    color: ${({disabled, theme}) =>
      disabled ? theme.colors.disabled : theme.colors.dark};
  `,
  ButtonContainer: styled.View`
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
  `,
  ModalButton: styled.TouchableOpacity<{status?: 'warning' | 'error'}>`
    flex: 1;
    padding: 10px;
    border-radius: 6px;
    align-items: center;
    margin: 0 5px;
    background-color: ${({status, theme}) =>
      status === 'error'
        ? theme.colors.error
        : status === 'warning'
          ? theme.colors.tertiaryDisabled
          : theme.colors.primary};
  `,
  ModalButtonText: styled.Text`
    color: white;
    font-weight: bold;
  `,
};

export default S;
