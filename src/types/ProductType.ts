import {ProductType} from '@ummgoban/shared';

export type MenuType = ProductType & {
  reservationStatus: 'PENDING' | 'ACTIVE';
};

export type TagType = {
  id: number;
  tagName: string;
};
