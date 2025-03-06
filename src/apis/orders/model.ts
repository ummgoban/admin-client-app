import {OrderDetailInfoType, OrdersStatus} from '@/types/OrderDetailType';

export type OrdersRequest = {
  ordersStatus: OrdersStatus;
  marketId: number;
};

export type OrderPatchRequest = {
  ordersId: string;
  ordersStatus: OrdersStatus;
};

export type OrdersResponse = OrderDetailInfoType[];
