import React, {useMemo, useState} from 'react';
import {ReviewStackParamList} from '@/types/StackNavigationType';
import {StackScreenProps} from '@react-navigation/stack';
import {useCreateReviewReply} from '@/apis/reviews';
import S from './ReviewReplyScreen.style';
import {ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';

type ReviewReplyScreenProps = StackScreenProps<
  ReviewStackParamList,
  'ReviewReply'
>;

const ReviewReplyScreen = ({route}: ReviewReplyScreenProps) => {
  const reviewData = useMemo(() => route.params.review, [route.params.review]);
  const [replyContent, setReplyContent] = useState('');

  const {mutate: createReviewReply, isPending} = useCreateReviewReply();
  const navigation = useNavigation();

  const handleReplySubmit = () => {
    if (!replyContent.trim()) return;
    createReviewReply(
      {reviewId: reviewData.id, content: replyContent},
      {
        onSuccess: () => {
          setReplyContent('');
          navigation.goBack();
        },
      },
    );
  };

  return (
    <S.Container>
      <S.Title>{reviewData.name}</S.Title>
      <S.ContentText>{reviewData.content}</S.ContentText>
      <S.InfoText>평점: {reviewData.rating}</S.InfoText>
      <S.InfoText>
        작성일: {new Date(reviewData.createdAt).toLocaleDateString()}
      </S.InfoText>
      <S.InfoText>제품: {reviewData.products.join(', ')}</S.InfoText>

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
            {new Date(reviewData.reviewReplies.createAt).toLocaleDateString()}
          </S.InfoText>
        </S.ReplySection>
      )}

      <S.ReplySection>
        <S.ReplyInput
          placeholder="대댓글 내용을 입력하세요"
          value={replyContent}
          onChangeText={setReplyContent}
        />
        <S.ReplyButton onPress={handleReplySubmit} disabled={isPending}>
          {isPending ? (
            <ActivityIndicator color="white" />
          ) : (
            <S.ReplyButtonText>대댓글 작성하기</S.ReplyButtonText>
          )}
        </S.ReplyButton>
      </S.ReplySection>
    </S.Container>
  );
};

export default ReviewReplyScreen;
