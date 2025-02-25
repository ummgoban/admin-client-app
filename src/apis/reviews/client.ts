import apiClient from '../ApiClient';
import {
  ReviewListsRequest,
  ReviewListsResponse,
  ReviewReplyCreateRequest,
} from './model';

export const getReveiewLists = async ({
  marketId,
  cursorId,
  size,
}: ReviewListsRequest): Promise<ReviewListsResponse | null> => {
  try {
    const res = await apiClient.get<ReviewListsResponse | null>(
      `customer/review/market/${marketId}`,
      {
        params: {
          cursorId,
          size,
        },
      },
    );
    return res;
  } catch (error) {
    console.error('리뷰 페치 에러', error);
    return null;
  }
};

export const postReviewReply = async ({
  reviewId,
  content,
}: ReviewReplyCreateRequest): Promise<{
  code: number;
  message: string;
} | null> => {
  try {
    const res = await apiClient.post<{code: number; message: string}>(
      `/onwer/review/${reviewId}/replies`,
      {content},
    );
    return res;
  } catch (error) {
    console.log('대댓글 달기 에러', error);
    return null;
  }
};
