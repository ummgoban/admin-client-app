export type Product = {
  id: number;
  image: string;
  name: string;
  originPrice: number;
  discountPrice: number;
  discountRate: number;
  count: number;
};

export type OrderInfoType = {
  id: string;
  customerRequset: string;
  createdAt: string;
  pickupReservedAt: string;
  ordersPrice: number;
  orderMemberName: string;
  orderStatus: string;
  products: Product[];
};

export type OrderResponseType = {
  code: number;
  message: string;
  data: OrderInfoType;
};
