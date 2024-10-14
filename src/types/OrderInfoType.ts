type Product = {
  id: number;
  image: string;
  name: string;
  originPrice: number;
  discountPrice: number;
  discountRate: number;
  count: number;
};

type OrderDetailInfo = {
  id: number;
  customerRequset: string;
  createdAt: string;
  pickupReservedAt: string;
  ordersPrice: number;
  orderMemberName: string;
  orderStatus: string;
  products: Product[];
};

export type OrderInfoType = {
  code: number;
  message: string;
  data: OrderDetailInfo[];
};
