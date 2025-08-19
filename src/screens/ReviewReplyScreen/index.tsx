import React, {useMemo, useState} from 'react';
import {ReviewStackParamList} from '@/types/StackNavigationType';
import {StackScreenProps} from '@react-navigation/stack';
import {useCreateReviewReply} from '@/apis/reviews';
import S from './ReviewReplyScreen.style';
import {ActivityIndicator} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Keyboard, TouchableWithoutFeedback, Platform} from 'react-native';
import TextInput from '@/components/common/TextInput/TextInput';
import {useQueryClient} from '@tanstack/react-query';

type ReviewReplyScreenProps = StackScreenProps<
  ReviewStackParamList,
  'ReviewReply'
>;

const ReviewReplyScreen = ({route}: ReviewReplyScreenProps) => {
  const reviewData = useMemo(() => route.params.review, [route.params.review]);
  const [replyContent, setReplyContent] = useState('');

  const {mutate: createReviewReply, isPending} = useCreateReviewReply();
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const handleReplySubmit = () => {
    if (!replyContent.trim()) return;
    createReviewReply(
      {reviewId: reviewData.id, content: replyContent},
      {
        onSuccess: () => {
          setReplyContent('');
          navigation.goBack();
          queryClient.invalidateQueries({
            queryKey: ['marketList', 'review'],
          });
        },
      },
    );
  };

  return (
    <S.Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.ScreenWrapper>
          <S.Title>{reviewData.name}</S.Title>
          <S.ContentText>{reviewData.content}</S.ContentText>
          <S.InfoText>평점: {reviewData.rating}</S.InfoText>
          <S.InfoText>
            작성일: {new Date(reviewData.createdAt).toLocaleDateString()}
          </S.InfoText>
          <S.InfoText>메뉴: {reviewData.products.join(', ')}</S.InfoText>

          {reviewData.imageUrls && reviewData.imageUrls.length > 0 && (
            <S.ImageContainer>
              {reviewData.imageUrls.map((url, idx) => (
                <S.StyledImage
                  key={idx.toString()}
                  source={{uri: url}}
                  resizeMode="cover"
                />
              ))}
            </S.ImageContainer>
          )}

          {reviewData.reviewReplies && (
            <S.ReplySection>
              <S.InfoText>대댓글</S.InfoText>
              <S.ContentText>{reviewData.reviewReplies.content}</S.ContentText>
              <S.InfoText>
                작성일:{' '}
                {new Date(reviewData.createdAt).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </S.InfoText>
            </S.ReplySection>
          )}

          <S.ReplySection>
            {/* TODO: Input 태그 height 증가 */}
            <TextInput
              placeholder="리뷰에 답변해주세요!"
              value={replyContent}
              onChangeText={setReplyContent}
            />
            <S.ReplyButton onPress={handleReplySubmit} disabled={isPending}>
              {isPending ? (
                <ActivityIndicator animating={true} size="large" />
              ) : (
                <S.ReplyButtonText>대댓글 작성하기</S.ReplyButtonText>
              )}
            </S.ReplyButton>
          </S.ReplySection>
        </S.ScreenWrapper>
      </TouchableWithoutFeedback>
    </S.Container>
  );
};

export default ReviewReplyScreen;
