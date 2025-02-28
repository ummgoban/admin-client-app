import styled from '@emotion/native';
const Container = styled.View`
  flex: 1;
  background-color: white;
`;

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

const FooterContainer = styled.View`
  padding: 16px;
  align-items: center;
`;

const S = {
  Container,
  ReviewItemContainer,
  ReviewTitle,
  ReviewContent,
  ReviewDate,
  FooterContainer,
};

export default S;
