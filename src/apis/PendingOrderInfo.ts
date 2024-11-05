import {PendingOrdersType} from '@/types/OrderDetailType';
// import apiClient from './ApiClient';
const dummyPendingOrdersInfo: PendingOrdersType = {
  code: 200,
  message: '성공',
  data: [
    {
      id: '1',
      customerRequset: '일부러 아래로 내렸습니다 디자인 논의 필요 붙일까요',
      createdAt: '2024-10-14T12:21:31.121Z',
      pickupReservedAt: '2024-10-14T13:00:00.000Z',
      ordersPrice: 35000,
      orderMemberName: '홍길동',
      orderStatus: 'ORDERED',
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
          name: '된장국',
          originPrice: 5000,
          discountPrice: 4500,
          discountRate: 10,
          count: 2,
        },
        {
          id: 103,
          image: 'https://legacy.reactjs.org/logo-og.png',
          name: '간장게장',
          originPrice: 5000,
          discountPrice: 4500,
          discountRate: 10,
          count: 2,
        },
        {
          id: 104,
          image: 'https://legacy.reactjs.org/logo-og.png',
          name: '산화구리',
          originPrice: 5000,
          discountPrice: 4500,
          discountRate: 10,
          count: 2,
        },
      ],
    },
    {
      id: '2',
      customerRequset: '맛있게 부탁요',
      createdAt: '2024-10-14T12:21:31.121Z',
      pickupReservedAt: '2024-10-14T13:00:00.000Z',
      ordersPrice: 35000,
      orderMemberName: '이승민',
      orderStatus: 'ORDERED',
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
          name: '된장국',
          originPrice: 5000,
          discountPrice: 4500,
          discountRate: 10,
          count: 2,
        },
      ],
    },
    {
      id: '3',
      customerRequset: '맛있게 부탁합니다',
      createdAt: '2024-10-14T12:21:31.121Z',
      pickupReservedAt: '2024-10-14T13:00:00.000Z',
      ordersPrice: 35000,
      orderMemberName: '이상민',
      orderStatus: 'ACCEPTED',
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
          name: '된장국',
          originPrice: 5000,
          discountPrice: 4500,
          discountRate: 10,
          count: 2,
        },
      ],
    },
    {
      id: '4',
      customerRequset: '맛있게 부탁합니다',
      createdAt: '2024-10-14T12:21:31.121Z',
      pickupReservedAt: '2024-10-14T13:00:00.000Z',
      ordersPrice: 35000,
      orderMemberName: '김영민',
      orderStatus: 'CANCELED',
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
          name: '된장국',
          originPrice: 5000,
          discountPrice: 4500,
          discountRate: 10,
          count: 2,
        },
      ],
    },
    {
      id: '5',
      customerRequset: '맛있게 부탁합니다',
      createdAt: '2024-10-14T12:21:31.121Z',
      pickupReservedAt: '2024-10-14T13:00:00.000Z',
      ordersPrice: 35000,
      orderMemberName: '이소은',
      orderStatus: 'PICKED_UP',
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
          name: '된장국',
          originPrice: 5000,
          discountPrice: 4500,
          discountRate: 10,
          count: 2,
        },
      ],
    },
  ],
};

export const getPendingOrderLists = async (
  marketId: number,
  orderStatus: 'ORDERED' | 'ACCEPTED' | 'PICKUP_OR_CANCEL',
): Promise<PendingOrdersType | null> => {
  try {
    return new Promise(resolve => {
      setTimeout(() => {
        const filteredData = {
          ...dummyPendingOrdersInfo,
          data: dummyPendingOrdersInfo.data.filter(order => {
            if (orderStatus === 'PICKUP_OR_CANCEL') {
              return (
                order.orderStatus === 'CANCELED' ||
                order.orderStatus === 'PICKED_UP'
              );
            }
            return order.orderStatus === orderStatus;
          }),
        };

        resolve(filteredData);
      }, 500);
    });
  } catch (error) {
    console.error('Error fetching pending orders data:', error);
    return null;
  }
};
// export const getPendingOrderLists = async (
//   marketId: number,
//   orderStatus: 'ORDERED' | 'ACCEPTED' | 'PICKUP_OR_CANCEL',
// ): Promise<PendingOrdersType | null> => {
//   try {
//     const url = `/v1/order/market?ordersStatus=${orderStatus}&marketId=${marketId}`;

//     const response = await apiClient.get<PendingOrdersType>(url);

//     if (response && response.code === 200) {
//       return response;
//     }

//     return null;
//   } catch (error) {
//     console.error('Error fetching pending orders data:', error);
//     return null;
//   }
// };
