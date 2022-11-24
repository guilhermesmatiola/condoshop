import { createContext } from 'react';
import { useLocalStorage } from '../hooks';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', undefined);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
