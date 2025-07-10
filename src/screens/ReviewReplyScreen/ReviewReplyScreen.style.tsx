import styled from '@emotion/native';

const S = {
  Container: styled.KeyboardAvoidingView`
    flex: 1;
  `,

  ScreenWrapper: styled.ScrollView`
    flex: 1;
    background-color: white;
    padding: 16px;
  `,

  Title: styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 8px;
  `,

  ContentText: styled.Text`
    font-size: 16px;
    margin-bottom: 8px;
  `,

  InfoText: styled.Text`
    font-size: 14px;
    color: gray;
    margin-bottom: 4px;
  `,

  ImageContainer: styled.ScrollView`
    margin-vertical: 8px;
  `,

  StyledImage: styled.Image`
    width: 100px;
    height: 100px;
    margin-right: 8px;
    border-radius: 4px;
  `,

  ReplySection: styled.View`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 16px;
    padding-top: 16px;
    border-top-width: 1px;
    border-top-color: #ccc;
  `,

  ReplyInput: styled.TextInput`
    border: 1px solid #ccc;
    padding: 8px;
    border-radius: 4px;
    margin-bottom: 8px;
  `,

  ReplyButton: styled.TouchableOpacity`
    background-color: ${({theme}) => theme.colors.primary};
    padding: 12px;
    align-items: center;
    border-radius: 4px;
  `,

  ReplyButtonText: styled.Text`
    color: white;
    font-size: 16px;
    font-weight: bold;
  `,
};

export default S;
