import {ProductType} from '@ummgoban/shared';

export type MarketType = {
  id: number;
  name: string;
  pickupStartAt: string;
  pickupEndAt: string;
  openAt: string;
  closeAt: string;
  address: string;
  products: ProductType[];
  imageUrls: string[];
  summary: string;
};

export type UpdateMarketInfoType = {
  summary: string;
  openAt: string;
  closeAt: string;
  pickupStartAt: string;
  pickupEndAt: string;
  // imageUrls: string[];
};

export type RegisterMarketType = {
  name: string;
  businessMarketName: string;
  businessNumber: string;
  address: string;
  specificAddress: string;
  contactNumber: string;
};
