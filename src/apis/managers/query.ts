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

export const useCreateManager = (marketId: number) => {
  return useMutation({
    mutationKey: ['createManager', marketId],
    mutationFn: async () => {
      if (!marketId) return;
      return await createManager(marketId);
    },
  });
};

export const useCreateAuthCode = (marketId: number) => {
  return useMutation({
    mutationKey: ['createAuthCode', marketId],
    mutationFn: async () => {
      if (!marketId) return;
      return await createAuthCode(marketId);
    },
  });
};

export const useValidateAuthCode = () => {
  return useMutation({
    mutationKey: ['validateAuthCode'],
    mutationFn: ({marketName, authCode}: ValidationAuthCodeRequest) => {
      return valdiateAuthCode({marketName, authCode});
    },
  });
};
