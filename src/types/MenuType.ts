export type MenuType = {
  id: number;
  name: string;
  image: string;
  discountRate: number;
  originalPrice: number;
  discountPrice: number;
  status: 'IN_STOCK' | 'OUT_OF_STOCK' | 'HIDDEN';
  stock: number;
};
