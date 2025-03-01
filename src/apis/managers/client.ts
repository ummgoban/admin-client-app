import apiClient from '../ApiClient';
import {
  DeleteManagerRequest,
  GenerateAuthCodeResponse,
  ReadCreatePendingMangerResponse,
  ReadManagersResponse,
  ValidationAuthCodeRequest,
} from './model';

export const withDrawManager = async (marketId: number): Promise<boolean> => {
  try {
    const res = await apiClient.del<{code: number; message: string}>(
      `/owner/markets/${marketId}/manager`,
    );
    return !!res && res.code === 200;
  } catch (error) {
    console.log('직원 탈퇴 에러', error);
    return false;
  }
};

export const deleteManager = async ({
  marketId,
  memberId,
}: DeleteManagerRequest): Promise<boolean> => {
  try {
    const res = await apiClient.del<{code: number; message: string}>(
      `/owner/markets/${marketId}/manager/${memberId}`,
    );
    return !!res && res.code === 200;
  } catch (error) {
    console.log('직원 해고 에러', error);
    return false;
  }
};

export const readManagers = async (
  marketId: number,
): Promise<ReadManagersResponse | null> => {
  try {
    const res = await apiClient.get<ReadManagersResponse | null>(
      `/owner/markets/${marketId}/manager`,
    );
    return res;
  } catch (error) {
    console.error('직원 조회 에러', error);
    return null;
  }
};

export const readCreatePendingManagers = async (
  marketId: number,
): Promise<ReadCreatePendingMangerResponse | null> => {
  try {
    const res = await apiClient.get<ReadCreatePendingMangerResponse | null>(
      `/owner/markets/${marketId}/pending-manager`,
    );
    return res;
  } catch (error) {
    console.error('인증 대기 직원 조회 에러');
    return null;
  }
};

export const createManager = async (marketId: number): Promise<boolean> => {
  try {
    const res = await apiClient.post<{code: number; message: string}>(
      `/owner/markets/${marketId}/manager`,
    );
    return !!res && res.code === 200;
  } catch (error) {
    console.error('직원 생성 에러', error);
    return false;
  }
};

export const createAuthCode = async (
  marketId: number,
): Promise<GenerateAuthCodeResponse | null> => {
  try {
    const res = await apiClient.post<GenerateAuthCodeResponse | null>(
      `/owner/markets/${marketId}/generate-auth`,
    );
    return res;
  } catch (error) {
    console.error('인증 코드 생성 에러');
    return null;
  }
};

export const valdiateAuthCode = async ({
  marketName,
  authCode,
}: ValidationAuthCodeRequest): Promise<boolean> => {
  try {
    const res = await apiClient.post<{code: number; message: string}>(
      `/owner/markets/validate-auth`,
      {
        marketName,
        authCode,
      },
    );
    return !!res && res.code === 200;
  } catch (error) {
    console.error('직원 인증 코드 에러');
    return false;
  }
};
