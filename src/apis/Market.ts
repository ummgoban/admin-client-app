import {
  MarketType,
  RegisterMarketType,
  UpdateMarketInfoType,
} from '@/types/Market';
import apiClient from './ApiClient';

/**
 * @deprecated use [createMarket](./markets/query.ts) instead
 * POST /markets
 * body: RegisterMarketType
 */
export const createMarket = async (
  market: RegisterMarketType,
): Promise<{marketId: number} | null> => {
  try {
    const res = await apiClient.post<
      {code: number; data: {marketId: number}},
      RegisterMarketType
    >('owner/markets', market);

    if (res && res.code === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMarket = async (
  marketId: number,
): Promise<MarketType | null> => {
  try {
    const res = await apiClient.get<MarketType | null>(
      `owner/markets/${marketId}`,
    );

    return res;
  } catch (error) {
    console.error(`Error fetching market: ${marketId}`, error);
    return null;
  }
};

export const updateMarketInfo = async (
  marketId: number,
  marketInfo: UpdateMarketInfoType,
): Promise<boolean> => {
  try {
    const res = await apiClient.patch<{code: number}>(
      `owner/markets/${marketId}`,
      marketInfo,
    );

    return !!res && res.code === 200;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * PUT /markets/images
 */
export const uploadMarketImage = async (
  updateImage: FormData,
): Promise<string | null> => {
  try {
    const res = await apiClient.post<{data: {imageUrl: string}}>(
      'owner/markets/images',
      updateImage,
      {
        headers: {
          'Content-Type': 'multipart/form-data; boundary="boundary"',
        },
        transformRequest: data => data,
      },
    );

    if (res) {
      return res.data.imageUrl;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * DELETE /markets/images?imageUrl={imageUrl}
 */
export const deleteMarketImage = async (imageUrl: string): Promise<boolean> => {
  try {
    const res = await apiClient.del<{
      code: number;
    }>('owner/markets/images', {
      params: {imageUrl},
    });

    return !!res && res.code === 200;
  } catch (error) {
    console.error(error);
    return false;
  }
};
