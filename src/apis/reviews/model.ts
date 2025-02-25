import {ReviewType} from '@/types/Reviews';

export type ReviewListsRequest = {
  marketId: number;
  cursorId: number;
  size: number;
};

export type ReviewListsResponse = {
  reviews: ReviewType[];
  hasNext: boolean;
};

export type ReviewReplyCreateRequest = {
  reviewId: number;
  content: string;
};
