import {useQuery, useMutation} from '@tanstack/react-query';
import {
  withDrawManager,
  deleteManager,
  readManagers,
  readCreatePendingManagers,
  createManager,
  createAuthCode,
  valdiateAuthCode,
} from './client';
import {DeleteManagerRequest, ValidationAuthCodeRequest} from './model';

export const useWithDrawManager = (marketId: number | undefined) => {
  return useMutation({
    mutationKey: ['withDrawManager', marketId],
    mutationFn: async () => {
      if (!marketId) return;
      return await withDrawManager(marketId);
    },
  });
};

export const useDeleteManager = ({
  marketId,
  memberId,
}: DeleteManagerRequest) => {
  return useMutation({
    mutationKey: ['deleteManager', marketId],
    mutationFn: async () => {
      if (!marketId) return;
      return await deleteManager({marketId, memberId});
    },
  });
};

export const useReadManagers = (marketId: number | undefined | null) => {
  return useQuery({
    queryKey: ['readManagers', marketId],
    queryFn: () => {
      if (!marketId) return;
      return readManagers(marketId);
    },
  });
};

export const useReadCreatePendingMangers = (marketId: number) => {
  return useQuery({
    queryKey: ['pendingManagers', marketId],
    queryFn: () => {
      if (!marketId) return;
      return readCreatePendingManagers(marketId);
    },
  });
};

export const useCreateManager = async (marketId: number) => {
  return useMutation({
    mutationKey: ['createManager', marketId],
    mutationFn: async () => {
      if (!marketId) return;
      return createManager(marketId);
    },
  });
};

export const useCreateAuthCode = async (marketId: number) => {
  return useMutation({
    mutationKey: ['createAuthCode', marketId],
    mutationFn: async () => {
      if (!marketId) return;
      return createAuthCode(marketId);
    },
  });
};

export const useValidateAuthCode = async ({
  marketName,
  authCode,
}: ValidationAuthCodeRequest) => {
  return useMutation({
    mutationKey: ['validateAuthCode', authCode],
    mutationFn: async () => {
      if (!marketName || !authCode) return;
      return valdiateAuthCode({marketName, authCode});
    },
  });
};
