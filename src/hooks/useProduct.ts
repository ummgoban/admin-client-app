import {useCallback} from 'react';
import {create} from 'zustand';

import {getProducts as getProductsApi} from '@/apis/Product';
import {MenuType} from '@/types/ProductType';

import useProfile from './useProfile';

type ProductStore = {
  products: MenuType[];
  getProducts: (marketId: number) => Promise<void>;
};

const useProductStore = create<ProductStore>(set => ({
  products: [],
  getProducts: async (marketId: number) => {
    const productRes = await getProductsApi(marketId);
    if (!productRes) {
      return;
    }
    set({products: productRes});
  },
}));

const useProduct = () => {
  const {products, getProducts} = useProductStore();
  const {profile} = useProfile();

  const fetchProducts = useCallback(async () => {
    if (!profile || !profile.marketId) {
      return;
    }

    await getProducts(profile.marketId);
  }, [getProducts, profile]);

  const refresh = useCallback(async () => {
    if (!profile || !profile.marketId) {
      return;
    }
    await getProducts(profile.marketId);
  }, [getProducts, profile]);

  const getProduct = useCallback(
    (productId: number) => {
      return products.find(product => product.id === productId);
    },
    [products],
  );

  return {products, refresh, fetch: fetchProducts, getProduct};
};

export default useProduct;
