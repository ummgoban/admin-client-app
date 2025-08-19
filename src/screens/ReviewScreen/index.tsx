import React, {useState} from 'react';
import {ActivityIndicator, Text} from 'react-native';
import S from './ReviewScreen.style';
import {useReviewList} from '@/apis/reviews';
import useProfile from '@/hooks/useProfile';
import ReviewContainerLists from '@/components/review/ReviewContainerLists';
import NonRegister from '@/components/common/NonRegister';
import EmptyMarket from '@/components/common/EmptyMarket';
import useMarket from '@/hooks/useMarket';

const ReviewScreen = () => {
  const {profile} = useProfile();
  const {marketInfo} = useMarket();
  const [selected, setSelected] = useState<'every' | 'no-reply'>('no-reply');
  const marketId = profile?.marketId;

  const {
    data: reviewLists,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    status,
    // error,
  } = useReviewList(marketId!, Boolean(marketId));

  if (!profile) {
    return <NonRegister />;
  }

  if (!marketId || !marketInfo) {
    return <EmptyMarket />;
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

  if (reviews.length === 0 || !reviews) {
    return (
      <S.Container>
        <Text>등록된 리뷰가 없어요!</Text>
      </S.Container>
    );
  }
  return (
    <S.Container>
      <S.NavbarGroup selected={selected}>
        <S.ToggleButton
          value="no-reply"
          onPress={() => setSelected('no-reply')}>
          <S.ToggleText>댓글을 달지 않은 리뷰</S.ToggleText>
        </S.ToggleButton>
        <S.ToggleButton value="every" onPress={() => setSelected('every')}>
          <S.ToggleText>전체 리뷰</S.ToggleText>
        </S.ToggleButton>
      </S.NavbarGroup>
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
