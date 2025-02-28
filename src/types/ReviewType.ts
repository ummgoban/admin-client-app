export type ReviewReplyType = {
  reviewReplyId: number;
  createAt: string;
  content: string;
};

export type ReviewType = {
  id: number;
  name: string;
  content: string;
  rating: number;
  products: string[];
  createdAt: string;
  imageUrls: string[];
  reviewReplies: ReviewReplyType;
};
