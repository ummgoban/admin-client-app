import {useInfiniteQuery, useMutation} from '@tanstack/react-query';
import {getReveiewLists, postReviewReply} from './client';
import {ReviewListsRequest, ReviewReplyCreateRequest} from './model';

export const useMarketList = ({
  marketId,
  cursorId,
  size,
}: ReviewListsRequest) => {
  return useInfiniteQuery({
    queryKey: ['marketList', cursorId, size, marketId],
    queryFn: ({pageParam}) =>
      getReveiewLists({cursorId: pageParam, size, marketId}),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      return lastPage?.hasNext ? lastPage.reviews.length : undefined;
    },
  });
};

export const useCreateReviewReply = () => {
  return useMutation({
    mutationKey: ['reviewReply'],
    mutationFn: ({reviewId, content}: ReviewReplyCreateRequest) =>
      postReviewReply({reviewId, content}),
  });
};
