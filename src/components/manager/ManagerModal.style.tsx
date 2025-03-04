import styled from '@emotion/native';

const S = {
  ModalContainer: styled.View`
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    margin: 16px;
    background-color: #ffffff;
    padding: 8px;
  `,

  ModalHeader: styled.View`
    display: flex;
    flex-direction: row;

    justify-content: center;
    align-items: center;

    height: 64px;

    padding: 16px;

    border-top-left-radius: 20px;
    border-top-right-radius: 20px;

    background-color: white;

    box-sizing: border-box;
  `,
  ModalHeaderText: styled.Text`
    font-weight: 700;
    font-size: 16px;
  `,
  ModalFooter: styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,

  ModalContentItem: styled.View`
    display: flex;
    flex-direction: row;

    align-items: center;
    justify-content: center;

    gap: 8px;

    padding: 8px;

    background-color: white;
  `,
  ModalContentItemText: styled.Text`
    font-size: 16px;
    line-height: 20px;
  `,
  AuthCodeContainer: styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;
    background-color: #f9f9f9;
    border-radius: 10px;
    margin: 8px;
  `,

  MarketNameText: styled.Text`
    font-size: 16px;
    font-weight: 600;
  `,

  AuthCodeText: styled.Text`
    font-size: 16px;
    font-weight: 700;
  `,

  PendingManagerText: styled.Text`
    font-size: 16px;
    line-height: 20px;
  `,

  CountdownText: styled.Text`
    font-size: 14px;
    margin-top: 4px;
    color: #555;
  `,
  FooterButtons: styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 8px;
  `,
};

export default S;
