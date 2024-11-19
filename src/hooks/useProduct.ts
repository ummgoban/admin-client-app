import {getProducts as getProductsApi} from '@/apis/Product';
import {MenuType} from '@/types/ProductType';
import {useCallback} from 'react';
import {create} from 'zustand';

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

  const refresh = useCallback(
    async (marketId: number) => {
      await getProducts(marketId);
    },
    [getProducts],
  );

  const getProduct = useCallback(
    (productId: number) => {
      return products.find(product => product.id === productId);
    },
    [products],
  );

  return {products, refresh, fetch: getProducts, getProduct};
};

export default useProduct;
