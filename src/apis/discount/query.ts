import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

import useProfile from '@/hooks/useProfile';

import {
  createDiscountReservation,
  deleteDiscountReservation,
  getDiscountReservations,
  updateDiscountReservation,
} from './client';
import {CreateDiscountReservation, UpdateDiscountReservation} from './model';

const QUERY_KEY = ['discountReservations'];

export const useDiscountReservations = () => {
  const {profile} = useProfile();
  const queryClient = useQueryClient();

  const {data: reservations = [], ...queryResult} = useQuery({
    queryKey: [...QUERY_KEY, profile?.marketId],
    queryFn: () => getDiscountReservations(profile?.marketId!),
    enabled: !!profile?.marketId,
  });

  const invalidateQueries = () => {
    queryClient.invalidateQueries({queryKey: [...QUERY_KEY, profile?.marketId]});
  };

  const createMutation = useMutation({
    mutationFn: (data: Omit<CreateDiscountReservation, 'marketId'>) =>
      createDiscountReservation({marketId: profile?.marketId!, ...data}),
    onSuccess: invalidateQueries,
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateDiscountReservation) =>
      updateDiscountReservation(data),
    onSuccess: invalidateQueries,
  });

  const deleteMutation = useMutation({
    mutationFn: (discountReservationId: number) =>
      deleteDiscountReservation(discountReservationId),
    onSuccess: invalidateQueries,
  });

  return {
    reservations,
    ...queryResult,
    createReservation: createMutation.mutateAsync,
    updateReservation: updateMutation.mutateAsync,
    deleteReservation: deleteMutation.mutateAsync,
  };
};
