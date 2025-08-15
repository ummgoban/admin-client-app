import apiClient from '../ApiClient';
import CustomError from '../CustomError';
import {
  CreateDiscountReservation,
  DiscountReservation,
  UpdateDiscountReservation,
} from './model';

/**
 * GET /owner/products/discount/reservations/{marketId}
 * 가게에 관련된 상품 할인 예약 조회
 */
export const getDiscountReservations = async (
  marketId: number,
): Promise<DiscountReservation[] | null> => {
  try {
    const res = await apiClient.get<DiscountReservation[] | null>(
      `/owner/products/discount/reservations/${marketId}`,
    );
    return res;
  } catch (error) {
    console.error('할인 예약 조회 에러', error);
    throw new CustomError(error);
  }
};

/**
 * POST /owner/products/discount/reservations
 * 상품리스트 할인 예약 생성
 */
export const createDiscountReservation = async (
  data: CreateDiscountReservation,
): Promise<boolean> => {
  try {
    const res = await apiClient.post<{code: number; message: string}>(
      '/owner/products/discount/reservations',
      data,
    );
    return !!res && res.code === 200;
  } catch (error) {
    console.error('할인 예약 생성 에러', error);
    throw new CustomError(error);
  }
};

/**
 * PATCH /owner/products/discount/reservations
 * 상품리스트 할인 예약 수정
 */
export const updateDiscountReservation = async (
  data: UpdateDiscountReservation,
): Promise<boolean> => {
  try {
    const res = await apiClient.patch<{code: number; message: string}>(
      '/owner/products/discount/reservations',
      data,
    );
    return !!res && res.code === 200;
  } catch (error) {
    console.error('할인 예약 수정 에러', error);
    throw new CustomError(error);
  }
};

/**
 * DELETE /owner/products/discount/reservations/{discountReservationId}
 * 상품리스트 할인 예약 삭제
 */
export const deleteDiscountReservation = async (
  discountReservationId: number,
): Promise<boolean> => {
  try {
    const res = await apiClient.del<{code: number; message: string}>(
      `/owner/products/discount/reservations/${discountReservationId}`,
    );
    return !!res && res.code === 200;
  } catch (error) {
    console.error('할인 예약 삭제 에러', error);
    throw new CustomError(error);
  }
};
