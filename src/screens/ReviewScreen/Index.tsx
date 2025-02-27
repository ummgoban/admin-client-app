// ReviewScreen.tsx
import React from 'react';
import {ActivityIndicator, Text} from 'react-native';
import S from './ReviewScreen.style';
import {useReviewList} from '@/apis/reviews';
import useProfile from '@/hooks/useProfile';
import ReviewContainerLists from '@/components/review/ReviewContainerLists';

const ReviewScreen = () => {
  const {profile} = useProfile();
  const marketId = profile?.marketId;

  const {
    data: reviewLists,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    status,
    // error,
  } = useReviewList(marketId!, Boolean(marketId));

  if (!profile || !profile.marketId) {
    return (
      // FIXME: 프로필 없을때 로직
      <S.Container>
        <ActivityIndicator />
      </S.Container>
    );
  }

  if (status === 'pending') {
    return (
      <S.Container>
        <ActivityIndicator />
      </S.Container>
    );
  }

  // TODO: error 로직 개선
  if (status === 'error') {
    return (
      <S.Container>
        <Text>Error</Text>
      </S.Container>
    );
  }

  const reviews =
    reviewLists?.pages.flatMap(page => (page ? page.reviews : [])) || [];

  return (
    <S.Container>
      <ReviewContainerLists
        reviews={reviews}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </S.Container>
  );
};

export default ReviewScreen;
