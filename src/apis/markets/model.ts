export type MarketListResponse = {
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

export type verifyBusinessNumberInterface = {
  businessNumber: string;
  startDate: string;
  name: string;
  businessMarketName: string;
};

export type VerifyBusinessNumberRequest = verifyBusinessNumberInterface;

export type VerifyBusinessNumberResponse = {
  validBusinessNumber: boolean;
  businessNumberValidateInfoResponse: verifyBusinessNumberInterface;
};
