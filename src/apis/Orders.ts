import {OrderDetailInfoType} from '@/types/OrderDetailType';
import apiClient from './ApiClient';

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
    const res = await apiClient.get<OrderDetailInfoType[]>('markets/orders', {
      params: {
        ordersStatus: orderStatus,
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

export const updateOrderStatus = async (
  orderId: number,
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
      '/orders',
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
