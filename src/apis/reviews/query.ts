import {useInfiniteQuery, useMutation} from '@tanstack/react-query';
import {
  getReviewLists,
  postReviewReply,
  getUnRepliedReviewLists,
} from './client';
import {ReviewReplyCreateRequest} from './model';

export const useReviewList = (marketId: number, enabled: boolean) => {
  return useInfiniteQuery({
    queryKey: ['marketList', 'review', 'every', marketId],
    queryFn: ({pageParam = 0}) =>
      // TODO: 페이징 단위 size
      getReviewLists({cursorId: pageParam, size: 5, marketId}),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      return lastPage?.hasNext
        ? lastPage.reviews[lastPage.reviews.length - 1].id
        : undefined;
    },
    enabled: enabled,
  });
};

export const useUnRepliedReviewList = (marketId: number, enabled: boolean) => {
  return useInfiniteQuery({
    queryKey: ['marketList', 'review', 'no-reply', marketId],
    queryFn: ({pageParam = 0}) =>
      // TODO: 페이징 단위 size
      getUnRepliedReviewLists({cursorId: pageParam, size: 5, marketId}),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      return lastPage?.hasNext
        ? lastPage.reviews[lastPage.reviews.length - 1].id
        : undefined;
    },
    enabled: enabled,
  });
};

export const useCreateReviewReply = () => {
  return useMutation({
    mutationKey: ['reviewReply'],
    mutationFn: ({reviewId, content}: ReviewReplyCreateRequest) =>
      postReviewReply({reviewId, content}),
  });
};
