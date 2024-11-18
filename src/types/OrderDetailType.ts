export type Product = {
  id: number;
  image: string;
  name: string;
  originPrice: number;
  discountPrice: number;
  discountRate: number;
  count: number;
};

export type OrderDetailInfoType = {
  id: string;
  customerRequset: string;
  createdAt: string;
  pickupReservedAt: string;
  ordersPrice: number;
  orderMemberName: string;
  ordersStatus: string;
  products: Product[];
};

export type OrderDetailResponseType = {
  code: number;
  message: string;
  data: OrderDetailInfoType;
};
