import {RegistMarketType} from '@/types/Market';
import apiClient from './ApiClient';

export const createMarket = async (
  market: RegistMarketType,
): Promise<{marketId: number} | null> => {
  try {
    const res = await apiClient.post<{marketId: number}, RegistMarketType>(
      '/markets',
      market,
    );

    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const uploadMarketImage = async (
  updateImage: FormData,
): Promise<string | null> => {
  try {
    const res = await apiClient.post<{imageUrl: string}>(
      '/markets/images',
      updateImage,
      {
        headers: {
          'Content-Type': 'multipart/form-data; boundary="boundary"',
        },
        transformRequest: data => data,
      },
    );

    if (res) {
      return res.imageUrl;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteMarketImage = async (imageUrl: string): Promise<boolean> => {
  try {
    const res = await apiClient.del<{
      code: number;
    }>('/markets/images', {
      params: {imageUrl},
    });

    return !!res && res.code === 200;
  } catch (error) {
    console.error(error);
    return false;
  }
};
