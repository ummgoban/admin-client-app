import {ReviewType} from '@/types/ReviewType';
import React from 'react';
import S from './ReviewContainerLists.style';
import {FlatList} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import ReviewContainer from './ReviewContainer';

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
  return (
    <S.Container>
      <FlatList
        data={reviews}
        keyExtractor={item => item.id.toString()}
        renderItem={ReviewContainer}
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
