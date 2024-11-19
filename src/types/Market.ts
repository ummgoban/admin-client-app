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

export type RegistMarketType = {
  name: string;
  businessNumber: string;
  address: string;
  specificAddress: string;
  contactNumber: string;
};
