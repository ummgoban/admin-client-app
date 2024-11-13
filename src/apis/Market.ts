import {RegistMarketType} from '@/types/Market';
import apiClient from './ApiClient';

export const createMarket = async (
  market: RegistMarketType,
): Promise<{marketId: number} | null> => {
  try {
    const res = await apiClient.post<{marketId: number}>('/markets', market);

    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
};
