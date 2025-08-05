import {ProductType, OpenHour} from '@ummgoban/shared';

export type MarketType = {
  id: number;
  name: string;
  pickupStartAt: string;
  pickupEndAt: string;
  openHours: OpenHour[];
  address: string;
  products: ProductType[];
  imageUrls: string[];
  summary: string;
};

export type UpdateMarketInfoType = {
  marketName: string;
  summary: string;
  openHours: OpenHour[];
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
