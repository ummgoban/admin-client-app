// ReviewScreen.tsx
import React from 'react';
import {ActivityIndicator, Text} from 'react-native';
import styled from '@emotion/native';
import {useReviewList} from '@/apis/reviews';
import useProfile from '@/hooks/useProfile';
import ReviewContainer from '@/components/review/ReviewContainer';

const ScreenContainer = styled.View`
  flex: 1;
  background-color: white;
`;

const ReviewScreen = () => {
  const {profile} = useProfile();
  if (!profile || !profile.marketId) {
    return (
      // FIXME: 프로필 없을때 로직
      <ScreenContainer>
        <ActivityIndicator />
      </ScreenContainer>
    );
  }

  const {
    data: reviewLists,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useReviewList(profile.marketId);

  if (status === 'pending') {
    return (
      <ScreenContainer>
        <ActivityIndicator />
      </ScreenContainer>
    );
  }

  // TODO: error 로직 개선
  if (status === 'error') {
    return (
      <ScreenContainer>
        <Text>Error</Text>
      </ScreenContainer>
    );
  }

  const reviews =
    reviewLists?.pages.flatMap(page => (page ? page.reviews : [])) || [];

  return (
    <ScreenContainer>
      <ReviewContainer
        reviews={reviews}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </ScreenContainer>
  );
};

export default ReviewScreen;
