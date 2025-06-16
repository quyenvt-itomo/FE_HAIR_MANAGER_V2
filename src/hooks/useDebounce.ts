import { useState, useEffect } from "react";

function useDebounce<T>(
  value: T,
  delay: number,
  setPage?: (page: number) => void
): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setPage?.(1)
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
