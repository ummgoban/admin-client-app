import styled from '@emotion/native';

const ReviewItemContainer = styled.View`
  padding: 16px;
`;

const ReviewTitle = styled.Text`
  font-weight: bold;
  margin-bottom: 4px;
`;

const ReviewContent = styled.Text`
  margin-bottom: 8px;
`;

const ReviewDate = styled.Text`
  font-size: 12px;
  color: gray;
`;

const S = {ReviewItemContainer, ReviewTitle, ReviewContent, ReviewDate};

export default S;
