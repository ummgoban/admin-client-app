import styled from '@emotion/native';

const S = {
  ListContainer: styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: #ccc;
  `,
  NameText: styled.Text`
    flex: 1;
    text-align: center;
  `,
  RoleText: styled.Text`
    flex: 1;
    text-align: center;
  `,
  DeleteButton: styled.TouchableOpacity`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 5px;
  `,
  DeleteText: styled.Text`
    color: red;
  `,
};

export default S;
