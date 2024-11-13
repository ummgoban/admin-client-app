import {MenuType} from '@/types/ProductType';
import apiClient from './ApiClient';

/**
 * GET /products
 */
export const getProducts = async (
  marketId: number,
): Promise<MenuType[] | null> => {
  try {
    const res = await apiClient.get<MenuType[]>(`/products`, {
      params: {
        marketId,
      },
    });

    return res;
  } catch (error) {
    console.error(error);

    return null;
  }
};

/**
 * POST /products
 * @param product - 상품 정보
 * @returns 생성된 상품 정보
 */
export const createProduct = async (
  marketId: number,
  product: Omit<MenuType, 'id' | 'tags'>,
): Promise<boolean> => {
  try {
    const res = await apiClient.post<{
      code: number;
      message: string;
    }>(
      '/products',
      {
        productImage: product.image,
        name: product.name,
        productStatus: product.status,
        originPrice: product.originPrice,
        discountPrice: product.discountPrice,
        discountRate: product.discountRate,
        stock: product.stock,
      },
      {
        params: {
          marketId,
        },
      },
    );

    return !!res && res.code === 200;
  } catch (error) {
    console.error(error);

    return false;
  }
};

/**
 * PATCH /products/:productId
 */
export const updateProduct = async (
  productId: number,
  product: Omit<MenuType, 'id' | 'tags'>,
): Promise<boolean> => {
  try {
    const res = await apiClient.patch<{code: number}>(
      `/products/${productId}`,
      {
        productImage: product.image,
        name: product.name,
        productStatus: product.status,
        originPrice: product.originPrice,
        discountPrice: product.discountPrice,
        discountRate: product.discountRate,
        stock: product.stock,
      },
    );

    return !!res && res.code === 200;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * DELETE /products/:productId
 */
export const deleteProduct = async (productId: number): Promise<boolean> => {
  try {
    const res = await apiClient.del<string>(`/products/${productId}`);

    return res === 'SUCCESS';
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 *
 * @param updateImage - 업데이트할 이미지 정보
 * @returns
 */
export const uploadProductImage = async (
  updateImage: FormData,
): Promise<string | null> => {
  try {
    const res = await apiClient.post<{imageUrl: string}>(
      '/products/images',
      updateImage,
      {
        headers: {
          'Content-Type': 'multipart/form-data; boundary="boundary"',
        },
        transformRequest: data => data,
      },
    );

    if (res) {
      return res.imageUrl;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteProductImage = async (
  imageUrl: string,
): Promise<boolean> => {
  try {
    const res = await apiClient.del<{
      code: number;
    }>('/products/images', {
      params: {imageUrl},
    });

    return !!res && res.code === 200;
  } catch (error) {
    console.error(error);
    return false;
  }
};
