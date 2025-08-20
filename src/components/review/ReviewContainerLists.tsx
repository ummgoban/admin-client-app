import React from 'react';
import {ReviewType} from '@/types/ReviewType';
import S from './ReviewContainerLists.style';
import {FlatList} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import ReviewContainer from './ReviewContainer';
import {useQueryClient} from '@tanstack/react-query';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';

type ReviewContainerListsProps = {
  reviews: ReviewType[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};

const ReviewContainerLists = ({
  reviews,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: ReviewContainerListsProps) => {
  const queryClient = useQueryClient();

  const {onRefresh, refreshing} = usePullDownRefresh(async () => {
    await queryClient.invalidateQueries({
      queryKey: ['marketList', 'review'],
    });
  });

  return (
    <S.Container>
      <FlatList
        data={reviews}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <ReviewContainer item={item} />}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.6}
        ListFooterComponent={
          isFetchingNextPage ? (
            <S.FooterContainer>
              <ActivityIndicator animating={true} size="large" />
            </S.FooterContainer>
          ) : null
        }
      />
    </S.Container>
  );
};

export default ReviewContainerLists;
