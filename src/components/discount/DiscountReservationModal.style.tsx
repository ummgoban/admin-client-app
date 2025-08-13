import styled from '@emotion/native';

const S = {
  ModalOverlay: styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  `,
  SafeArea: styled.SafeAreaView`
    flex: 1;
    width: 100%;
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
    ${({theme}) => theme.fonts.h6}
    font-weight: 600;
    margin-bottom: 20px;
  `,
  InputRow: styled.View`
    width: 100%;
    margin-bottom: 12px;
  `,
  InputLabel: styled.Text`
    ${({theme}) => theme.fonts.subtitle1}
    margin-bottom: 4px;
  `,
  ProductListContainer: styled.ScrollView`
    width: 100%;
    border: 1px solid ${({theme}) => theme.colors.tertiaryHover};
    border-radius: 8px;
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
    ${({theme}) => theme.fonts.body2}
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
    border-radius: 8px;
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
    ${({theme}) => theme.fonts.body2}
    color: white;
    font-weight: bold;
  `,
  TimeRangeContainer: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  `,
  TimeInputTouchable: styled.TouchableOpacity`
    flex: 1;
    border: 1px solid ${({theme}) => theme.colors.primary};
    border-radius: 8px;
    padding: 12px 0;
    background-color: white;
  `,
  TimeInputText: styled.Text`
    ${({theme}) => theme.fonts.body1}
    text-align: center;
  `,
  SelectedProductsContainer: styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    padding: 8px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
  `,

  ProductTag: styled.View`
    border: 1px solid ${({theme}) => theme.colors.primaryLight};
    border-radius: 16px;
    padding: 6px 12px;
    margin-right: 8px;
    margin-bottom: 8px;
    align-items: center;
    justify-content: center;
  `,

  ProductTagText: styled.Text`
    ${({theme}) => theme.fonts.body1}
    color: ${({theme}) => theme.colors.primaryLight};
    font-size: 14px;
  `,

  PlaceholderText: styled.Text`
    color: #999;
    font-size: 14px;
    line-height: 24px;
  `,

  AlertText: styled.Text`
    ${({theme}) => theme.fonts.body2}
    color: ${({theme}) => theme.colors.error};
  `,
};

export default S;
