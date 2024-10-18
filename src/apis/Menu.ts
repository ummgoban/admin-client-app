import {MenuType} from '@/types/MenuType';

const dummyMenuData: MenuType[] = [
  {
    id: 1,
    name: '김치',
    image: 'https://legacy.reactjs.org/logo-og.png',
    discountRate: 61,
    originalPrice: 14900,
    discountPrice: 5900,
    stock: 3,
    status: 'IN_STOCK',
  },
  {
    id: 2,
    name: '간장게장',
    image: 'https://legacy.reactjs.org/logo-og.png',
    discountRate: 61,
    originalPrice: 14900,
    discountPrice: 5900,
    status: 'HIDDEN',
    stock: 3,
  },
  {
    id: 3,
    name: '계란찜',
    image: 'https://legacy.reactjs.org/logo-og.png',
    discountRate: 61,
    originalPrice: 14900,
    discountPrice: 5900,
    status: 'OUT_OF_STOCK',
    stock: 3,
  },
];

// TODO: fetch menu
export const getMenus = async (): Promise<MenuType[] | null> => {
  try {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(dummyMenuData);
        console.log('fetch menu');
      }, 500);
    });
  } catch (error) {
    console.error('Error fetching menus:', error);
    return null;
  }
};
