import {TagType} from '@/types/TagType';

// 초기 더미 데이터
const dummyTagsData: TagType[] = [
  {id: 1, name: '추천 메뉴'},
  {id: 2, name: '김치'},
  {id: 3, name: '무침'},
  {id: 4, name: '조림'},
];

export const getTagHistory = async (): Promise<TagType[] | null> => {
  try {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(dummyTagsData);
        console.log('fetch tags data');
      }, 500);
    });
  } catch (error) {
    console.error('Error fetching tag data:', error);
    return null;
  }
};
