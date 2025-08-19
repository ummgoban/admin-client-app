import React, {useState} from 'react';
import {ActivityIndicator, Text} from 'react-native';
import S from './ReviewScreen.style';
import {useReviewList, useUnRepliedReviewList} from '@/apis/reviews';
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
    data: allPages,
    hasNextPage: hasNextAll,
    fetchNextPage: fetchNextAll,
    isFetchingNextPage: isFetchingNextAll,
    status: statusAll,
  } = useReviewList(marketId!, !!marketId);

  const {
    data: unrepliedPages,
    hasNextPage: hasNextUn,
    fetchNextPage: fetchNextUn,
    isFetchingNextPage: isFetchingNextUn,
    status: statusUn,
  } = useUnRepliedReviewList(marketId!, !!marketId);

  const isPending =
    (selected === 'every' && statusAll === 'pending') ||
    (selected === 'no-reply' && statusUn === 'pending');

  const isError =
    (selected === 'every' && statusAll === 'error') ||
    (selected === 'no-reply' && statusUn === 'error');

  if (!profile) {
    return <NonRegister />;
  }

  if (!marketId || !marketInfo) {
    return <EmptyMarket />;
  }

  if (isPending) {
    return (
      <S.Container>
        <ActivityIndicator />
      </S.Container>
    );
  }

  // TODO: error 로직 개선
  if (isError) {
    return (
      <S.Container>
        <Text>Error</Text>
      </S.Container>
    );
  }

  const allReviews = allPages?.pages.flatMap(p => (p ? p.reviews : [])) ?? [];

  const unrepliedReviews =
    unrepliedPages?.pages.flatMap(p => (p ? p.reviews : [])) ?? [];

  const currentReviews = selected === 'every' ? allReviews : unrepliedReviews;
  const currentHasNext = selected === 'every' ? hasNextAll : hasNextUn;
  const currentFetchNext = selected === 'every' ? fetchNextAll : fetchNextUn;
  const currentIsFetchingNext =
    selected === 'every' ? isFetchingNextAll : isFetchingNextUn;

  if (!currentReviews || currentReviews.length === 0) {
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
        <S.EmptyWrapper>
          <Text>
            {selected === 'every'
              ? '등록된 리뷰가 없어요!'
              : '미답변 리뷰가 없어요!'}
          </Text>
        </S.EmptyWrapper>
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
        reviews={currentReviews}
        hasNextPage={currentHasNext}
        fetchNextPage={currentFetchNext}
        isFetchingNextPage={currentIsFetchingNext}
      />
    </S.Container>
  );
};
export default ReviewScreen;
