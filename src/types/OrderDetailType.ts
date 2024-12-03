import {ProductType} from './ProductType';

export type OrderDetailInfoType = {
  id: number;
  customerRequest: string;
  createdAt: string;
  pickupReservedAt: string;
  ordersPrice: number;
  orderMemberName: string;
  ordersStatus:
    | 'ORDERED'
    | 'ACCEPTED'
    | 'PICKEDUP_OR_CANCELED'
    | 'PICKEDUP'
    | 'NO_SHOW'
    | 'CANCELED';
  products: ProductType[];
};

export type OrderDetailResponseType = {
  code: number;
  message: string;
  data: OrderDetailInfoType;
};
