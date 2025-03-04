import {ManagerInfo} from '@/types/Managers';

export type DeleteManagerRequest = {
  marketId: number;
  memberId: number;
};

export type ReadManagersResponse = ManagerInfo[];

export type ReadCreatePendingMangerResponse = {
  memberName: string;
  ttl: number;
};

// FIXME: type issue
export type GenerateAuthCodeResponse = {
  code: number;
  message: string;
  data: {
    authCode: string;
    marketName: string;
    createdAt: string;
  };
};

export type ValidationAuthCodeRequest = {
  marketName: string;
  authCode: string;
};
