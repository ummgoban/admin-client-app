import {useCallback, useState} from 'react';

const usePullDownRefresh = <T>(callback: () => Promise<T>) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
      await callback();
    } catch (reason) {
      console.error(reason);
    } finally {
      setRefreshing(false);
    }
  }, [callback]);

  return {refreshing, onRefresh};
};

export default usePullDownRefresh;
