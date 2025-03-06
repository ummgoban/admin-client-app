import {useMutation, useQuery} from '@tanstack/react-query';
import {
  createMarket,
  deleteMarketImage,
  getMarket,
  getMarketList,
  updateMarketInfo,
  uploadMarketImage,
} from './client';
import {RegistMarketType, UpdateMarketInfoType} from '@/types/Market';

export const useCreateMarket = () => {
  return useMutation({
    mutationKey: ['createMarket'],
    mutationFn: (market: RegistMarketType) => createMarket(market),
  });
};

export const useMarketList = () => {
  return useQuery({
    queryKey: ['marketList'],
    queryFn: () => getMarketList(),
  });
};

export const useGetMarket = (marketId: number | undefined | null) => {
  return useQuery({
    queryKey: ['market', marketId],
    queryFn: () => {
      if (!marketId) return null;
      return getMarket(marketId);
    },
  });
};

export const useUpdateMarketInfo = ({
  marketId,
  market,
}: {
  marketId: number;
  market: UpdateMarketInfoType;
}) => {
  return useMutation({
    mutationKey: ['updateMarketInfo'],
    mutationFn: () => updateMarketInfo(marketId, market),
  });
};

export const useUploadMarketImage = (updateImage: FormData) => {
  return useMutation({
    mutationKey: ['uploadMarketImage'],
    mutationFn: () => uploadMarketImage(updateImage),
  });
};

export const useDeleteMarketImage = (imageUrl: string) => {
  return useMutation({
    mutationKey: ['deleteMarketImage'],
    mutationFn: () => deleteMarketImage(imageUrl),
  });
};
