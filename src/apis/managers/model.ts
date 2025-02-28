import {ManagerInfo} from '@/types/Managers';

export type WithDrawManagerRequest = {
  marketId: number;
};

export type DeleteManagerRequest = {
  marketId: number;
  memberId: number;
};

export type ReadMangersRequest = {
  marketId: number;
};

export type ReadManagersResponse = ManagerInfo[];

export type ReadCreatePendingMangerRequest = {
  marketId: number;
};

export type ReadCreatePendingMangerResponse = {
  memberName: string;
  ttl: number;
};

export type CreateMangerResponse = {
  marketId: number;
};

export type GenerateAuthCodeRequest = {
  marketId: number;
};

export type GenerateAuthCodeResponse = {
  authCode: string;
  createdAt: string;
};

export type ValidationAuthCodeRequset = {
  marketName: string;
  authCode: string;
};
