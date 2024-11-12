export type ProductType = {
  id: number;
  name: string;
  image: string;
  originPrice: number;
  discountPrice: number;
  discountRate: number;
  count: number;
  tags: TagType[];
};

export type TagType = {
  id: number;
  tagName: string;
};
