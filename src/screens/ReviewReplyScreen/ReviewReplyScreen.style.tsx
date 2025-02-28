import styled from '@emotion/native';

const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const ContentText = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
`;

const InfoText = styled.Text`
  font-size: 14px;
  color: gray;
  margin-bottom: 4px;
`;

const ImageContainer = styled.ScrollView`
  margin-vertical: 8px;
`;

const StyledImage = styled.Image`
  width: 100px;
  height: 100px;
  margin-right: 8px;
  border-radius: 4px;
`;

const ReplySection = styled.View`
  margin-top: 16px;
  padding-top: 16px;
  border-top-width: 1px;
  border-top-color: #ccc;
`;

const ReplyInput = styled.TextInput`
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const ReplyButton = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.primary};
  padding: 12px;
  align-items: center;
  border-radius: 4px;
`;

const ReplyButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const S = {
  Container,
  Title,
  ContentText,
  InfoText,
  ImageContainer,
  StyledImage,
  ReplySection,
  ReplyInput,
  ReplyButton,
  ReplyButtonText,
};

export default S;
