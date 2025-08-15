import styled from '@emotion/native';

const S = {
  Container: styled.View`
    flex: 1;
    padding: 16px;
    background-color: white;
  `,

  CreateButton: styled.TouchableOpacity`
    background-color: ${({theme}) => theme.colors.primary};
    padding: 12px;
    border-radius: 8px;
    align-items: center;
    margin-bottom: 16px;
  `,

  ItemContainer: styled.View`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;
    background-color: white;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 12px;
    border: 1px solid ${({theme}) => theme.colors.tertiaryDisabled};
  `,

  ItemText: styled.Text`
    font-size: 16px;
  `,

  ProductList: styled.View`
    display: flex;
    flex-direction: column;
    gap: 6px;
  `,

  ProductListItem: styled.Text`
    ${({theme}) => theme.fonts.body2}
    color: ${({theme}) => theme.colors.tertiaryDisabled};
    padding-left: 8px;
  `,

  EditButton: styled.TouchableOpacity`
    background-color: ${({theme}) => theme.colors.primary};
    padding: 8px;
    border-radius: 4px;
    align-items: center;
    margin-top: 8px;
  `,

  ButtonText: styled.Text`
    color: white;
    font-weight: bold;
  `,

  LoadingText: styled.Text`
    text-align: center;
    margin-top: 20px;
  `,

  ErrorText: styled.Text`
    ${({theme}) => theme.fonts.subtitle1}
    text-align: center;
    margin-top: 20px;
    color: ${({theme}) => theme.colors.error};
  `,
};

export default S;
