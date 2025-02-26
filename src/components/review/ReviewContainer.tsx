import {ReviewType} from '@/types/ReviewType';
import React from 'react';
import S from './ReviewContainer.style';
import {useNavigation} from '@react-navigation/native';
import {FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/StackNavigationType';

type ReviewContainerProps = {
  reviews: ReviewType[];
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
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const renderItem = ({item}: {item: ReviewType}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ReviewReply', {review: item})}>
      <S.ReviewItemContainer>
        <S.ReviewTitle>{item.name}</S.ReviewTitle>
        <S.ReviewContent>{item.content}</S.ReviewContent>
        <S.ReviewDate>
          {new Date(item.createdAt).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </S.ReviewDate>
      </S.ReviewItemContainer>
    </TouchableOpacity>
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
