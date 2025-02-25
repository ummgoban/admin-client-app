// import { useCallback } from 'react';
// import { useInView } from 'react-native-intersection-observer';

// type InfiniteScrollProps = {
//   hasNextPage: boolean;
//   fetchNextPage: () => void;
// };

// function useInfiniteScroll({ hasNextPage, fetchNextPage }: InfiniteScrollProps) {
//   const { ref, inView } = useInView({
//     threshold: 0.6, // 화면의 60% 이상 보일 때 트리거
//   });

//   useCallback(() => {
//     if (inView && hasNextPage) {
//       fetchNextPage();
//     }
//   }, [inView, hasNextPage, fetchNextPage]);

//   return ref;
// }

// export default useInfiniteScroll;
