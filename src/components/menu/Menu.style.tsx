import styled from '@emotion/native';
import {MenuType} from '@/types/ProductType';

const S = {
  MenuWrapper: styled.View`
    background-color: white;
    display: flex;
    flex-direction: row;
    border: 1.2px solid ${({theme}) => theme.colors.primary};
    border-radius: 20px;
    align-items: center;
    margin: 6px 20px;
    padding: 12px;
    shadow-color: ${({theme}) => theme.colors.tertiary};
    shadow-opacity: 0.04;
    shadow-radius: 8px;
    shadow-offset: 0px 1px;
    elevation: 2;
  `,

  Col: styled.View`
    display: flex;
    flex; 1:
    flex-direction: column;
  `,

  Row: styled.View`
    display: flex;
    flex: 1;
    flex-direction: row;
  `,
  MenuImage: styled.Image`
    width: 88px;
    height: 88px;
    margin-right: 16px;
    border-radius: 16px;
  `,
  MenuInfoWrapper: styled.View`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 4px;
  `,
  MenuNameText: styled.Text`
    ${props => props.theme.fonts.body1};
    font-size: 16px;
    font-weight: bold;
  `,
  DicountInfoWrapper: styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  `,
  DiscountRateText: styled.Text`
    color: red;
  `,
  OriginPriceText: styled.Text`
    color: #b5b5b5;
    text-decoration-line: line-through;
  `,

  DiscountPriceText: styled.Text`
    ${props => props.theme.fonts.body1};
    font-weight: bold;
  `,

  CurrentInfoWrapper: styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  `,

  StatusBorder: styled.View<{status: MenuType['reservationStatus']}>`
    position: absolute;
    top: 10px;
    right: 10px;

    flex-direction: row;
    align-items: center;
    border-radius: 10px;
    padding: 2px 6px;

    ${({theme, status}) =>
      status === 'ACTIVE'
        ? `border: 1px solid ${theme.colors.primary};`
        : status === 'PENDING'
          ? `border: 1px solid ${theme.colors.warning};`
          : `border: none;`}
  `,
  CurrentStatusText: styled.Text`
    color: ${props => props.theme.colors.primary};
  `,

  CurrentDiscountStatusText: styled.Text<{
    status: MenuType['reservationStatus'];
  }>`
    ${({theme, status}) =>
      status === 'ACTIVE'
        ? `color: ${theme.colors.primary};`
        : status === 'PENDING'
          ? `color: ${theme.colors.warning};`
          : `color: transparent;`}
    ${({theme}) => theme.fonts.subtitle2}
  `,
  MenuCounter: styled.View`
    display: flex;
    flex-direction: row;
    width: 100px;
    height: 24px;
    justify-content: space-between;
    align-items: center;
    background-color: white;
  `,
  MenuCounterButtonWrapper: styled.TouchableOpacity`
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    background-color: ${props => props.theme.colors.secondary};
    height: 24px;
    text-align: center;
  `,

  MenuCounterButton: styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: black;
  `,

  ModifyButtonWrapper: styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    background-color: ${props => props.theme.colors.secondary};
    text-align: center;
    width: 60px;
    height: 40px;
  `,
  ModifyButtonText: styled.Text`
    font-weight: bold;
    text-align: center;
  `,
};

export default S;
