import {useState} from 'react';
import {useInterval} from './useInterval';

export function useIntervalValue<T>(calculator: () => T, delay: number): T {
  const [result, setResult] = useState<T>(calculator());

  useInterval(() => {
    const newResult = calculator();
    if (newResult !== result) setResult(newResult);
  }, delay);

  return result;
}
