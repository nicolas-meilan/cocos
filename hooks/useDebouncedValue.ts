import debounce from 'lodash/debounce';
import { useEffect, useState } from 'react';

const useDebouncedValue = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedValue(value);
    }, delay);

    handler();

    return () => {
      handler.cancel();
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebouncedValue;
