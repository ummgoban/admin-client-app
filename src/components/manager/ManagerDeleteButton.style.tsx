import styled from '@emotion/native';

const S = {
  DeleteButton: styled.TouchableOpacity`
    flex: 1;
    align-items: center;
    justify-content: center;
  `,
  DeleteText: styled.Text`
    color: red;
  `,
  ModalContainer: styled.View`
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    margin: 16px;
    background-color: #ffffff;
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
  ModalHeaderText: styled.Text``,
  ModalFooter: styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
};

export default S;
