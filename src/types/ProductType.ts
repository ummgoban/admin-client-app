type DefaultProductType = {
  id: number;
  name: string;
  image: string;
  originPrice: number;
  discountPrice: number;
  discountRate: number;
  stock: number;
};

export type ProductType = DefaultProductType & {
  tags: TagType[];
};

export type MenuType = DefaultProductType & {
  productStatus: 'IN_STOCK' | 'OUT_OF_STOCK' | 'HIDDEN';
  tags: TagType[];
};

export type TagType = {
  id: number;
  tagName: string;
};
