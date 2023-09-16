import { useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const storedValue = localStorage.getItem(key);
  const initial = storedValue
    ? JSON.parse(storedValue).reverse()
    : initialValue;

  const [value, setValue] = useState<T>(initial);

  const setStoredValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
}
