import {useQuery, useMutation, keepPreviousData} from '@tanstack/react-query';
import {OrdersRequest, OrderPatchRequest} from './model';
import {getPendingOrderLists, updateOrderStatus} from './client';

export const useGetOrders = ({ordersStatus, marketId}: OrdersRequest) => {
  return useQuery({
    queryKey: ['orders', ordersStatus, marketId],
    queryFn: () => {
      if (!marketId) return null;
      return getPendingOrderLists({ordersStatus, marketId});
    },
    enabled: marketId !== 0,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    refetchOnMount: 'always',
  });
};

export const usePatchOrder = () => {
  return useMutation({
    mutationKey: ['patchOrder'],
    mutationFn: ({ordersId, ordersStatus}: OrderPatchRequest) =>
      updateOrderStatus({ordersId, ordersStatus}),
  });
};
