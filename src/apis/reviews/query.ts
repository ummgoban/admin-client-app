import {useInfiniteQuery, useMutation} from '@tanstack/react-query';
import {getReveiewLists, postReviewReply} from './client';
import {ReviewListsRequest, ReviewReplyCreateRequest} from './model';

export const useReviewList = (marketId: number) => {
  return useInfiniteQuery({
    queryKey: ['marketList', marketId],
    queryFn: ({pageParam = 0}) =>
      // FIXME: 페이징 단위 size
      getReveiewLists({cursorId: pageParam, size: 5, marketId}),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      return lastPage?.hasNext ? lastPage.reviews.length : undefined;
    },
    enabled: Boolean(marketId),
  });
};

export const useCreateReviewReply = () => {
  return useMutation({
    mutationKey: ['reviewReply'],
    mutationFn: ({reviewId, content}: ReviewReplyCreateRequest) =>
      postReviewReply({reviewId, content}),
  });
};
