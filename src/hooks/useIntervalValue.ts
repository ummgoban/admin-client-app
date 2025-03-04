import {useState, useEffect} from 'react';
import {useInterval} from './useInterval';

export function useIntervalValue<T>(
  calculator: () => T,
  delay: number,
  deps: any[] = [],
): T {
  const [result, setResult] = useState<T>(calculator());

  useInterval(() => {
    const newResult = calculator();
    if (newResult !== result) setResult(newResult);
  }, delay);

  return result;
}
