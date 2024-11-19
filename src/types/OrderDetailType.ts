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
    | 'CANCELED';
  products: ProductType[];
};

export type OrderDetailResponseType = {
  code: number;
  message: string;
  data: OrderDetailInfoType;
};
