import React from 'react';
import S from './ReviewContainer.style';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/StackNavigationType';
import {ReviewType} from '@/types/ReviewType';

type ReviewContainerProps = {
  item: ReviewType;
};

const ReviewContainer = ({item}: ReviewContainerProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
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
};

export default ReviewContainer;
