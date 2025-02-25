import {ReviewType} from '@/types/Reviews';
import React from 'react';
import S from './ReviewContainer.style';
import {FlatList, ActivityIndicator} from 'react-native';

type ReviewContainerProps = {
  reviews?: ReviewType[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};

const ReviewContainer = ({
  reviews,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: ReviewContainerProps) => {
  const renderItem = ({item}: {item: ReviewType}) => (
    <S.ReviewItemContainer>
      <S.ReviewTitle>{item.name}</S.ReviewTitle>
      <S.ReviewContent>{item.content}</S.ReviewContent>
      <S.ReviewDate>
        {new Date(item.createdAt).toLocaleDateString()}
      </S.ReviewDate>
    </S.ReviewItemContainer>
  );

  return (
    <S.Container>
      <FlatList
        data={reviews}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <S.FooterContainer>
              <ActivityIndicator size="small" />
            </S.FooterContainer>
          ) : null
        }
      />
    </S.Container>
  );
};

export default ReviewContainer;
