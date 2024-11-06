import {ProductType} from './ProductType';

export type OrderDetailInfoType = {
  id: string;
  customerRequset: string;
  createdAt: string;
  pickupReservedAt: string;
  ordersPrice: number;
  orderMemberName: string;
  orderStatus: string;
  products: ProductType[];
};

export type OrderDetailResponseType = {
  code: number;
  message: string;
  data: OrderDetailInfoType;
};
