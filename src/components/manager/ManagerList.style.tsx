import styled from '@emotion/native';

const S = {
  ListContainer: styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 0px;
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
  `,
  DeleteText: styled.Text`
    color: red;
  `,
  EmptyPlaceholder: styled.View`
    flex: 1;
  `,
};

export default S;
