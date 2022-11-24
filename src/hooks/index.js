import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedItem, setStoredItem] = useState(() => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.log(err);
      return initialValue;
    }
  });

  const setItem = value => {
    try {
      const itemToStore = value instanceof Function ? value(storedItem) : value;

      setStoredItem(itemToStore);

      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(itemToStore));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return [storedItem, setItem];
}
