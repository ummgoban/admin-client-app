import apiClient from './ApiClient';

type MarketResponseType = {
  marketId: number;
  name: string;
};

export const getMarket = async (): Promise<MarketResponseType[] | null> => {
  try {
    const res = await apiClient.get<MarketResponseType[]>('/market');
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
};
