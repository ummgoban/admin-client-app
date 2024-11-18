import {OrderDetailResponseType} from '@/types/OrderDetailType';

const dummyOrderInfo: OrderDetailResponseType = {
  code: 200,
  message: '성공',
  data: {
    id: '1',
    customerRequset: '일부러 아래로 내렸습니다 디자인 논의 필요 붙일까요',
    createdAt: '2024-10-14T12:21:31.121Z',
    pickupReservedAt: '2024-10-14T13:00:00.000Z',
    ordersPrice: 35000,
    orderMemberName: '홍길동',
    ordersStatus: '예약완료',
    products: [
      {
        id: 101,
        image: 'https://legacy.reactjs.org/logo-og.png',
        name: '갈비찜',
        originPrice: 40000,
        discountPrice: 35000,
        discountRate: 12,
        count: 1,
      },
      {
        id: 102,
        image: 'https://legacy.reactjs.org/logo-og.png',
        name: '떡볶이',
        originPrice: 5000,
        discountPrice: 4500,
        discountRate: 10,
        count: 2,
      },
      {
        id: 105,
        image: 'https://legacy.reactjs.org/logo-og.png',
        name: '떡볶이',
        originPrice: 5000,
        discountPrice: 4500,
        discountRate: 10,
        count: 2,
      },
      {
        id: 103,
        image: 'https://legacy.reactjs.org/logo-og.png',
        name: 'ㅇㅇ',
        originPrice: 5000,
        discountPrice: 4500,
        discountRate: 10,
        count: 2,
      },
      {
        id: 104,
        image: 'https://legacy.reactjs.org/logo-og.png',
        name: '떡볶이',
        originPrice: 5000,
        discountPrice: 4500,
        discountRate: 10,
        count: 2,
      },
    ],
  },
};

export const getOrderHistory =
  async (): Promise<OrderDetailResponseType | null> => {
    try {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(dummyOrderInfo);
          console.log('fetch tags data');
        }, 500);
      });
    } catch (error) {
      console.error('Error fetching tag data:', error);
      return null;
    }
  };
