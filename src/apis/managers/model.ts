import {ManagerInfo} from '@/types/Managers';

export type DeleteManagerRequest = {
  marketId: number | null;
  memberId: number;
};

export type ReadManagersResponse = ManagerInfo[];

export type ReadCreatePendingMangerResponse = {
  memberName: string;
  ttl: number;
};

export type GenerateAuthCodeResponse = {
  authCode: string;
  createdAt: string;
};

export type ValidationAuthCodeRequest = {
  marketName: string;
  authCode: string;
};
