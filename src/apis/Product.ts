import {ProductType} from '@/types/ProductType';
import apiClient from './ApiClient';

// TODO: 타입 일치시키기
// type ProductType = {
//     id: number;
//     image: string;
//     name: string;
//     originPrice: number;
//     discountPrice: number;
//     discountRate: number;
//     count: number;
//   };
// {
//     "productImage": "https://.../ab123...456.png",
//     "name": "상품명",
//     "originPrice": 10000,
//     "discountPrice": 8000,
//     "discountRate": 20,
//     "stock": 2
//   }

/**
 *
 * @param product - 상품 정보
 * @returns 생성된 상품 정보
 */
export const createProduct = async (
  marketId: number,
  product: Omit<ProductType, 'id' | 'tags'>,
): Promise<Boolean> => {
  try {
    const body = {
      productImage: product.image,
      name: product.name,
      originPrice: product.originPrice,
      discountPrice: product.discountPrice,
      discountRate: product.discountRate,
      stock: product.count,
    };

    console.log(body);

    const res = await apiClient.post<string>(
      `/product?marketId=${marketId}`,
      body,
    );

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

    console.debug(res);

    return res?.imageUrl ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
