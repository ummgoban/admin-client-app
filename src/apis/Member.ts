import apiClient from './ApiClient';

type MarketResponseType = {
  marketId: number;
  /**
   * @description 가게 역할
   * @enum `ROLE_STORE_OWNER`, `ROLE_STORE_MANAGER`
   *
   *  */
  marketRole: string;
  /** 가게명 */
  marketName: string;
};

/**
 * @description 모든 관리 가게 목록을 가져옵니다.
 * @returns
 */
export const getMemberMarkets = async (): Promise<
  MarketResponseType[] | null
> => {
  try {
    const res = await apiClient.get<MarketResponseType[]>('owner/markets');

    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
};
