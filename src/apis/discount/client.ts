import apiClient from '../ApiClient';
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
): Promise<DiscountReservation[]> => {
  const response = await apiClient.get<DiscountReservation[]>(
    `/owner/products/discount/reservations/${marketId}`,
  );
  return response;
};

/**
 * POST /owner/products/discount/reservations
 * 상품리스트 할인 예약 생성
 */
export const createDiscountReservation = async (
  data: CreateDiscountReservation,
): Promise<string> => {
  const response = await apiClient.post<string>(
    '/owner/products/discount/reservations',
    data,
  );
  return response;
};

/**
 * PATCH /owner/products/discount/reservations
 * 상품리스트 할인 예약 수정
 */
export const updateDiscountReservation = async (
  data: UpdateDiscountReservation,
): Promise<string> => {
  const response = await apiClient.patch<string>(
    '/owner/products/discount/reservations',
    data,
  );
  return response;
};

/**
 * DELETE /owner/products/discount/reservations/{discountReservationId}
 * 상품리스트 할인 예약 삭제
 */
export const deleteDiscountReservation = async (
  discountReservationId: number,
): Promise<string> => {
  const response = await apiClient.del<string>(
    `/owner/products/discount/reservations/${discountReservationId}`,
  );
  return response;
};
