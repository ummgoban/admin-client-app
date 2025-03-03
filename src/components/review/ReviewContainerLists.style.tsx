import styled from '@emotion/native';

const S = {
  Container: styled.View`
    flex: 1;
    background-color: white;
  `,

  ReviewItemContainer: styled.View`
    padding: 16px;
  `,

  ReviewTitle: styled.Text`
    font-weight: bold;
    margin-bottom: 4px;
  `,

  ReviewContent: styled.Text`
    margin-bottom: 8px;
  `,

  ReviewDate: styled.Text`
    font-size: 12px;
    color: gray;
  `,
  FooterContainer: styled.View`
    padding: 16px;
    align-items: center;
  `,
};

export default S;
