import {MenuType} from '@/types/MenuType';
import {TagType} from '@/types/TagType';
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
    tags: [
      {id: 1, name: '국류'},
      {id: 2, name: '한식'},
      {id: 3, name: '일식'},
    ],
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
    tags: [
      {id: 1, name: '국류'},
      {id: 2, name: '한식'},
      {id: 3, name: '일식'},
    ],
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
    tags: [
      {id: 1, name: '국류'},
      {id: 2, name: '한식'},
      {id: 3, name: '일식'},
    ],
  },
];

const dummyTags: TagType[] = [
  {id: 1, name: '국류'},
  {id: 2, name: '한식'},
  {id: 3, name: '일식'},
  {id: 4, name: '중식'},
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

// TODO: fetch tags
export const getTags = async (): Promise<TagType[] | null> => {
  try {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(dummyTags);
        console.log('fetch tags');
      }, 500);
    });
  } catch (error) {
    console.error('Error fetching tags:', error);
    return null;
  }
};
