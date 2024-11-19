import apiClient from './ApiClient';

type MarketResponseType = {
  marketId: number;
  name: string;
};

export const getMemberMarkets = async (): Promise<
  MarketResponseType[] | null
> => {
  try {
    const res = await apiClient.get<MarketResponseType[]>('/members/markets');

    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
};
