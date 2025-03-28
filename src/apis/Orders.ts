import {OrderDetailInfoType} from '@/types/OrderDetailType';
import apiClient from './ApiClient';

/**
 * @description 주문 상태에 따른 주문 목록을 가져옵니다.
 */
export const getPendingOrderLists = async (
  marketId: number,
  orderStatus:
    | 'ORDERED'
    | 'ACCEPTED'
    | 'PICKEDUP_OR_CANCELED'
    | 'PICKEDUP'
    | 'NO_SHOW'
    | 'CANCELED',
): Promise<OrderDetailInfoType[] | null> => {
  try {
    const res = await apiClient.get<OrderDetailInfoType[]>(
      'owner/markets/orders',
      {
        params: {
          ordersStatus: orderStatus,
          marketId,
        },
      },
    );

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

export const updateOrderStatus = async (
  orderId: string,
  orderStatus:
    | 'ORDERED'
    | 'ACCEPTED'
    | 'PICKEDUP_OR_CANCELED'
    | 'PICKEDUP'
    | 'NO_SHOW'
    | 'CANCELED',
): Promise<boolean> => {
  try {
    const res = await apiClient.patch<{code: number}>(
      'owner/orders',
      {},
      {
        params: {
          ordersId: orderId,
          ordersStatus: orderStatus,
        },
      },
    );
    return !!res && res.code === 200;
  } catch (error) {
    console.error(error);
    return false;
  }
};
