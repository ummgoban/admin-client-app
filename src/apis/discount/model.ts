import {MenuType} from '@/types/ProductType';

export type DiscountReservation = {
  discountReservationId: number;
  products: MenuType[];
  discountRate: number;
  startAt: string;
  endAt: string;
};

export type CreateDiscountReservation = {
  marketId: number;
  productIds: number[];
  discountRate: number;
  startAt: string;
  endAt: string;
};

export type UpdateDiscountReservation = {
  discountReservationId: number;
  productIds: number[];
  discountRate: number;
  startAt: string;
  endAt: string;
};
