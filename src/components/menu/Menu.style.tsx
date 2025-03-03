import styled from '@emotion/native';

const S = {
  MenuWrapper: styled.View`
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 4px 20px;
    padding: 12px;
  `,
  MenuImage: styled.Image`
    width: 60px;
    height: 60px;
    margin-right: 24px;
    border-radius: 16px;
  `,
  MenuInfoWrapper: styled.View`
    display: flex;
    flex-direction: column;
    flex: 1;
  `,
  MenuNameText: styled.Text`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 4px;
  `,
  DicountInfoWrapper: styled.View`
    display: flex;
    flex-direction: row;
    gap: 8px;
    margin: 2px 0px;
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
    gap: 8px;
    margin: 2px 0px;
  `,
  CurrentStatusText: styled.Text`
    color: ${props => props.theme.colors.primary};
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
