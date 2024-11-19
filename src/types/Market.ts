import {ProductType} from './ProductType';

export type MarketType = {
  id: number;
  name: string;
  pickupStartAt: number;
  pickupEndAt: number;
  address: string;
  products: ProductType[];
  images: string[];
  summary: string;
};

export type UpdateMarketInfoType = {
  summary: string;
  openAt: string;
  closeAt: string;
  pickupStartAt: string;
  pickupEndAt: string;
  imageUrls: string[];
};

export type RegistMarketType = {
  name: string;
  businessNumber: string;
  address: string;
  specificAddress: string;
  contactNumber: string;
};
