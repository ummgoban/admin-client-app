import apiClient from '../ApiClient';
import {OrdersRequest, OrdersResponse, OrderPatchRequest} from './model';

/**
 * @description 주문 상태에 따른 주문 목록을 가져옵니다.
 */
export const getPendingOrderLists = async ({
  marketId,
  ordersStatus,
}: OrdersRequest): Promise<OrdersResponse | null> => {
  try {
    const res = await apiClient.get<OrdersResponse>('owner/markets/orders', {
      params: {
        ordersStatus,
        marketId,
      },
    });

    if (res) {
      return res;
    } else {
      console.log('응답 데이터가 없습니다.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching pending orders data:', error);
    return null;
  }
};

export const updateOrderStatus = async ({
  ordersId,
  ordersStatus,
}: OrderPatchRequest): Promise<boolean> => {
  try {
    const res = await apiClient.patch<{code: number}>(
      'owner/orders',
      {},
      {
        params: {
          ordersId,
          ordersStatus,
        },
      },
    );
    return !!res && res.code === 200;
  } catch (error) {
    console.error(error);
    return false;
  }
};
