import {useQuery, useMutation} from '@tanstack/react-query';
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
  });
};

export const usePatchOrder = () => {
  return useMutation({
    mutationKey: ['patchOrder'],
    mutationFn: ({ordersId, ordersStatus}: OrderPatchRequest) =>
      updateOrderStatus({ordersId, ordersStatus}),
  });
};
